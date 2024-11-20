import axios from 'axios';

const api = axios.create({
  baseURL: 'https://telegram-app-backend-theta.vercel.app/api'
});

export default api;