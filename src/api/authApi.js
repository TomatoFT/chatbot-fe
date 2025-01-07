import axios from 'axios';
import store from '../store';
import { setToken, clearToken } from '../actions/authActions';

const API_URL = 'http://localhost:8080/api/v1/auth';

export const register = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { username, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    const token = response.data.token;
    store.dispatch(setToken(token));
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logout = () => {
  store.dispatch(clearToken());
};
