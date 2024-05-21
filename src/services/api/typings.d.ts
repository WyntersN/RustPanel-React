/*
 * @Descripttion: 
 * @version: 
 * @Author: Wynters
 * @Date: 2024-05-12 14:13:03
 * @LastEditTime: 2024-05-18 15:58:40
 * @FilePath: \umi-rust-panel\src\services\api\typings.d.ts
 */
declare namespace API {
  interface Params {
    /** keyword */
    keyword?: string;
    /** current */
    page?: number;
    /** pageSize */
    page_size?: number;
  }

  interface ListResponse<T> {
    data: T[];
    page: number;
    total: number;
    per_page: number;
    current_page: number;
  }

  // 与后端约定的响应数据格式
  interface ResponseStructure<T> {
    success: boolean;
    data: T;
    code?: number;
    message?: string;
  }

  type TableData<T> = ResponseStructure<ListResponse<T>>;

  interface UserLoginFrom {
    username?: string;
    password?: string;
    autoLogin?: boolean;
    mobile?: string;
    captcha?: number;
    loginType?: LoginType;
  }

  type LoginType = 'phone' | 'account';
}
