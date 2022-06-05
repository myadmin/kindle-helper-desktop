import { Tabs } from 'antd';
import Downloading from './components/Downloading';
import DownloadDone from './components/DownloadDone';
import './index.scss';

const { TabPane } = Tabs;

/**
 * 下载页面
 * @returns 
 */
const Download = () => {
  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="正在下载" key="1">
        <Downloading />
      </TabPane>
      <TabPane tab="下载完成" key="2">
        <DownloadDone />
      </TabPane>
    </Tabs>
  )
}

export default Download;