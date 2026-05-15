import axios from 'axios';

const API_BASE_URL = 'https://6a01817236fb6ad04de10c7b.mockapi.io/api/app';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' }
});

export const getItems = () => api.get('/items');
export const getItemById = (id) => api.get(`/items/${id}`);
export const addItem = (item) => api.post('/items', item);
export const updateItem = (id, item) => api.put(`/items/${id}`, item);
export const deleteItem = (id) => api.delete(`/items/${id}`);