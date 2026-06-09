import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5001/api',
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const register = (userData) => API.post('/auth/register', userData);
export const login = (userData) => API.post('/auth/login', userData);
export const forgotPassword = (email) => API.post('/auth/forgot-password', { email });
export const resetPassword = (token, password) => API.post(`/auth/reset-password/${token}`, { password });

export const getInventory = () => API.get('/inventory');
export const updateInventory = (id, data) => API.put(`/inventory/${id}`, data);

export const createOrder = (orderData) => API.post('/orders', orderData);
export const getMyOrders = () => API.get('/orders/my-orders');

export const getAllOrders = () => API.get('/orders/all');
export const updateOrderStatus = (id, status) => API.put(`/orders/${id}/status`, { status });
export const getLowStock = () => API.get('/admin/low-stock');

export const getPizzas = () => API.get('/pizzas');
export const getPizzasByCategory = (category) => API.get(`/pizzas/category/${category}`);

export const createPaymentOrder = (amount) => API.post('/payment/create-order', { amount });
export const verifyPayment = (paymentData) => API.post('/payment/verify', paymentData);

export const testBackend = () => API.get('/');