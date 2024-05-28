/*
 * @Descripttion:
 * @version:
 * @Author: Wynters
 * @Date: 2024-05-20 15:11:04
 * @LastEditTime: 2024-05-28 19:54:27
 * @FilePath: \RustPanel-react\src\pages\file\component\code.tsx
 */
import { file_content, file_save } from '@/services/file';
import Tool from '@/utils/tool';
import { Modal, Spin, message } from 'antd';
import React, { useEffect, useState } from 'react';
import MonacoEditor from 'react-monaco-editor';

const options: any = {
  selectOnLineNumbers: false,
  wordWrap: 'on', // 开启自动换行
  //wordWrapMinified: true, // 对压缩内容启用换行
  roundedSelection: false,
  readOnly: false, // //是否只读  取值 true | false
  cursorStyle: 'line',
  automaticLayout: false, // 自动布局
  fontSize: 16, // 设置字体大小
};

export interface codeProps {
  path: string;
  onCancel: () => void;
  visible: boolean;
}
let codeData: string = '';

const Code: React.FC<codeProps> = (props) => {
  // console.log(props.codeData,"----------------------");
  let [code, setCode] = useState('');
  const [language, setLanguage] = useState('');
  const [loading, setLoading] = React.useState<boolean>(false);
  const handleCodeSave = async (event: any) => {
    setLoading(true);
    // Ctrl + S or Cmd + S
    try {
      if (
        (event.key === 's' || event.key === 'S') &&
        (event.ctrlKey || event.metaKey)
      ) {
        event.preventDefault();
        // console.log(code, '-------------\n', codeData);

        if (codeData !== code) {
          const res = await file_save({
            path: props.path,
            content: codeData,
          });

          if (res.code === 200) {
            message.success('保存成功');
            code = codeData;
          } else {
            message.error('保存失败');
          }
        } else {
          message.info('无内容修改');
        }

        //console.log('----------------');

        // 在这里执行保存操作
      }
    } catch (error) {
      console.error('Error fetching security dir:', error);
    }
    setLoading(false);
  };

  const getFileContent = async (path: string) => {
    setLoading(true);
    try {
      const res = await file_content(path);
      setLoading(false);
      if (res.code === 200) {
        setLanguage(res.data.ext);
        setCode(Tool.sm4FileDecrypt(res.data.content));
        codeData = code;
      } else {
        message.error(res.message);
        props.onCancel();
      }
    } catch (error) {
      console.error('Error fetching security dir:', error);
    }
    setLoading(false);
  };

  const onChange = (newValue: any) => {
    codeData = newValue;
  };

  const editorDidMount = (editor: any) => {
    getFileContent(props.path);
  };

  useEffect(() => {
    // 添加键盘事件监听器
    document.addEventListener('keydown', handleCodeSave);
    document.addEventListener('keyup', (event: any) => event.preventDefault());

    return () => {
      document.removeEventListener('keydown', handleCodeSave);
      document.removeEventListener('keyup', (event: any) =>
        event.preventDefault(),
      );
    };
  }, []);

  return (
    <Modal
      destroyOnClose
      width={900}
      open={props.visible}
      onCancel={props.onCancel}
    >

      <Spin spinning={loading} tip="Loading...">
        <MonacoEditor
          width="98%"
          height={700}
          theme={'vs-dark'}
          language={language}
          value={code}
          options={options}
          onChange={onChange}
          editorDidMount={editorDidMount}
        />
      </Spin>
    </Modal>
  );
};

export default Code;
