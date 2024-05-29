/*
 * @Descripttion:
 * @version:
 * @Author: Wynters
 * @Date: 2024-05-12 14:13:03
 * @LastEditTime: 2024-05-12 15:38:42
 * @FilePath: \umi-rust-panel\src\constants\index.ts
 */
export const DEFAULT_NAME = 'RustPanel';

export const LOGIN_PATH = localStorage.getItem('v')
  ? '/login?v=' + localStorage.getItem('v')
  : '/login';

export const ROUTER_WHITE = [
  '/user/login',
  '/user/register',
  '/user/resetPassword',
];

export const NOAUTHROUTER = ['/', '/home', '/login'];
