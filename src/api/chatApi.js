import axios from 'axios';
import store from '../store';

const API_URL = '/api/v1/chats';

const getAuthHeaders = () => {
  const state = store.getState();
  return {
    headers: {
      Authorization: `Bearer ${state.token}`,
    },
  };
};

export const createChat = async (title) => {
  try {
    const response = await axios.post(API_URL, { title }, getAuthHeaders());
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
