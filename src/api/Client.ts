import axios from 'axios';
import { API_BASE_URL } from '@env';

console.log('🚀 API_BASE_URL:', API_BASE_URL); // 👈 LOG 4

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});
api.interceptors.request.use(
  config => {
    console.log('🔄 Request Config:', config); // 👈 LOG 5
    return config;
  },
  error => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);