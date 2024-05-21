import { ProFormColumnsAndProColumns } from '@/components/YiTable/typings';
import { editApi } from '@/services/admin/table';
import { UserOutlined } from '@ant-design/icons';
import { BetaSchemaForm } from '@ant-design/pro-components';
import { Avatar, message, Space, Tag } from 'antd';

interface UpDatePasswordForm {
  id?: number;
  avatar?: string;
  nickname?: string;
  password?: string;
  rePassword: string;
}

interface ResponseAdminList {
  id?: number;
  username?: string;
  nickname?: string;
  avatar?: string;
  email?: string;
  mobile?: string;
  motto?: string;
  sex?: number;
  create_time?: string;
  update_time?: string;
}

const UpdateForm = (props: { record: ResponseAdminList }) => {
  const { record } = props;
  const columns: ProFormColumnsAndProColumns<UpDatePasswordForm>[] = [
    {
      title: '管理员',
      dataIndex: 'id',
      valueType: 'text',
      renderFormItem: () => (
        <Space>
          <Avatar
            src={record.avatar}
            style={{ backgroundColor: '#87d068' }}
            icon={<UserOutlined />}
            size={24}
          />
          <Tag icon={<UserOutlined />} color="geekblue">
            ID：{record.id}
          </Tag>
          {record.username ? (
            <Tag color="purple">Name：{record.username}</Tag>
          ) : (
            ''
          )}
          {record.mobile ? (
            <Tag color="magenta">Mobile：{record.mobile}</Tag>
          ) : (
            ''
          )}
        </Space>
      ),
    },
    {
      title: '密码',
      dataIndex: 'password',
      valueType: 'password',
      formItemProps: { rules: [{ required: true, message: '该项为必填' }] },
    },
    {
      title: '确认密码',
      dataIndex: 'rePassword',
      valueType: 'password',
      formItemProps: {
        rules: [
          { required: true, message: '该项为必填' },
          ({ getFieldValue }: any) => ({
            validator(_: unknown, value: string) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('两次输入的密码不同'));
            },
          }),
        ],
      },
    },
  ];

  /**
   * 更新节点
   * @param fields
   */
  const defaultUpdate = async (fields: UpDatePasswordForm) => {
    const hide = message.loading('正在更新');
    return editApi(
      '/admin/updatePassword',
      Object.assign({ id: record.id }, fields),
    )
      .then((res) => {
        if (res.success) {
          message.success('更新成功！');
          return true;
        }
        return false;
      })
      .finally(() => {
        hide();
      });
  };

  return (
    <BetaSchemaForm<UpDatePasswordForm>
      trigger={<a>修改密码</a>}
      title={'修改管理员密码'}
      layoutType={'ModalForm'}
      rowProps={{
        gutter: [16, 16],
      }}
      colProps={{
        span: 24,
      }}
      grid={true}
      onFinish={defaultUpdate}
      columns={columns}
    />
  );
};
export default UpdateForm;
