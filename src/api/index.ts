import axios, { AxiosInstance } from 'axios';

const API: AxiosInstance = axios.create({
  baseURL: 'http://localhost:4000',
  withCredentials: true,
});

export default API;
