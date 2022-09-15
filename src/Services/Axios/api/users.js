import axios from 'axios';
import {
  BaseUrlUsers
} from '../../../Constants/baseUrl';

export const APIUsers = axios.create({
  baseURL: BaseUrlUsers,
});

APIUsers.interceptors.response.use(async (response) => response, (error) => {
  if (error.response.status === 500) {
    localStorage.clear();
    window.location.reload();
  }
  return Promise.reject(error);
});