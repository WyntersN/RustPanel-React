import { request } from '@umijs/max';
const BASE: string = '/api/v1/user';

export async function get_menus() {
    return request<ResponseStructure<any>>(BASE + '/menus', {
      method: 'get',
    });
  }