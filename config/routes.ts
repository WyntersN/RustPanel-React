/*
 * @Descripttion: 
 * @version: 
 * @Author: Wynters
 * @Date: 2024-05-12 14:13:03
 * @LastEditTime: 2024-05-12 15:32:25
 * @FilePath: \umi-rust-panel\config\routes.ts
 */
import { defineConfig } from '@umijs/max';
type Router = ReturnType<typeof defineConfig>['routes'];

export const routes: Router = [
  {
    path: '/',
    redirect: '/home',
  },
  // {
  //   name: '首页',
  //   path: '/home',
  //   icon: 'HomeOutlined',
  //   component: './Home',
  // },
  // {
  //   name: '卡片列表',
  //   path: '/card-list',
  //   icon: 'TableOutlined',
  //   component: './CardList',
  //   hideInBreadcrumb: false,
  // },
  // {
  //   name: '权限演示',
  //   path: '/access',
  //   icon: 'LockOutlined',
  //   component: './Access',
  //   hideInBreadcrumb: false,
  // },
  // {
  //   name: ' CRUD 示例',
  //   path: '/table',
  //   icon: 'TableOutlined',
  //   component: './Table',
  //   hideInBreadcrumb: false,
  // },
  // {
  //   name: '客户管理',
  //   path: '/customer-manage',
  //   icon: 'UserOutlined',
  //   component: './CustomerManage',
  //   hideInBreadcrumb: false,
  //   routes: [
  //     {
  //       name: '客户列表',
  //       path: '/customer-manage/list',
  //       component: './CustomerManage/List',
  //     },
  //     {
  //       name: '客户认证',
  //       path: '/customer-manage/auth',
  //       component: './CustomerManage/Auth',
  //     },
  //   ],
  // },
  {
    name: 'Login',
    path: '/login',
    component: './Login',
    layout: false,
  },
];
