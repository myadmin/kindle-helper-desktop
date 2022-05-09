const superagent = require('superagent');
const cheerio = require('cheerio');

interface SearchType {
    title: string;
    link: string;
    types: string[];
}

const url = 'https://www.iyd.wang/page/1/?s=%E6%83%8A%E5%A5%87';
// const options = {
//   method: 'GET',
//   path: url,
//   headers: {
//     'User-Agent':
//       'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.67 Safari/537.36',
//   },
// };

const search = async (text: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await superagent.get(
                `https://www.iyd.wang/page/1/?s=${encodeURI(text)}`
            );
            const $ = cheerio.load(res.text);
            const article = $('#main').find('article');
            const array: SearchType[] = [];
            for (let i = 0; i < article.length; i++) {
                const title = $(article[i]).find('.entry-title').text();
                const link = $(article[i])
                    .find('.entry-title')
                    .find('a')
                    .attr('href');
                array.push({
                    title,
                    link,
                    types: [],
                });
            }

            return resolve(array);

            // console.log('array', array);
            // if (array.length) {
            //     for (let k = 0; k < array.length; k++) {
            //         const res = await superagent.get(array[k].link);
            //         const $ = cheerio.load(res.text);
            //         const article = $('#main')
            //             .find('.entry-content')
            //             .find('blockquote')
            //             .find('p');
            //         for (let i = 0; i < article.length; i++) {
            //             // console.log('article', $(article[i]).text());
            //             array[k].types.push($(article[i]).text());
            //         }
            //     }
            //     // console.log('array', array);
            //     return resolve(array);
            // }
        } catch (err) {
            console.error(err);
            return reject(err);
        }
    });
};

const searchDetail = async (details: SearchType[]) => {
    console.log('details', details);
};

export default search;
