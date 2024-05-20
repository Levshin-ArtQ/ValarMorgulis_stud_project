import { React, useEffect, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select } from "antd";
import axios from "axios";
import "./LoginPage.css";
import AuthService from "../services/auth.service";
import Player from "../components/Player";
import { PlayerContext } from "../PlayerContext";
const RegisterPage = () => {
  const navigate = useNavigate();
  const [locations, setLocations] = useState([]);
  const { previous } = useParams();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('/api/locations/');
      setLocations(result.data);
      console.log('Locations:', result);
    };
    fetchData();
  }, []);
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    AuthService.register(values.name, values.email, values.password, values.playerclass, values.position).then(
      () => {
        previous ? navigate(previous) : navigate("/");
        console.log("Пользователь авторизован успешно");
      },
      (error) => {
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
  return (
    <div className="login_wrapper">
      <Form
        name="normal_login"
        className="login-form"
        layout="vertical"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="name"
          label="Никнейм"
          rules={[
            {
              required: true,
              message: "Как к вам обращаться?",
              // type: 'email',
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Ваше имя"
          />
        </Form.Item>
        <Form.Item
          name="email"
          label="Почта для связи"
          rules={[
            {
              required: true,
              message: "Введите верный адрес электронной почты",
              type: "email",
            },
          ]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Почта"
          />
        </Form.Item>
        <Form.Item
          name="password"
          label="Придумайте пароль"
          rules={[
            {
              required: true,
              message: "Это обязательное поле!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Пароль"
          />
        </Form.Item>
        <Form.Item name={"playerclass"} label="Выберите класс персонажа">
          <Select>
            <Select.Option value="Knight">Knight</Select.Option>
            <Select.Option value="Wizard">Wizard</Select.Option>
            <Select.Option value="Theif">Thief</Select.Option>
            <Select.Option value="Paladin">Paladin</Select.Option>
          </Select>
        </Form.Item>
        {<Form.Item name={"position"} label="Выберите свою первую локацию">
          <Select>
            {locations.map((location) => (
              <Select.Option key={location.locationId} value={location.description}>
                {location.name}
              </Select.Option>
            ))}
          </Select>
          </Form.Item>}
          
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Зарегистрироваться
          </Button> или <Link to="/login">Войти</Link>
          
        </Form.Item>

        <div>{message}</div>
      </Form>
    </div>
  );
};
export default RegisterPage;
