import React, { useState } from 'react';
import { Input, Row, Col, Table, Button } from 'antd';
import { searchInput } from './search';

// const data = [
//   { id: '1', name: 'Racing car sprays burning fuel into crowd.', type: 'mobi', size: '10MB' },
//   { id: '2', name: 'Japanese princess to wed commoner.', type: 'mobi', size: '10MB' },
//   { id: '3', name: 'Australian walks 100km after outback crash.', type: 'mobi', size: '10MB' },
//   { id: '4', name: 'Man charged over missing wedding girl.', type: 'mobi', size: '10MB' },
//   { id: '5', name: 'Los Angeles battles huge wildfires.', type: 'mobi', size: '10MB' },
//   { id: '11', name: 'Racing car sprays burning fuel into crowd.', type: 'mobi', size: '10MB' },
//   { id: '22', name: 'Japanese princess to wed commoner.', type: 'mobi', size: '10MB' },
//   { id: '32', name: 'Australian walks 100km after outback crash.', type: 'mobi', size: '10MB' },
//   { id: '42', name: 'Man charged over missing wedding girl.', type: 'mobi', size: '10MB' },
//   { id: '52', name: 'Los Angeles battles huge wildfires.', type: 'mobi', size: '10MB' },
//   { id: '13', name: 'Racing car sprays burning fuel into crowd.', type: 'mobi', size: '10MB' },
//   { id: '23', name: 'Japanese princess to wed commoner.', type: 'mobi', size: '10MB' },
//   { id: '33', name: 'Australian walks 100km after outback crash.', type: 'mobi', size: '10MB' },
//   { id: '43', name: 'Man charged over missing wedding girl.', type: 'mobi', size: '10MB' },
//   { id: '53', name: 'Los Angeles battles huge wildfires.', type: 'mobi', size: '10MB' },
// ]

const Search = () => {
  const [value, setValue] = useState('');
  const [dataSource, setDataSource] = useState([]);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: string, record: any) => (
        <a onClick={() => handleClickDownload(record.id)}>Download</a>
      ),
    },
  ];

  const handleClickDownload = (id: string) => {};

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  }

  const handleSearch = () => {
    console.log('value', value);
    window.ipcRenderer.send('searchText', value);
  };

  return (
    <Row gutter={12}>
      <Col span={24}>
        <Input.Group compact>
          <Input style={{ width: 'calc(100% - 63px)' }} value={value} onChange={handleChange} placeholder='输入书名进行查询' />
          <Button type="primary" onClick={handleSearch}>搜索</Button>
        </Input.Group>
      </Col>
      <Col span={24} style={{ marginTop: '10px' }}>
        <Table
          rowKey={'id'}
          columns={columns}
          size="middle"
          dataSource={dataSource}
        />
      </Col>
    </Row>
  )
}

export default Search;