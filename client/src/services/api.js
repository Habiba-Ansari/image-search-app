import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance with credentials
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true
});

export const searchAPI = {
  search: (term) => api.post('/search', { term }),
  getTopSearches: () => api.get('/search/top-searches'),
  getHistory: () => api.get('/search/history')
};

export default api;