import { request } from '@umijs/max';

/**
 * 搜索用户
 */
export async function vagueSearchUser(params: { search: string | undefined }) {
  return request<API.TableData<USER.UserInfo>>('/mock/api/user/vagueSearch', {
    method: 'get',
    params,
  });
}

/**
 * 更新用户余额
 */
export async function upUserMoney(data: {
  id: number;
  money: number;
  describe: string;
}) {
  return request<API.ResponseStructure<any>>('/mock/api/user/upUserMoney', {
    method: 'post',
    data,
  });
}
