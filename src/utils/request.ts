/*
 * @Descripttion:
 * @version:
 * @Author: Wynters
 * @Date: 2024-05-12 14:13:03
 * @LastEditTime: 2024-05-18 12:59:16
 * @FilePath: \umi-rust-panel\src\utils\request.ts
 */
// import { refreshAdminToken } from '@/services/admin';
// import { refreshUserToken } from '@/services/api/user';
import type { AxiosResponse, RequestConfig } from '@umijs/max';
import { history } from '@umijs/max';
import { message as Message } from 'antd';

const requestConfig: RequestConfig = {
  timeout: 50000,
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
  validateStatus: (status: number) => true,

  errorConfig: {
    errorThrower: (error: { data: { error: string } }) => {
      console.log('拦截错误>>>', error);
    },
    errorHandler: (error: any, opts: any) => {
      console.log('拦截错误>>>', error, opts);
    },
  },

  // 请求拦截器
  requestInterceptors: [
    (config: any) => {
      // 拦截请求配置，进行个性化处理。
      let token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = token;
      }
      // const url = config.url.concat('?token = 123');
      return { ...config };
    },
  ],

  beforeRedirect(options, responseDetails) {
    console.log(options, responseDetails);
  },

  // 响应拦截器
  responseInterceptors: [
    // @ts-ignore
    async (response: AxiosResponse): Promise<AxiosResponse> => {
      return Promise.resolve(response);
    },

    (error) => {
      if (error.status === 403 || error.status === 401) {
        localStorage.removeItem('token');
        Message.error('请重新登录');
        history.push(
          localStorage.getItem('v')
            ? '/admin/login?v=' + localStorage.getItem('v')
            : '/admin/login',
        );
        return Promise.resolve(error);
      }

      // 拦截响应数据，进行个性化处理
      // 没有登录拒绝访问
      /* if (response.data.status === 403 || response.data.status === 401) {
        localStorage.removeItem('token');
        history.push('/');
        Message.error('请重新登录');
        return Promise.resolve(response);
      }
      // 登录状态过期，刷新令牌并重新发起请求
      if (response.data.status === 409) {
        // let app = localStorage.getItem('app');
        let res;
        /* if(app === null || app === 'app'){
          // 刷新用户令牌
           res = await refreshUserToken()
        }else {
          // 刷新管理员令牌
           res = await refreshAdminToken()
        } 
        res = {} as any;
        if (res.success) {
          localStorage.setItem('token', res.data.token);
          response.headers!.Authorization = res.data.token;
          // 重新发送请求
          let data = await request(response.config.url!, response.config);
          return Promise.resolve(data);
        } else {
          return Promise.reject(res);
        }
      }
      if (response.data.status !== 200) {
          return Promise.reject(response);
      }*/
      return Promise.resolve(error);
    },
  ],
};

export default requestConfig;
