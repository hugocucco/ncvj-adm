import axios from 'axios';

const api = axios.create({
  baseURL: 'https://ncvj.tk',
});

export default api;
