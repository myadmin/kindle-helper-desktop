import { FC, useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { store } from '@/utils/store';

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 20 },
};
/**
 * 本地存储
 * @returns DOM
 */
const LocalStorage: FC = () => {
  const [form] = Form.useForm();

  const getInitial = async () => {
    const path = await store.get('downloadPath');
    form.setFieldsValue({
      path
    });
  };

  // 点击修改存储路径
  const handleChangePath = () => {
    console.log(form.getFieldValue('path'));
    window.ipcRenderer.send('openDir', form.getFieldValue('path'));
  };

  useEffect(() => {
    getInitial();
  }, []);

  useEffect(() => {
    // changeNewDir
    window.ipcRenderer.on('changeNewDir', (event, args) => {
      console.log('args', args);
      if (args.length) {
        store.set('downloadPath', args[0]);
        form.setFieldsValue({
          path: args[0]
        });
      }
    });
  }, []);

  return (
    <Form form={form} {...layout} style={{ width: '100%' }} name="local-storage">
      <Form.Item label="本地存储位置" name="path">
        <Input readOnly disabled />
      </Form.Item>
      <Form.Item>
        <Button onClick={handleChangePath} type="primary">修改存储路径</Button>
      </Form.Item>
    </Form>
  )
}

export default LocalStorage