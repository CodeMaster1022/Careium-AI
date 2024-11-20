import axios from 'axios';

const api = axios.create({
  baseURL: 'telegram-app-backend-theta.vercel.app/api'
});

export default api;