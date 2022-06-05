import { FC, useEffect, useState } from 'react';
import { Button, Collapse } from 'antd';
import { store } from '@/utils/store';
import './index.scss';

const { Panel } = Collapse;

/**
 * 下载完成页面
 * @returns DOM
 */
const DownloadDone: FC = () => {
  const [books, setBooks] = useState({});

  const getBookList = async () => {
    const bookList = await store.get('books') || {};
    // console.log('bookList', bookList);
    setBooks(bookList);
  };

  // 查看文件
  const handleClickView = (path: string) => {
    console.log('path', path);
    window.ipcRenderer.send('openFilePath', path);
  }

  useEffect(() => {
    getBookList();
  }, []);

  return (
    <Collapse defaultActiveKey={['1']}>
      {
        Object.entries(books).map((item: any) => {
          return (
            <Panel header={item[0]} key={item[0]}>
              {(item[1] || []).map((rest: Record<string, any>) => {
                return (
                  <div className='slide-box' key={rest.id}>
                    <p className='slide-left'>{rest.filename}</p>
                    <Button type='link' className='slide-right' onClick={() => handleClickView(rest.dirPath)}>查看文件</Button>
                  </div>
                )
              })}
            </Panel>
          )
        })
      }
    </Collapse>
  )
}

export default DownloadDone;