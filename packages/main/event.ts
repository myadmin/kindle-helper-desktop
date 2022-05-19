import { ipcMain } from 'electron';
import { search, searchDetail, parseUrl } from './search';

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
    // console.log('title', response);
    event.sender.send('searchResultDetail', response);
  } catch (err) {
    console.error('error', err);
  }
});

// 获取网盘中图书的下载地址
ipcMain.on('parseBook', async (event, arg) => {
  try {
    const response = await parseUrl(arg);
    // console.log('title', response);
    event.sender.send('downloadInfo', response);
  } catch (err) {
    console.error('error', err);
  }
});

// 新开一个隐形的窗口，并进行图书下载
ipcMain.on('downloadBookFile', async (event, arg) => {
  console.log('arg', arg);
});