import axios from 'axios';

const api = axios.create({
  baseURL: process.env.WALLET_SERVICE_API
});

export default api;
