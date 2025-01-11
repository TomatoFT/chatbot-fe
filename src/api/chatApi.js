import axios from 'axios';
import store from '../store';

const API_URL = 'http://localhost:8080/api/v1/protected/chats';

const getAuthHeaders = () => {
  const state = store.getState();
  // get local storage token
  const token = localStorage.getItem('token');
  if (state.token) {
    return {
      headers: {
        Authorization: `Bearer ${state.token}`,
      },
    };
  }
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
};

export const createChat = async (name, messages, user_id) => {
  try {
    const response = await axios.post(API_URL, { name, messages, user_id }, getAuthHeaders());
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getChats = async () => {
  try {
    const response = await axios.get(API_URL, getAuthHeaders());
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getChat = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateChat = async (id, title) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, { title }, getAuthHeaders());
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteChat = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    throw error;
  }
};
