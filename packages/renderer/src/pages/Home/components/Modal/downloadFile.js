const path = require('path');
const dl = require('download-file-with-progressbar');
const downloadUtils = require('./downloadUtils');

const headers = {
    'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36',
};

(async () => {
    const filePath = path.join(__dirname, 'dist');
    const url = `https://ch1-cucc-dd.tv002.com/down/a142181def45aeb750f8debce4f40124/%E3%80%8A%E5%87%A1%E4%BA%BA%E4%BF%AE%E4%BB%99%E4%BC%A0%E3%80%8B%E7%94%B5%E5%AD%90%E4%B9%A6%E4%B8%8B%E8%BD%BD+%28%E6%A0%A1%E5%AF%B9%E7%89%88%E5%85%A8%E6%9C%AC%2B%E7%95%AA%E5%A4%96%29+%E5%BF%98%E8%AF%AD.epub?cts=wt-f-D157A255A22A68F99884&ctp=157A255A22A68&ctt=1652946069&limit=1&spd=50000&ctk=a142181def45aeb750f8debce4f40124&chk=bd02ee70d4d6618f7153fb2461b41bf3-9029824`;
    const filename = `《凡人修仙传》电子书下载 (校对版全本+番外) 忘语.epub`;

    const option = {
        filename,
        dir: filePath,
        onDone: (info) => {
            console.log('done', info);
        },
        onError: (err) => {
            console.log('error', err);
        },
        onProgress: (curr, total) => {
            console.log('progress', (curr / total * 100).toFixed(2) + '%');
        },
    }

    dl(url, option);

    // try {
    //     await downloadUtils(url, filename, ({ percent, downloaded }) => {
    //         console.log('===percent===', percent);
    //         console.log('===downloaded===', downloaded);
    //     });
    //     console.log('Download done');
    // } catch (e) {
    //     console.log('Download failed');
    //     console.log(e.message);
    // }
})();
