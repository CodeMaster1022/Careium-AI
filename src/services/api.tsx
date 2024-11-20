import axios from 'axios';

const api = axios.create({
  baseURL: 'https://telegram-app-backend-eosin.vercel.app'
});

export default api;