import axios from 'axios';

// Use the live backend URL
const API = axios.create({
  baseURL: 'https://pizza-frontend-3ij6.onrender.com/api',
});

// Add token to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// ========== AUTH APIs ==========
export const register = (userData) => API.post('/auth/register', userData);
export const login = (userData) => API.post('/auth/login', userData);
export const forgotPassword = (email) => API.post('/auth/forgot-password', { email });
export const resetPassword = (token, password) => API.post(`/auth/reset-password/${token}`, { password });

// ========== INVENTORY APIs ==========
export const getInventory = () => API.get('/inventory');
export const updateInventory = (id, data) => API.put(`/inventory/${id}`, data);

// ========== ORDER APIs ==========
export const createOrder = (orderData) => API.post('/orders', orderData);
export const getMyOrders = () => API.get('/orders/my-orders');

// ========== ADMIN APIs ==========
export const getAllOrders = () => API.get('/orders/all');
export const updateOrderStatus = (id, status) => API.put(`/orders/${id}/status`, { status });
export const getLowStock = () => API.get('/admin/low-stock');

// ========== PIZZA APIs ==========
export const getPizzas = () => API.get('/pizzas');
export const getPizzasByCategory = (category) => API.get(`/pizzas/category/${category}`);

// ========== PAYMENT APIs ==========
export const createPaymentOrder = (amount) => API.post('/payment/create-order', { amount });
export const verifyPayment = (paymentData) => API.post('/payment/verify', paymentData);

// ========== TEST API ==========
export const testBackend = () => API.get('/');