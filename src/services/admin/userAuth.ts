import { request } from '@umijs/max';

const api = {
  setGroupRuleApi: '/mock/api/user/setGroupRule', // 设置分组权限
  getGroupRuleApi: '/mock/api/user/getGroupRule', /// 获取分组权限
  getRuleByGroupApi: '/mock/api/user/getRuleByGroup', // 通过分组获取权限
  getGroupPidApi: '/mock/api/user/group/getGroup', // 获取分组 父ID
  getRulePidApi: '/mock/api/user/getRulePid', // 获取权限Pid
};

/**
 * 获取权限父节点ID
 */
export async function GetRulePid() {
  return request<ResponseStructure<any>>(api.getRulePidApi, {
    method: 'get',
  });
}

/**
 * 设置管理员分组权限
 * @param data
 */
export async function SetGroupRule(data: {
  id: number;
  rule_ids: React.Key[];
}) {
  return request<ResponseStructure<any>>(api.setGroupRuleApi, {
    method: 'post',
    data: data,
  });
}

/**
 * 通过管理员分组获取权限
 * @param params
 */
export async function GetGroupRule(params: { group_id: number }) {
  return request<ResponseStructure<any>>(api.getGroupRuleApi, {
    method: 'get',
    params,
  });
}

/**
 * 根据管理员分组获取权限
 * @param params
 */
export async function GetRuleByGroup(params: { group_id: number }) {
  return request<ResponseStructure<any>>(api.getRuleByGroupApi, {
    method: 'get',
    params,
  });
}

/**
 * 获取与管理员分组父id
 */
export async function GetUserGroupPid() {
  return request<ResponseStructure<any>>(api.getGroupPidApi, {
    method: 'get',
  });
}
