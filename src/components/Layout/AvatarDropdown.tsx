import { LOGIN_PATH } from '@/constants';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Dropdown, MenuProps } from 'antd';

// import { Logout as AdminLogout } from "@/services/admin";
import { history } from '@umijs/max';

export default ({ dom }: any) => {
  const logout = async () => {
    // await AdminLogout()
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('userinfo');
    localStorage.removeItem('api');
    // location.href = '/login'
    history.push(LOGIN_PATH);
  };

  const items: MenuProps['items'] = [
    {
      key: 'personal',
      icon: <UserOutlined />,
      label: '个人中心',
      // onClick: () => {history.push('/s/user')}
    },
    { type: 'divider' },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
      onClick: logout,
    },
  ];

  return <Dropdown menu={{ items: items }}>{dom}</Dropdown>;
};
