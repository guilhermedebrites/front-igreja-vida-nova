import axios from 'axios';

const api = axios.create({
  baseURL: 'https://igreja-vida-nova.duckdns.org',
});

export default api;
