import YiTable from '@/components/YiTable';
import {
  ProFormColumnsAndProColumns,
  YiTableActions,
} from '@/components/YiTable/typings';
import { GetUserGroupPid } from '@/services/admin/userAuth';
import { Access, useAccess } from '@umijs/max';
import { useBoolean } from 'ahooks';
import React, { useEffect, useState } from 'react';
import GroupRule from './components/GroupRule';

/** Api 接口 */
const api: YiTableActions = {
  tableApi: '/mock/api/user/group/tableList',
  addApi: '/mock/api/user/group/add',
  editApi: '/mock/api/user/group/edit',
  deleteApi: '/mock/api/user/group/delete',
};

interface ResponseAdminList {
  id?: number;
  name?: string;
  pid?: string;
  create_time?: string;
  updata_time?: string;
}

const Table: React.FC = () => {
  const [parentNode, setParentNode] = useState();

  const [ref, setRef] = useBoolean();

  // 获取父节点ID
  useEffect(() => {
    GetUserGroupPid().then((res) => {
      if (res.success) {
        setParentNode(res.data.data);
      }
    });
  }, [ref]);

  /* 自定义渲染编辑行的数据 */
  const formPid = ({ type }: any): any[] => {
    return type !== '0'
      ? [
          {
            title: '父节点',
            dataIndex: 'pid',
            valueType: 'treeSelect',
            initialValue: '0',
            fieldProps: {
              options: parentNode,
            },
            formItemProps: {
              rules: [{ required: true, message: '此项为必填项' }],
            },
          },
        ]
      : [];
  };

  const columns: ProFormColumnsAndProColumns<ResponseAdminList>[] = [
    {
      title: '类型',
      dataIndex: 'type',
      valueType: 'radio',
      hideInTable: true,
      initialValue: '0',
      formItemProps: {
        rules: [{ required: true, message: '此项为必填项' }],
      },
      fieldProps: {
        options: [
          {
            label: '根节点',
            value: '0',
          },
          {
            label: '子节点',
            value: '1',
          },
        ],
      },
    },
    {
      title: 'ID',
      dataIndex: 'id',
      hideInForm: true,
      hideInTable: true,
    },
    {
      title: '分组名',
      dataIndex: 'name',
      valueType: 'text',
    },
    {
      valueType: 'dependency',
      name: ['type'],
      hideInTable: true,
      columns: formPid,
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      valueType: 'date',
      hideInForm: true,
    },
    {
      title: '编辑时间',
      dataIndex: 'update_time',
      valueType: 'date',
      hideInForm: true,
    },
  ];
  const [open, setOpen] = useState(false);
  const [record, setRecord] = useState<ResponseAdminList>({});
  const onClose = () => setOpen(false);
  const access = useAccess();
  return (
    <>
      <GroupRule open={open} onClose={onClose} record={record}></GroupRule>
      <YiTable<ResponseAdminList>
        {...api}
        columns={columns}
        search={false}
        accessName={'admin.group'}
        addBefore={() => setRef.toggle()}
        operateRender={(data) => {
          return (
            <Access accessible={access.buttonAccess('admin.group.rule')}>
              <a
                onClick={() => {
                  setRecord(data);
                  setOpen(true);
                }}
              >
                权限配置
              </a>
            </Access>
          );
        }}
      />
    </>
  );
};

export default Table;
