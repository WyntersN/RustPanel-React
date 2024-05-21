import YiTable from '@/components/YiTable';
import {
  ProFormColumnsAndProColumns,
  YiTableActions,
} from '@/components/YiTable/typings';
import DictItem from '@/components/user/DictItem';
import { useAccess } from '@@/exports';
import { Access } from '@umijs/max';
import { useState } from 'react';

const apis: YiTableActions = {
  tableApi: '/mock/api/system/dictList',
  addApi: '/mock/api/admin/adminRule/add',
  editApi: '/mock/api/admin/adminRule/edit',
  deleteApi: '/mock/api/admin/adminRule/delete',
};

interface Data {
  id?: number;
  name?: string;
  describe?: string;
  create_time?: string;
  code?: string;
  update_time?: string;
}

const columns: ProFormColumnsAndProColumns<Data>[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    hideInForm: true,
  },
  {
    title: '字典名称',
    dataIndex: 'name',
    valueType: 'text',
    formItemProps: {
      rules: [{ required: true, message: '请输入字典名称' }],
    },
  },
  {
    title: '字典编码',
    dataIndex: 'code',
    valueType: 'text',
  },
  {
    title: '类型',
    dataIndex: 'type',
    valueType: 'select',
    valueEnum: {
      default: { text: '文字', status: 'Success' },
      badge: {
        text: '徽标',
        status: 'Success',
      },
      tag: {
        text: '标签',
        status: 'Success',
      },
    },
    formItemProps: {
      rules: [{ required: true, message: '请选择类型' }],
    },
  },
  {
    title: '描述',
    dataIndex: 'describe',
    valueType: 'text',
    hideInSearch: true,
  },
  {
    title: '创建时间',
    dataIndex: 'create_time',
    valueType: 'date',
    hideInForm: true,
  },
  {
    title: '修改时间',
    dataIndex: 'update_time',
    valueType: 'date',
    hideInForm: true,
  },
];

const Table: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [record, setRecord] = useState<Data>({});
  const access = useAccess();
  const onClose = () => setOpen(false);

  return (
    <>
      <DictItem open={open} onClose={onClose} dictData={record} />
      <YiTable<Data>
        {...apis}
        columns={columns}
        operateRender={(record: Data) => {
          return (
            <Access accessible={access.buttonAccess('system.dict.item.list')}>
              <a
                onClick={() => {
                  setRecord(record);
                  setOpen(true);
                }}
              >
                字典配置
              </a>
            </Access>
          );
        }}
        accessName={'system.dict'}
      />
    </>
  );
};

export default Table;
