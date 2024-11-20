import axios from 'axios';

const api = axios.create({
  baseURL: 'https://telegram-app-backend-eosin.vercel.app/api/'
});

export default api;