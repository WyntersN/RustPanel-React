import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

import YiDict from '@/components/YiDict';
import UploadImgItem from '@/components/YiForm/upload-img';
import YiTable from '@/components/YiTable';
import { ProFormColumnsAndProColumns } from '@/components/YiTable/typings';
import UpdateModel from './components/UpdateModel';
import UpdatePassword from './components/UpdatePassword';

import { listApi } from '@/services/admin/table';
import { useAccess, useModel } from '@@/exports';
import { Access } from '@umijs/max';

interface ResponseAdminList {
  id?: number;
  username?: string;
  nickname?: string;
  avatar?: string;
  email?: string;
  mobile?: string;
  status?: number;
  group_id?: number;
  sex?: number;
  create_time?: string;
  update_time?: string;
}

const Table: React.FC = () => {
  const { getDictionaryData } = useModel('dictModel');

  const columns: ProFormColumnsAndProColumns<ResponseAdminList>[] = [
    {
      title: '用户ID',
      dataIndex: 'id',
      hideInForm: true,
    },
    {
      title: '用户名',
      dataIndex: 'username',
      valueType: 'text',
      formItemProps: { rules: [{ required: true, message: '该项为必填' }] },
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
      valueType: 'text',
      formItemProps: { rules: [{ required: true, message: '该项为必填' }] },
    },
    {
      title: '性别',
      dataIndex: 'sex',
      valueType: 'radio',
      request: async () => getDictionaryData('sex'),
      render: (_, date) => <YiDict value={date.sex} dict={'sex'} />,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      valueType: 'text',
      formItemProps: { rules: [{ required: true, message: '该项为必填' }] },
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      hideInSearch: true,
      valueType: 'text',
      renderFormItem: (schema, config, form) => (
        <UploadImgItem
          form={form}
          dataIndex={'avatar'}
          api={'/mock/api/system/file/upload'}
        />
      ),
      render: (_, data) => (
        <Avatar
          src={data.avatar}
          style={{ backgroundColor: '#4ac4f4' }}
          icon={<UserOutlined />}
        />
      ),
    },
    {
      title: '管理员分组',
      dataIndex: 'group_id',
      valueType: 'treeSelect',
      formItemProps: {
        rules: [{ required: true, message: '该项为必填' }],
      },
      fieldProps: {
        fieldNames: { label: 'name', value: 'id', children: 'children' },
      },
      request: async () => {
        let res = await listApi('/mock/api/admin/adminGroup');
        return res.data.data;
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'radioButton',
      valueEnum: {
        0: {
          text: '禁用',
          status: 'Error',
        },
        1: {
          text: '启用',
          status: 'Success',
        },
      },
      formItemProps: { rules: [{ required: true, message: '该项为必填' }] },
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
      valueType: 'text',
      formItemProps: { rules: [{ required: true, message: '该项为必填' }] },
    },
    {
      title: '密码',
      dataIndex: 'password',
      valueType: 'password',
      hideInTable: true,
      hideInSearch: true,
      formItemProps: { rules: [{ required: true, message: '该项为必填' }] },
    },
    {
      title: '确认密码',
      dataIndex: 'rePassword',
      valueType: 'password',
      hideInTable: true,
      hideInSearch: true,
      formItemProps: {
        rules: [
          { required: true, message: '该项为必填' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('两次输入的密码不同'));
            },
          }),
        ],
      },
    },
    {
      valueType: 'date',
      title: '创建时间',
      order: 1,
      hideInForm: true,
      dataIndex: 'create_time',
    },
    {
      valueType: 'date',
      title: '修改时间',
      hideInForm: true,
      dataIndex: 'update_time',
    },
  ];

  const access = useAccess();

  return (
    <YiTable<ResponseAdminList>
      headerTitle={'管理员列表'}
      tableApi="/mock/api/admin/tableList"
      deleteApi="/mock/api/admin/delete"
      columns={columns}
      accessName={'admin.list'}
      operateRender={(record) => (
        <>
          <Access accessible={access.buttonAccess('admin.list.edit')}>
            <UpdateModel record={record} />
          </Access>
          <Access accessible={access.buttonAccess('admin.list.updatePwd')}>
            <UpdatePassword record={record} />
          </Access>
        </>
      )}
    />
  );
};

export default Table;
