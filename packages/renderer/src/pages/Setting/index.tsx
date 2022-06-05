import { Tabs } from 'antd';
import SendEmail from './components/sendEmail';
// import ReceiveEmail from './components/ReceiveEmail';
import LocalStorage from './components/LocalStorage';

const { TabPane } = Tabs;

/**
 * 设置页面
 * @returns DOM 
 */
const Setting = () => {
  return (
    <Tabs tabPosition={'left'}>
      <TabPane tab="邮箱设置" key="1">
        <SendEmail />
      </TabPane>
      <TabPane tab="本地存储" key="2">
        <LocalStorage />
      </TabPane>
    </Tabs>
  )
};

export default Setting;