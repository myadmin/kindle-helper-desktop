import { FC } from 'react';
import { Form, Input, Select } from 'antd';

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};

/**
 * 发送到kindle的邮箱地址
 * @returns DOM
 */
const SendEmail: FC = () => {
  return (
    <Form {...layout} name="control-hooks">
      <Form.Item label="发送邮箱类型" name="type">
        <Select>
          <Select.Option value={1}>163邮箱</Select.Option>
          <Select.Option value={2}>126邮箱</Select.Option>
          <Select.Option value={3}>qq邮箱</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="发送邮箱秘钥" name="pass">
        <Input />
      </Form.Item>
      <Form.Item label="接收邮箱地址" name="email">
        <Input />
      </Form.Item>
    </Form>
  )
}

export default SendEmail;