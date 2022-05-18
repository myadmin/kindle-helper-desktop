// const download = require('download');
const path = require('path');
const fs = require('fs');
const Axios = require('axios').default;
const ProgressBar = require('progress');
const download = require('progress-download')

const headers = {
    'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36',
};


(async () => {
    const filePath = path.join(__dirname, './dist');
    const url = `https://ch1-cucc-dd.tv002.com/down/003a4cee1eece91d8f3aaaf30cb88766/%E3%80%8A%E5%B8%8C%E6%9C%9B%E4%BD%A0%E6%98%AF%E4%BA%BA%E7%B1%BB%E3%80%8B%E9%9B%B7%E9%92%A7.epub?cts=wt-f-D157A255A22A68Fe0e7e&ctp=157A255A22A68&ctt=1652890997&limit=1&spd=50000&ctk=003a4cee1eece91d8f3aaaf30cb88766&chk=06b788fcd212a69d1c9e95983a9b7c4f-364892`;
    const filename = `${filePath}/希望你是人类.epub`;
    console.log('filename', filename);
    download(url, { filename }).then(() => {
        console.log('Download Completed');
    });
})();

async function downloadImage() {
    const url = `https://ch1-cucc-dd.tv002.com/down/003a4cee1eece91d8f3aaaf30cb88766/%E3%80%8A%E5%B8%8C%E6%9C%9B%E4%BD%A0%E6%98%AF%E4%BA%BA%E7%B1%BB%E3%80%8B%E9%9B%B7%E9%92%A7.epub?cts=wt-f-D157A255A22A68Fe0e7e&ctp=157A255A22A68&ctt=1652890997&limit=1&spd=50000&ctk=003a4cee1eece91d8f3aaaf30cb88766&chk=06b788fcd212a69d1c9e95983a9b7c4f-364892`;

    console.log('Connecting …')
    const { data, headers } = await Axios({
        url,
        method: 'GET',
        responseType: 'stream'
    })
    const totalLength = headers['content-length']

    console.log('Starting download')
    const progressBar = new ProgressBar('-> downloading [:bar] :percent :etas', {
        width: 40,
        complete: '=',
        incomplete: ' ',
        renderThrottle: 1,
        total: parseInt(totalLength)
    })


    const writer = fs.createWriteStream(
        path.join(__dirname, './dist', '希望你是人类.epub')
    )

    data.on('data', async (chunk) => {
        await progressBar.tick(chunk.length)
    });
    await data.pipe(writer);
}
