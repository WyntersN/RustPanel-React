import { request } from '@umijs/max';

const api = {
  loginApi: '/mock/admin/index/login', // 用户登录
  logoutApi: '/mock/admin/index/logout', // 退出登录
  
};

/**
 * 管理端用户登录
 * @param data
 * @constructor
 */
export async function UserLogin(data: USER.UserLoginFrom) {
  return request<USER.LoginResult>(api.loginApi, {
    method: 'post',
    data,
  });
}

/**
 * 获取管理员用户信息
 * @constructor
//  */
// export async function GetAdminInfo() {
//   return request<USER.UserResult>(api.getAdminInfoApi, {
//     method: 'get',
//   });
// }

/**
 * 退出登录
 * @constructor
 */
export async function Logout() {
  return request<ResponseStructure<any>>(api.logoutApi, {
    method: 'post',
  });
}
