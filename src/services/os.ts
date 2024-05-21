import { request } from '@umijs/max';
const BASE: string = '/api/v1';

export async function os_info() {
    return request<ResponseStructure<any>>(BASE + '/os_info', {
      method: 'get',
    });
  }