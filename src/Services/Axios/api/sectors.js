import axios from 'axios';
import { BaseUrlSectors } from '../../../Constants/baseUrl';

export const APISectors = axios.create({
  baseURL: BaseUrlSectors,
});

APISectors.interceptors.response.use(async (response) => {
  try {
    const authToken = await response.status;
    if (authToken === 500 || authToken === 401) {
      localStorage.clear();
      window.location.reload();
    }
    return response;
  } catch (err) {
    return response;
  }
}, (error) => {
  if (error.response.status === 500) {
    localStorage.clear();
    window.location.reload();
  }
  return Promise.reject(error);
});