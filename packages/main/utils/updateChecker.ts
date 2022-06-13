import { dialog, shell } from 'electron';
import axios from 'axios';
import { lt } from 'semver'
import pkg from '../../../package.json';
const version = pkg.version;
const releaseUrl =
    'https://api.github.com/repos/myadmin/kindle-helper-desktop/releases/latest';
const releaseUrlBackup =
    'https://github.com/myadmin/kindle-helper-desktop/blob/develop/package.json';
const downloadUrl =
    'https://github.com/myadmin/kindle-helper-desktop/releases/latest';

const checkVersion = async () => {
    let res: any;
    try {
        res = await axios.get(releaseUrl).catch(async () => {
            const result = await axios.get(releaseUrlBackup);
            return result;
        });
    } catch (err) {
        console.log(err);
    }
    if (res.status === 200) {
        const latest = res.data.version || res.data.name;
        const result = compareVersion2Update(version, latest); // 比对版本号，如果本地版本低于远端则更新
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
    try {
        if (latest.includes('beta')) {
            // const isCheckBetaUpdate =
            //     db.get('settings.checkBetaUpdate') !== false;
            // if (!isCheckBetaUpdate) {
            //     return false;
            // }
        }
        return lt(current, latest);
    } catch (e) {
        return false;
    }
};

export default checkVersion;
