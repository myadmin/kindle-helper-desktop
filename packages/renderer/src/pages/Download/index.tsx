import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * 下载页面
 * @returns 
 */
const Download = () => {
  const location: any = useLocation();
  const [books, setBooks] = useState<DownloadBookProps[]>([]);
  const bookList = useRef([]);

  useEffect(() => {
    // console.log('location', location);
    // 监听页面跳转获取到的数据，给主进程发起下载通知
    if (location?.state && location?.state?.code === 200) {
      // 下载文件
      window.ipcRenderer.send('downloadBookFile', location?.state);
    }
  }, [location?.state]);

  useEffect(() => {
    // 监听下载进度
    window.ipcRenderer.on('downloadProgress', (event, args: any) => {
      console.log('args', args.progress);
      let allBook: any = [].concat(books as any);
      const filter = allBook.filter((book: any) => book.id !== args.bookId);
      if (!filter.length) {
        allBook.push({
          id: args.bookId,
          progress: args.progress,
          filename: args.filename,
          filesize: args.filesize,
          done: false,
        });
      }
      bookList.current = allBook;
      setBooks(allBook);
    });
  }, []);

  useEffect(() => {
    // 监听文件是否下载完毕
    window.ipcRenderer.on('downloadDone', (event, args) => {
      console.log('allBook', bookList.current);
      bookList.current.map((book: any) => {
        if (book.id === args.bookId) {
          book.done = true;
          book.filepath = args.path;
        }
        return book;
      });
      setBooks(bookList.current);
    });
  }, []);

  return (
    <>
      <p>下载页</p>
      <div>
        {books.length && books.map(book => (
          <div key={book.id}>
            <p>{book.filename}</p>
            <p>{book.progress}</p>
            <p>{book.filesize}</p>
            {book.done && <p>查看文件</p>}
            {book.done && <p>{book.filepath}</p>}
          </div>
        ))}
      </div>
    </>
  )
}

export default Download