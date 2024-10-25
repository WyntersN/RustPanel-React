import { get_security_dir, sign } from '@/services/login';
import { LockOutlined, MobileOutlined, UserOutlined } from '@ant-design/icons';
import { PageLoading } from '@ant-design/pro-components';

import {
  LoginForm,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';

import { history, useLocation, useModel } from '@umijs/max';
import { message } from 'antd';
import type { CSSProperties } from 'react';
import React, { useEffect, useState } from 'react';

const iconStyle: CSSProperties = {
  color: 'rgba(0, 0, 0, 0.2)',
  fontSize: '18px',
  verticalAlign: 'middle',
  cursor: 'pointer',
};

const iconDivStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  height: 40,
  width: 40,
  border: '1px solid #D4D8DD',
  borderRadius: '50%',
};

const Login: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const searchParams = new URLSearchParams(useLocation().search);
  const urlParams = { v: searchParams.get('v')?.toString() };

  const [loginType, setLoginType] = useState<USER.LoginType>('account');

  const [securityDir, setIsSecurityDir] = useState<number>(0); // Use state to store the result

  useEffect(() => {
    if (localStorage.getItem('token')) {
      history.push('/home');
    }
    const fetchData = async () => {
      try {
        const res = await get_security_dir(urlParams);
        setIsSecurityDir(Number(res.code)); // Update state with the result
      } catch (error) {
        console.error('Error fetching security dir:', error);
      }
    };

    fetchData(); // Call the async function
  }, []); // Empty dependency array to run once on component mount

  const handleSubmit = async (values: USER.UserLoginFrom) => {
    const v = searchParams.get('v')!.toString();
    const msg = await sign(v, values);

    if (!msg.success) {
      message.error(msg.message);
      return;
    }

    message.success('登录成功！');
    // 记录令牌

    localStorage.setItem('v', v);
    localStorage.setItem('token', msg.data.token);
    localStorage.setItem('refresh_token', msg.data.refresh_token);
    localStorage.setItem('app', 'admin');

    const userInfo = await initialState!.fetchAdminInfo?.();
    setInitialState((init: any) => {
      return {
        ...init,
        isLogin: true,
        isAccess: true,
        currentUser: userInfo.adminInfo,
        menus: userInfo.menus,
        access: userInfo.access,
      };
    });
    const urlParams = new URL(window.location.href).searchParams;
    history.push(urlParams.get('redirect') || '/home');

    return;
  };

  return securityDir === 0 ? (
    <div>
      <title>正在加载...</title>
      <PageLoading />
    </div>
  ) : securityDir !== 200 ? (
    <div style={{ padding: '10px' }}>
      <title>请使用正确的入口登录面板</title>
      <h1>请使用正确的入口登录面板</h1>
      <p>
        <b>错误原因：</b>
        当前新安装的已经开启了安全入口登录，新装机器都会随机一个8位字符的安全入口名称，亦可以在面板设置处修改，如您没记录或不记得了，可以使用以下方式解决
      </p>
      <p>
        <b>解决方法：</b>在SSH终端输入以下一种命令来解决
      </p>
      <p>
        1.查看面板入口：
        <code
          style={{
            backgroundColor: '#efefef',
            padding: '2px 5px',
            fontSize: '18px',
            fontWeight: '700',
            fontFamily:
              "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
          }}
        >
          rp default
        </code>
      </p>
      <p style={{ color: 'red' }}>
        注意：【关闭安全入口】将使您的面板登录地址被直接暴露在互联网上，非常危险，请谨慎操作
      </p>
      <div className="alert">
        <i className="icon icon-info-sign"></i> 嘿！这是一则提示。
      </div>
    </div>
  ) : (
    <div
      style={{
        paddingTop: 50,
        height: '100vh',
        backgroundImage:
          'url(https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png)',
      }}
    >
      <title>Rust Panel</title>
      <title>My Custom Page Title</title>
      <LoginForm
        logo={initialState!.webSetting.logo || '/images/logo.png'}
        title={initialState!.webSetting.title || 'RustPanel'}
        subTitle={initialState!.webSetting.subtitle || 'RustPanel'}
        actions={
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            {/* <Divider plain>
              <span
                style={{ color: '#CCC', fontWeight: 'normal', fontSize: 14 }}
              >
                其他登录方式
              </span>
            </Divider>
            <Space align="center" size={24}>
              <div style={iconDivStyle}>
                <QqOutlined style={{ ...iconStyle, color: 'back' }} />
              </div>
              <div style={iconDivStyle}>
                <WechatOutlined
                  style={{ ...iconStyle, color: 'rgb(0,172,132)' }}
                />
              </div>
              <div style={iconDivStyle}>
                <AlipayOutlined style={{ ...iconStyle, color: '#1677FF' }} />
              </div>
              <div style={iconDivStyle}>
                <TaobaoOutlined style={{ ...iconStyle, color: '#FF6A10' }} />
              </div>
              <div style={iconDivStyle}>
                <WeiboOutlined style={{ ...iconStyle, color: '#333333' }} />
              </div>
            </Space> */}
          </div>
        }
        onFinish={async (values) => {
          await handleSubmit(values as USER.UserLoginFrom);
        }}
      >
        {/* <Tabs
          centered
          activeKey={loginType}
          onChange={(activeKey) => setLoginType(activeKey as USER.LoginType)}
          items={[
            {
              key: 'account',
              label: '账号密码登录',
            },
            {
              key: 'phone',
              label: '手机号登录',
            },
          ]}
        ></Tabs> */}
        {loginType === 'account' && (
          <>
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={'prefixIcon'} />,
              }}
              placeholder={'用户名: admin'}
              rules={[{ required: true, message: '请输入用户名!' }]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={'prefixIcon'} />,
              }}
              placeholder={'密码: 123456'}
              rules={[{ required: true, message: '请输入密码！' }]}
            />
          </>
        )}
        {loginType === 'phone' && (
          <>
            <ProFormText
              fieldProps={{
                size: 'large',
                prefix: <MobileOutlined className={'prefixIcon'} />,
              }}
              name="mobile"
              placeholder={'手机号'}
              rules={[
                {
                  required: true,
                  message: '请输入手机号！',
                },
                {
                  pattern: /^1\d{10}$/,
                  message: '手机号格式错误！',
                },
              ]}
            />
            <ProFormCaptcha
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={'prefixIcon'} />,
              }}
              captchaProps={{
                size: 'large',
              }}
              placeholder={'请输入验证码'}
              captchaTextRender={(timing, count) => {
                if (timing) {
                  return `${count} ${'获取验证码'}`;
                }
                return '获取验证码';
              }}
              name="captcha"
              rules={[
                {
                  required: true,
                  message: '请输入验证码！',
                },
              ]}
              onGetCaptcha={async () => {
                message.success('获取验证码成功！验证码为：1234');
              }}
            />
          </>
        )}
        <div style={{ marginBlockEnd: 24 }}>
          <ProFormCheckbox noStyle name="autoLogin">
            自动登录
          </ProFormCheckbox>
          <a style={{ float: 'right' }}>忘记密码</a>
        </div>
      </LoginForm>
    </div>
  );
};

export default Login;
