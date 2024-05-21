import { addApi as addTableRow } from '@/services/admin/table';
import { BetaSchemaForm } from '@ant-design/pro-components';
import { Button, message } from 'antd';
import { CreateFormProps } from '../typings';

function CreateForm<TableData>(props: CreateFormProps<TableData>) {
  const { columns, addApi, tableRef, handleAdd, addBefore } = props;

  /**
   * 添加节点
   * @param formData
   */
  const defaultAdd = async (formData: TableData) => {
    if (!addApi) {
      return;
    }
    if (handleAdd) {
      return handleAdd(formData).finally(() => {
        tableRef.current?.reloadAndRest?.();
      });
    } else {
      const hide = message.loading('正在添加');
      return addTableRow(addApi, Object.assign({}, formData))
        .then((res) => {
          if (res.success) {
            message.success('添加成功');
            addBefore?.();
            return true;
          }
          return false;
        })
        .finally(() => {
          hide();
          tableRef.current?.reloadAndRest?.();
        });
    }
  };

  return (
    <BetaSchemaForm<TableData>
      rowProps={{
        gutter: [16, 16],
      }}
      title={'新建'}
      trigger={<Button type="primary">新建</Button>}
      layoutType={'ModalForm'}
      colProps={{
        span: 12,
      }}
      modalProps={{ destroyOnClose: true }}
      initialValues={{}}
      grid={true}
      onFinish={defaultAdd}
      columns={columns}
    />
  );
}

export default CreateForm;
