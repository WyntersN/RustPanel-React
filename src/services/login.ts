import { request } from '@umijs/max';
import Tool from '@/utils/tool';
const BASE: string = '/api/v1/login';
export async function get_security_dir(params: { v?: string }) {
  return request<ResponseStructure<any>>(BASE + '/security_dir', {
    method: 'get',
    params,
  });
}

export async function sign(v: string, data: USER.UserLoginFrom) {
 
  let timestamp = new Date().getTime();
  return request<ResponseStructure<any>>(BASE + '/sign/' + v, {
    method: 'post',
    data: {username: Tool.sm4Login(data.username!,v+timestamp,v ), password: Tool.sm4Login(data.password!,v+timestamp,v ),timestamp: timestamp},
  });
}
