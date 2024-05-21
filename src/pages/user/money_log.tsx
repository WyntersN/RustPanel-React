// CRUD 一键生成
import YiDict from '@/components/YiDict';
import YiTable from '@/components/YiTable';
import { ProFormColumnsAndProColumns } from '@/components/YiTable/typings';
import AddMoneyLog from '@/components/user/AddMoneyLog';
import { UserOutlined } from '@ant-design/icons';
import { useModel } from '@umijs/max';
import { Avatar, Popover, Space } from 'antd';
import React from 'react';

/**
 *  Api 接口
 */
const api = {
  tableApi: '/mock/api/user/userMoneyLog/list',
  deleteApi: '/mock/api/user/userMoneyLog/delete',
};

/**
 *  数据类型
 */
interface Data {
  id: number;
  user_id: string;
  user: USER.UserInfo;
  scene: string;
  money: string;
  describe: string;
  remark: string;
  create_time: string;
}

/**
 * 表格渲染
 */
const User: React.FC = () => {
  const { getDictionaryData } = useModel('dictModel');

  const userInfo = (info: USER.UserInfo) => {
    return (
      <>
        <p>用户ID：{info.id}</p>
        <p>用户昵称：{info.nickname}</p>
        <p>用户名：{info.username}</p>
        <p>用户邮箱：{info.email}</p>
        <p>用户余额：{info.money} ￥</p>
      </>
    );
  };

  const columns: ProFormColumnsAndProColumns<Data>[] = [
    {
      valueType: 'digit',
      title: '记录ID',
      order: 99,
      hideInForm: true,
      dataIndex: 'id',
    },
    {
      valueType: 'text',
      title: '用户 ID',
      order: 98,
      dataIndex: 'user_id',
      hideInForm: true,
      hideInTable: true,
    },
    {
      valueType: 'text',
      title: '用户',
      order: 98,
      dataIndex: 'user_Id',
      search: false,
      render: (_, date) => (
        <Popover
          placement="left"
          content={userInfo(date.user)}
          title={date.user.nickname}
        >
          <Space style={{ display: 'flex' }}>
            <Avatar src={date.user.avatar} icon={<UserOutlined />}></Avatar>
            {date.user.nickname}
          </Space>
        </Popover>
      ),
    },
    {
      valueType: 'text',
      title: '类型',
      order: 93,
      dataIndex: 'scene',
      request: async () => getDictionaryData('moneyLog'),
      render: (_, date) => <YiDict value={date.scene} dict={'moneyLog'} />,
    },
    {
      valueType: 'money',
      title: '变动金额',
      order: 91,
      dataIndex: 'money',
      search: false,
    },
    {
      valueType: 'text',
      title: '描述/备注',
      order: 90,
      search: false,
      dataIndex: 'describe',
    },
    {
      valueType: 'date',
      title: '创建时间',
      order: 1,
      hideInForm: true,
      dataIndex: 'create_time',
    },
  ];
  return (
    <YiTable<Data>
      {...api}
      columns={columns}
      headerTitle={'用户余额变动记录'}
      operateShow={true}
      rowSelectionShow={true}
      accessName={'admin.rule'}
      toolBarRender={() => [<AddMoneyLog key="AddMoneyLog" />]}
    />
  );
};

export default User;
