import { dialog, ipcMain, shell, app } from 'electron';
import path from 'path';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import { search, searchDetail, parseUrl } from './search';
import sendEmail from './utils/email';

const fse = require('fs-extra');
const dl = require('download-file-with-progressbar');

// 搜索图书
ipcMain.on('searchText', async (event, arg) => {
    // console.log('arg', arg);
    try {
        const response = await search(arg);
        // console.log('title', response);
        event.sender.send('searchResult', response);
    } catch (err) {
        console.error('error', err);
    }
});

// 查找图书格式及下载链接
ipcMain.on('searchDetail', async (event, arg) => {
    try {
        const response = await searchDetail(arg);
        console.log('searchDetail', response);
        event.sender.send('searchResultDetail', response);
    } catch (err) {
        console.error('error', err);
    }
});

// 获取网盘中图书的下载地址
ipcMain.on('parseBook', async (event, arg) => {
    try {
        const response = await parseUrl(arg);
        console.log('parseBook', response);
        event.sender.send('downloadInfo', response);
    } catch (err) {
        console.error('error', err);
    }
});

// 新开一个隐形的窗口，并进行图书下载
ipcMain.on('downloadBookFile', async (event, arg) => {
    // console.log('arg', arg);
    const { link: url, bookId, name: filename, size: filesize } = arg;
    const currentDay = dayjs().format('YYYY-MM-DD');
    const dirPath = path.join(app.getPath('userData'), 'download');
    const filePath = path.join(dirPath, currentDay);
    fse.ensureDirSync(filePath);

    // TODO
    // 应该根据不同的bookId新建隐藏的窗口进行下载，不会互相影响

    // 下载配置项
    const option = {
        filename,
        dir: filePath,
        onDone: () => {
            // console.log('done', info);
            event.sender.send('downloadDone', {
                bookId,
                done: true,
                path: filePath,
                current: currentDay,
                uuid: uuidv4(),
                filetype: filename.split('.')[filename.split('.').length - 1],
            });
        },
        onError: (err: any) => {
            console.log('error', err);
        },
        onProgress: (curr: number, total: number) => {
            // console.log('progress', ((curr / total) * 100).toFixed(2) + '%');
            const progress = ((curr / total) * 100).toFixed(2) + '%';
            event.sender.send('downloadProgress', {
                bookId,
                progress,
                filename,
                filesize,
                dirPath,
            });
        },
    };
    dl(url, option);
});

// 打开文件所在位置
ipcMain.on('openFilePath', async (event, args) => {
    shell.openPath(args);
});

// 打开本地存储路径
ipcMain.on('openDir', async (event, args) => {
    dialog
        .showOpenDialog({
            defaultPath: args,
            properties: ['openFile', 'openDirectory'],
        })
        .then((res) => {
            // console.log('res', res);
            event.sender.send('changeNewDir', res.filePaths);
        });
});

// 发送邮件
ipcMain.on('sendFileToKindle', async (event, args) => {
    // console.log('args', args);
    try {
        const response = await sendEmail(args);
        // console.log('sendFileToKindle', response);
        event.sender.send('sendFileSuccess', response);
    } catch (err) {
        console.error('error', err);
    }
});
