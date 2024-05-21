import { request } from '@umijs/max';
import React from 'react';

/**
 * 获取权限父节点ID
 */
export async function GetRulePid() {
  return request<ResponseStructure<any>>('/mock/adminGroup/GetRulePid', {
    method: 'get',
  });
}

/**
 * 根据管理员分组获取权限
 * @param params
 */
export async function GetRuleByGroup(params: { group_id: number }) {
  return request<ResponseStructure<any>>('/mock/adminGroup/getRuleByGrou', {
    method: 'get',
    params,
  });
}

/**
 * 获取与管理员分组父ID
 */
export async function GetAdminGroupPid() {
  return request<ResponseStructure<any>>('/mock/adminGroup/getGroupPid', {
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
  return request<ResponseStructure<any>>('/mock/adminGroup/setGroupRule', {
    method: 'post',
    data: data,
  });
}

/**
 * 通过管理员分组获取权限
 * @param params
 */
export async function GetGroupRule(params: { group_id: number }) {
  return request<ResponseStructure<any>>('/mock/adminGroup/getGroupRule', {
    method: 'get',
    params,
  });
}
