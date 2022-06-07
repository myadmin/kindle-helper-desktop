import { FC, useEffect } from 'react';
import { Button, Form, Input, Select, message } from 'antd';
import { store } from '@/utils/store';

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};

/**
 * 发送到kindle的邮箱地址
 * @returns DOM
 */
const SendEmail: FC = () => {
  const [form] = Form.useForm();

  // 初始化邮箱信息
  const getInitialEmail = async () => {
    const email = await store.get('emailSetting');
    if (email) {
      form.setFieldsValue(email);
    }
  };

  // 保存数据
  const handleSubmit = () => {
    form.validateFields()
      .then(async (res) => {
        await store.set('emailSetting', res);
        message.success('保存成功');
      });
  };

  useEffect(() => {
    getInitialEmail();
  }, []);

  return (
    <Form form={form} {...layout} name="control-hooks" onFinish={handleSubmit}>
      <Form.Item label="发送邮箱类型" name="type" rules={[{ required: true, message: '请选择发送邮箱类型' }]}>
        <Select placeholder="请选择发送邮箱类型">
          <Select.Option value={'163'}>163邮箱</Select.Option>
          <Select.Option value={'126'}>126邮箱</Select.Option>
          <Select.Option value={'qq'}>qq邮箱</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="发送邮箱地址" name="sendEmail" rules={[{ required: true, message: '请输入发送邮箱' }]}>
        <Input placeholder="请输入发送邮箱" />
      </Form.Item>
      <Form.Item label="发送邮箱秘钥" name="passKey" rules={[{ required: true, message: "请输入发送邮箱秘钥" }]}>
        <Input.Password placeholder="请输入发送邮箱秘钥" />
      </Form.Item>
      <Form.Item label="接收邮箱地址" name="receiveEmail" rules={[{ required: true, message: "请输入接收邮箱" }]}>
        <Input placeholder="请输入接收邮箱" />
      </Form.Item>
      <Form.Item labelCol={{ span: 0 }} wrapperCol={{ span: 24 }} style={{ textAlign: 'right' }}>
        <Button htmlType="submit" type="primary">保存</Button>
      </Form.Item>
    </Form>
  )
}

export default SendEmail;