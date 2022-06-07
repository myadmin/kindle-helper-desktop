import { Button, Space, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/lib/table';

export interface DataType {
  key: React.ReactNode;
  id: string;
  filename: string;
  filesize: string;
  downloadTime: string;
  uuid: string;
  sendStatus?: boolean;
  children?: DataType[];
}

interface TableColumnsProps {
  handleSend: (record: DataType) => void;
  handleDelete: (record: DataType) => void;
}

const TableColumns = ({ handleSend, handleDelete }: TableColumnsProps) => {
  const columns: ColumnsType<DataType> = [
    {
      title: '文件名',
      dataIndex: 'filename',
      key: 'filename',
      fixed: 'left',
      ellipsis: true,
      render: (text: string) => <Tooltip title={text}>{text}</Tooltip>
    },
    {
      title: '文件大小',
      dataIndex: 'filesize',
      key: 'filesize',
      width: '14%',
    },
    {
      title: '文件格式',
      dataIndex: 'filetype',
      key: 'filetype',
      width: '12%',
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: '16%',
      key: 'action',
      fixed: 'right',
      render: (_, record) => (
        <Space>
          <a type="link" onClick={() => handleSend(record)}>send</a>
          <a type="link" onClick={() => handleDelete(record)}>Delete</a>
        </Space>
      )
    },
  ];
  return columns;
};

export default TableColumns;

