import axios from "axios";
import authHeader from './auth-header';

const API_URL = "/api/auth/";

class AuthService {
  async login(name, password) {
    const response = await axios
      .post(API_URL + "signin", {
        name,
        password
      });
    if (response.data.accessToken) {
      // записываем данные пользователя в локальное хранилище
      localStorage.setItem("player", JSON.stringify(response.data));
    }
    return response.data;
  }

  async validateJwt() {
    const response = await axios
      .post(API_URL + "validate-jwt", {
        headers: authHeader()['x-access-token']
      });
    if (response.data) {
      console.log("validateJwt: ", response.data);
    } 

    return response.data;
  }

  logout() {
    // удаляем пользователя из локального хранилища
    localStorage.removeItem("player");
  }

  register(name, email, password, playerclass, position) {
    return axios.post(API_URL + "signup", {
      name: name,
      playerclass: playerclass,
      email: email,
      level:1,
      position: position,
      password: password
      // password: hashPassword(password)
      // TODO: добавить поля с другими данными
    });
  }

  getCurrentUser() {
    // console.log("getCurrentUser: ", localStorage.getItem("player"));
    return JSON.parse(localStorage.getItem("player"));
    
  }
}

const authServiceInstance = new AuthService();
export default authServiceInstance;