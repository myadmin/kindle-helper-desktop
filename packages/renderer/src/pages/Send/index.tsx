import { FC, useEffect, useState } from 'react';
import { message, Modal, Table } from 'antd';
import type { TableRowSelection } from 'antd/lib/table/interface';
import { store } from '@/utils/store';
import TableColumns, { DataType } from './columns';


const rowSelection: TableRowSelection<DataType> = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  },
};

const Send: FC = () => {
  const [data, setData] = useState([]);
  const getBookData = async () => {
    const bookList = await store.get('books');
    // console.log('bookList', bookList);
    const mergeArray: any = [];
    Object.values(bookList).forEach((value: any) => {
      mergeArray.push(...(value.filter((item: Record<string, any>) => !!!item.sendStatus)));
    });
    setData(mergeArray);
  }

  // 发送文件到邮箱
  const handleSend = async (record: DataType) => {
    const emailSetting = await store.get('emailSetting');
    if (emailSetting) {
      window.ipcRenderer.send('sendFileToKindle', {
        bookInfo: record,
        emailInfo: emailSetting
      });
      message.success('发送任务进行中，请耐心等待邮件服务执行，请勿重复点击');
    } else {
      Modal.warning({
        title: '注意',
        content: (
          <div>
            <p>发送文件前请先设置发件邮箱及收件邮箱！</p>
          </div>
        )
      });
    }
  };

  // 删除已发送文件(修改发送状态为true) 
  const handleDelete = async (record: DataType) => {
    // console.log('record', record);
    const { downloadTime, uuid } = record;
    const books = await store.get('books');
    // console.log('books', books);
    if (books[downloadTime]) {
      (books[downloadTime] || []).map((item: Record<string, any>) => {
        // console.log('item', item);
        if (item.uuid === uuid) {
          item.sendStatus = true;
        }
        return item;
      });
    }
    await store.set('books', books);
    console.log('ssssss');
    getBookData();
    console.log('ccccc');
  };

  useEffect(() => {
    getBookData();
  }, []);

  return (
    <Table
      rowKey={"uuid"}
      columns={TableColumns({ handleSend, handleDelete })}
      rowSelection={{ ...rowSelection, checkStrictly: false }}
      dataSource={data}
      size="small"
    />
  )
};

export default Send;