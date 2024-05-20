import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppstoreOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import AuthService from './services/auth.service';

const Header = () => {
  const [current, setCurrent] = useState('mail');
  const navigation = useNavigate();

const items = [
  {
    label: 'Профиль',
    key: 'profile',
    icon: <UserOutlined />,
    onClick: () => {
      navigation('/profile');
    },
  },
  {
    label: 'Сообщения',
    key: 'messages',
    icon: <MailOutlined />,
    onClick: () => {
      navigation('/messages');
    },
  },
  {
    label: 'Navigation Two',
    key: 'app',
    icon: <AppstoreOutlined />,
    onClick: () => {
      navigation('/items');
    },
  },
  {
    label: 'login',
    key: 'login',
    icon: <AppstoreOutlined />,
    onClick: () => {
      navigation('/login');
    },
  },
  {
    label: 'Logout',
    key: 'logout',
    icon: <AppstoreOutlined />,
    onClick: () => {
      AuthService.logout();
      navigation('/');
    },
  },
];
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};
export default Header;