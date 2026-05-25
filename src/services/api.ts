import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://api.1mpixels.com';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle responses
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized
      localStorage.removeItem('authToken');
    }
    return Promise.reject(error);
  }
);

export const API = {
  // Pixel endpoints
  getPixels: () => apiClient.get('/pixels'),
  purchasePixels: (pixelIds: string[], paymentMethodId: string) =>
    apiClient.post('/pixels/purchase', { pixelIds, paymentMethodId }),
  getPixelsByUser: (userId: string) => apiClient.get(`/pixels/user/${userId}`),
  
  // User endpoints
  loginUser: (email: string, password: string) =>
    apiClient.post('/auth/login', { email, password }),
  registerUser: (data: any) => apiClient.post('/auth/register', data),
  getUserProfile: () => apiClient.get('/users/profile'),
  updateUserProfile: (data: any) => apiClient.put('/users/profile', data),
  
  // Payment endpoints
  createPaymentIntent: (amount: number, pixelCount: number) =>
    apiClient.post('/payments/create-intent', { amount, pixelCount }),
  confirmPayment: (paymentIntentId: string) =>
    apiClient.post('/payments/confirm', { paymentIntentId }),
  
  // Admin endpoints
  getAnalytics: () => apiClient.get('/admin/analytics'),
  getRevenue: () => apiClient.get('/admin/revenue'),
};
