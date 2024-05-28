import CustomIcon from '@/components/CustomSvg';
import { file_list } from '@/services/file';
import Tool from '@/utils/tool';
import type { TableColumnsType } from 'antd';
import { Breadcrumb, Spin, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import Code from './component/code';
import styles from './css.less';

interface DataType {
  name: string;
  isDir: boolean;
  permissions: any; // 根据实际数据类型定义
  size: number;
  modified_time: number;
}

let urlParams = { path: '/', current: 1, pageSize: 10 };
let pathHeader: any = [];

const List: React.FC = () => {
  const [data, setData] = useState<DataType[]>([]); // Use state to store the result
  const [code, handleCode] = useState({
    name: '',
    visible: false,
  });
  const [loading, setLoading] = React.useState<boolean>(false);

  const getList = async () => {
    setLoading(true);
    try {
      const res = await file_list(urlParams);
      setLoading(false);
      if (res.code === 200) {
        let data: DataType[] = [];
        res.data.dirs.forEach((element: any) => {
          data.push({
            name: element.name,
            isDir: true,
            permissions: element.permissions,
            size: 0,
            modified_time: element.modified_time,
          });
        });
        res.data.files.forEach((element: any) => {
          data.push({
            name: element.name,
            isDir: false,
            permissions: element.permissions,
            size: element.size,
            modified_time: element.modified_time,
          });
        });
        urlParams.path = res.data.path.replace(/\\/g, '/');
        pathHeader = [];
        urlParams.path
          .split('/')
          .forEach((element: any, index: number, array) => {
            if (index === array.length - 1) {
              pathHeader.push({ title: <span>{element}</span> });
            } else {
              pathHeader.push({
                title: (
                  <a
                    style={{
                      color: '#1890ff',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      maxWidth: '200px',
                    }}
                    href="javascript:;"
                    onClick={() => {
                      const path = urlParams.path
                        .split('/')
                        .slice(0, index + 1)
                        .join('/');
                      urlParams.path = path.endsWith('/') ? path : path + '/';
                      getList();
                    }}
                  >
                    {element}
                  </a>
                ),
              });
            }
          });
        setData(data);
      }
    } catch (error) {
      console.error('Error fetching security dir:', error);
    }
  };

  useEffect(() => {
    getList(); // Call the async function
  }, []); // Empty dependency array to run once on component mount

  const columns: TableColumnsType<DataType> = [
    {
      title: '文件夹 / 文件',
      dataIndex: 'name',
      filterMode: 'tree',
      onFilter: (value, record) => record.name.startsWith(value as string),
      render: (_, record) =>
        record.isDir ? (
          <a
            href="javascript:;"
            onClick={() => {
              urlParams.path += '/' + record.name;
              getList();
            }}
          >
            <div className={styles.nameDiv}>
              <CustomIcon icon={'dir'} />
              <span className={styles.nameSpan}>{record.name}</span>
            </div>
          </a>
        ) : (
          <a
            href="javascript:;"
            onClick={() => handleCode({ name: record.name, visible: true })}
          >
            <div className={styles.nameDiv}>
              <CustomIcon icon={record.name.split('.').pop()} />
              <span className={styles.nameSpan}>{record.name}</span>
            </div>
          </a>
        ),
      width: '30%',
    },
    {
      title: '大小',
      dataIndex: 'size',
      filterMode: 'tree',
      render: (_, record) => (record.isDir ? '-' : Tool.bytesAuto(record.size)),
      onFilter: (value, record) => record.name.startsWith(value as string),
      width: '30%',
    },
    {
      title: '修改时间',
      dataIndex: 'modified_time',
      render: (_, record) =>
        Tool.dateNumFormat(record.modified_time, 'yyyy-MM-dd hh:mm:ss'),
      filterSearch: true,
      onFilter: (value, record) => record.name.startsWith(value as string),
      width: '30%',
    },
  ];

  return (
    <div>
      <Breadcrumb items={pathHeader} separator=">" />
      <Spin spinning={loading} tip="Loading...">
        <Table
          key={'FileList'}
          columns={columns}
          dataSource={data}
          size="large"
          pagination={{ pageSize: 100 }}
          scroll={{ y: 700 }}
        />
      </Spin>
      {code.visible && code.name && Object.keys(urlParams.path).length ? (
        <Code
          onCancel={() => {
            handleCode({
              name: '',
              visible: false,
            });
          }}
          visible={code.visible}
          path={urlParams.path + '/' + code.name}
        />
      ) : null}
    </div>
  );
};

export default List;
