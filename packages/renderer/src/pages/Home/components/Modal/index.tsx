import React, { memo, useEffect, useState } from 'react';
import { Button, Modal, Space, Spin } from 'antd';
import { Navigate } from "react-router-dom";
import { getDownloadUrl } from '@/utils/url';
import './index.scss';

interface ModalComponentProps {
  visible: boolean;
  handleOk: () => void;
  handleCancel: () => void;
}

interface BooksProps {
  data: Record<string, any>[];
  src: string;
}

const ModalComponent = ({ visible, handleOk, handleCancel }: ModalComponentProps) => {
  const [books, setBooks] = useState<BooksProps>();
  const [shadow, setShadow] = useState(false);
  const [goPage, setGoPage] = useState(false);

  // 点击关闭
  const handleClose = () => {
    setBooks({ data: [], src: '' });
    handleCancel();
  };

  // 点击下载对应格式的图书，需要获取到图书的链接
  const handleDownload = (item: Record<string, any>) => {
    // console.log('item', item);
    const url = getDownloadUrl(item.link);
    const bookId = url[0].indexOf('/f/') > -1 ? url[0].split('/f/')[1] : url[0].split('/file/')[1];
    console.log('url', url, bookId);
    setGoPage(true);
    // setShadow(true);
    // // 解析当前图书的下载链接，获取真实的下载地址，并进行下载
    // window.ipcRenderer.send('parseBook', {
    //   bookPass: url[1] || '',
    //   bookId,
    // });
  };

  // 副作用
  useEffect(() => {
    // 监听搜索详情
    window.ipcRenderer.on('searchResultDetail', (event, args) => {
      setBooks(args);
    });
  }, []);

  useEffect(() => {
    window.ipcRenderer.on('downloadInfo', (event, args) => {
      console.log('args', args);
      if (args?.code === 200) {
        handleCancel();
        window.ipcRenderer.send('downloadBookFile', args);
        setGoPage(true);
      }
      setShadow(false);
    });
  }, []);

  return (
    <Modal
      title="选择下载的格式"
      visible={visible}
      onOk={handleOk}
      onCancel={handleClose}
      maskClosable={false}
      width={620}
      footer={[
        <Button key="back" onClick={handleClose}>
          关闭
        </Button>,
      ]}
    >
      <div className="modal-content">
        {books?.src ?
          <>
            <img src={books?.src} alt="img" className='book-img' />
            <Space className='book-btns'>
              {(books?.data || [])?.map(item =>
                <Button type='link' key={item.link} onClick={() => handleDownload(item)}>{item.text}</Button>
              )}
            </Space>
          </> : <Spin />
        }
        {shadow && <div className="shadow"><div className="bg" /><Spin /></div>}
      </div>
      {goPage && <Navigate to='/download' replace={true} />}
    </Modal>
  )
}

export default memo(ModalComponent);