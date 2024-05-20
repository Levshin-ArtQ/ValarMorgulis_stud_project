import { React, useState, useEffect } from 'react';
import useApi from '../hooks/useApi';
import { Link, useNavigate, useParams} from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import './LoginPage.css'
import AuthService from '../services/auth.service';
const LoginPage = () => {
  const {data, error, loading, fetchData} = useApi();
  const navigate = useNavigate();
  const { previous } = useParams();
  const [message, setMessage] = useState('');
  // useEfffect to check if user is logged in via jwt token and redirect to items if so
  useEffect(() => {
    
    fetchData('/api/validate-jwt').then(() => {
      // navigate('/items');
    });
    setMessage(...error ? error.message : '');
  } , [])
  
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    AuthService.login(values.name, values.password).then(
      () => { 
        previous ? navigate(previous) : navigate('/items');
        console.log('Пользователь авторизован успешно')
      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        console.log(resMessage);
        setMessage(resMessage);
      }
    );
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className='login_wrapper'>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: 'Введите логин',
              // type: 'email',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Имя" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Запомнить меня</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="/">
            Забыл пароль
          </a>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <Link to="/register">register now!</Link>
        </Form.Item>
        <div>{message}</div>
      </Form>
    </div>
  );
};
export default LoginPage; 