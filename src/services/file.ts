/*
 * @Descripttion:
 * @version:
 * @Author: Wynters
 * @Date: 2024-05-18 15:44:53
 * @LastEditTime: 2024-05-20 17:30:49
 * @FilePath: \umi-rust-panel\src\services\file.ts
 */
import Tool from '@/utils/tool';
import { request } from '@umijs/max';
const BASE: string = '/api/v1/file';

interface List {
  path: string;
  current: number;
  pageSize: number;
}

export async function file_list(params: List) {
  return request<ResponseStructure<any>>(BASE + '/list', {
    method: 'get',
    params: params,
  });
}

export async function file_content(path: string) {
  return request<ResponseStructure<any>>(BASE + '/content', {
    method: 'get',
    params: { path: path },
  });
}

export async function file_save(data: { path: string; content: string }) {
  data.content = Tool.sm4FileEncrypt(data.content);
  return request<ResponseStructure<any>>(BASE + '/save', {
    method: 'post',
    data: data,
  });
}
