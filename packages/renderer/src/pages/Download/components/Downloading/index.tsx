import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from 'antd';
import { store } from '@/utils/store';

const Downloading = () => {
  const location: any = useLocation();
  const [books, setBooks] = useState<DownloadBookProps[]>([]);
  const bookList = useRef<DownloadBookProps[]>([]);

  useEffect(() => {
    console.log('location', location);
    // 监听页面跳转获取到的数据，给主进程发起下载通知
    if (location?.state && location?.state?.success) {
      // 下载文件
      window.ipcRenderer.send('downloadBookFile', location?.state);
    }
  }, [location?.state]);

  useEffect(() => {
    // 监听下载进度
    window.ipcRenderer.on('downloadProgress', (event, args: any) => {
      console.log('args', args.progress);
      let allBook: any = [].concat(books as any);
      const filter = allBook.filter((book: DownloadBookProps) => book.id !== args.bookId);
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

    return () => {
      window.ipcRenderer.removeAllListeners('downloadProgress');
    };
  }, []);

  useEffect(() => {
    // 监听文件是否下载完毕
    window.ipcRenderer.on('downloadDone', async (event, args) => {
      let allBook: any = [].concat(bookList.current as any);
      // console.log('allBook', allBook);
      allBook.map((book: any) => {
        if (book.id === args.bookId) {
          book.done = true;
          book.dirPath = args.path;
        }
        return book;
      });
      const books = await store.get('books') || {
        [args.current]: []
      };
      // console.log('books', books);
      await store.set('books', Object.assign({}, books, {
        [args.current]: (books[args.current] || []).concat(...allBook)
      }));
      // console.log('allBook', allBook);
      setBooks(allBook);
    });

    return () => {
      window.ipcRenderer.removeAllListeners('downloadDone');
    };
  }, []);

  // 查看文件位置
  const hanldeViewFile = (path: string) => {
    console.log('文件地址', path);
    window.ipcRenderer.send('openFilePath', path);
  }

  return (
    <div className="download-ing">
      {books.length ? (books || []).map(book => (
        <div className='download-item' key={book.id}>
          <div className="progress">
            <div className="progress-item" style={{ width: book.progress }} />
          </div>
          <div className="download-status">
            <div className="status-left">
              <p className='name'>{book.filename}</p>
              <p className="size">{book.filesize}</p>
            </div>
            <div className="status-right">
              {book.done ? <Button type='link' onClick={() => hanldeViewFile(book.dirPath)}>查看文件</Button> : book.progress}
            </div>
          </div>
        </div>
      )) : '暂无下载任务'}
    </div>
  )
}

export default Downloading;