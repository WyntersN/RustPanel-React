import { Navigate, type RuntimeConfig } from '@umijs/max';
import { lazy } from 'react';

const lazyLoad = (moduleName: string) => {
  const Module = lazy(() => import(`../../pages/${moduleName}`));
  return <Module />;
};

const defaultRoutes = [
  {
    name: '登录',
    path: '/login',
    id: 'login',
    element: lazyLoad('auth/login'),
    layout: false,
  },
  {
    name: 'xds',
    path: '/xds',
    id: 'xdss',
    icon: 'CloseOutlined',
    element: lazyLoad('/xds'),
  },
];

export const clientRoutes: RuntimeConfig['patchClientRoutes'] = ({
  routes,
}) => {
  routes.unshift({ path: '/', element: <Navigate to="/home" replace /> });

  routes.push(...defaultRoutes);
  // console.log('1 ---------------> patchClientRoutes', routes);
};
