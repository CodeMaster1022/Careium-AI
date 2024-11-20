import axios from 'axios';

const api = axios.create({
  baseURL: 'https://telegram-app-backend-phi.vercel.app/api/'
});

export default api;