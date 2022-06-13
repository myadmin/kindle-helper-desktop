import { dialog, shell } from 'electron';
import axios from 'axios';
import pkg from '../../../package.json';
const version = pkg.version;
const release =
    'https://api.github.com/repos/myadmin/kindle-helper-desktop/releases/latest';
const downloadUrl =
    'https://github.com/myadmin/kindle-helper-desktop/releases/latest';

const checkVersion = async () => {
    const res = await axios.get(release);
    if (res.status === 200) {
        const latest = res.data.name; // 获取版本号
        console.log('latest', latest);
        const result = compareVersion2Update(version, latest); // 比对版本号，如果本地版本低于远端则更新
        console.log('result', result);
        if (result) {
            dialog
                .showMessageBox({
                    type: 'info',
                    title: '发现新版本',
                    message:
                        '发现新版本，更新了很多功能，是否去下载最新的版本？',
                    buttons: ['是', '否'],
                    checkboxLabel: '以后不再提醒',
                    checkboxChecked: false,
                })
                .then(({ response }) => {
                    if (response === 0) {
                        // if selected yes
                        shell.openExternal(downloadUrl);
                    }
                });
        }
    } else {
        return false;
    }
};

const compareVersion2Update = (current: string, latest: string): boolean => {
    const currentVersion = current.split('.').map((item) => parseInt(item));
    const latestVersion = latest.split('.').map((item) => parseInt(item));
    let flag = false;
    console.log('currentVersion', currentVersion);
    console.log('latestVersion', latestVersion);
    for (let i = 0; i < 3; i++) {
        if (currentVersion[i] < latestVersion[i]) {
            flag = true;
        }
    }

    return flag;
};

export default checkVersion;
