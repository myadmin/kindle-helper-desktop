import { lazy, ReactNode, Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import { PieChartOutlined, DesktopOutlined, } from '@ant-design/icons';
import LayoutPage from '../pages/Layout';
const Home = lazy(() => import('../pages/Home'));
const Download = lazy(() => import('../pages/Download'));

const lazyLoad = (children: ReactNode): ReactNode => {
  return (
    <Suspense fallback={<>loading...</>}>
      {children}
    </Suspense>
  )
}

interface RouterProps extends RouteObject {
  title?: string;
  icon?: React.ReactNode;
  children?: RouterProps[];
}

const router: RouterProps[] = [
  {
    path: '/',
    element: <LayoutPage />,
    children: [
      { index: true, path: '/', title: '搜索', element: lazyLoad(<Home />), icon: <PieChartOutlined/> },
      { path: '/download', title: '下载', element: lazyLoad(<Download />), icon: <DesktopOutlined/> }
    ]
  }
];

export default router;