// src/utils/api.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Type definitions
export interface User {
  id: string;
  fullName: string;
  email: string;
  role: 'customer' | 'admin';
  loyaltyPoints: number;
  loyaltyCard: {
    stamps: number;
    totalFreeDrinks: number;
  };
}

export interface Order {
  _id: string;
  orderId: string;
  customerCode: string;
  cupSize: 'S' | 'M' | 'L';
  shavedIce: {
    flavor: string;
    points: number;
  };
  toppings: Array<{
    name: string;
    points: number;
  }>;
  pricing: {
    basePrice: number;
    total: number;
  };
  status: string;
  createdAt: string;
}

export interface Review {
  _id: string;
  customerName: string;
  rating: number;
  comment: string;
  createdAt: string;
  helpfulVotes: number;
}

// Helper function to get auth headers
const getAuthHeaders = () => {
  if (typeof window === 'undefined') return {};
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const handleApiError = async (response: Response) => {
  if (!response.ok) {
    try {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
    } catch (e) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
  }
  return response;
};

// API class for all backend calls
class BingsuAPI {
  // Auth endpoints
  async register(data: { fullName: string; email: string; password: string; confirmPassword: string }) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      await handleApiError(response);
      const result = await response.json();
      
      // Store token
      if (result.token) {
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));
      }
      
      return result;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  async login(email: string, password: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      await handleApiError(response);
      const result = await response.json();
      
      // Store token and user
      if (result.token) {
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));
      }
      
      return result;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async logout() {
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: getAuthHeaders()
      });
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      // Always clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }

  async getProfile() {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      headers: getAuthHeaders()
    });
    
    if (!response.ok) throw new Error('Failed to fetch profile');
    return response.json();
  }

  // Menu code endpoints
  async generateMenuCode(cupSize: string) {
    const response = await fetch(`${API_BASE_URL}/menu-codes/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      },
      body: JSON.stringify({ cupSize })
    });
    
    const result = await response.json();
    if (!response.ok) throw new Error(result.message);
    return result;
  }

  async validateMenuCode(code: string) {
    const response = await fetch(`${API_BASE_URL}/menu-codes/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code })
    });
    
    const result = await response.json();
    if (!response.ok) throw new Error(result.message);
    return result;
  }

  // Order endpoints
  async createOrder(orderData: {
    menuCode: string;
    shavedIce: { flavor: string; points: number };
    toppings: Array<{ name: string; points: number }>;
    specialInstructions?: string;
  }) {
    const response = await fetch(`${API_BASE_URL}/orders/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      },
      body: JSON.stringify(orderData)
    });
    
    const result = await response.json();
    if (!response.ok) throw new Error(result.message);
    return result;
  }

  async trackOrder(customerCode: string) {
    const response = await fetch(`${API_BASE_URL}/orders/track/${customerCode}`);
    
    const result = await response.json();
    if (!response.ok) throw new Error(result.message);
    return result;
  }

  async getMyOrders() {
    const response = await fetch(`${API_BASE_URL}/orders/my-orders`, {
      headers: getAuthHeaders()
    });
    
    if (!response.ok) throw new Error('Failed to fetch orders');
    return response.json();
  }

  // Admin order endpoints
  async getAllOrders(filters?: { status?: string; date?: string }) {
    const params = new URLSearchParams(filters as any);
    const response = await fetch(`${API_BASE_URL}/orders/admin/all?${params}`, {
      headers: getAuthHeaders()
    });
    
    if (!response.ok) throw new Error('Failed to fetch orders');
    return response.json();
  }

  async updateOrderStatus(orderId: string, status: string) {
    const response = await fetch(`${API_BASE_URL}/orders/admin/${orderId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      },
      body: JSON.stringify({ status })
    });
    
    const result = await response.json();
    if (!response.ok) throw new Error(result.message);
    return result;
  }

  async getOrderStats() {
    const response = await fetch(`${API_BASE_URL}/orders/admin/stats`, {
      headers: getAuthHeaders()
    });
    
    if (!response.ok) throw new Error('Failed to fetch stats');
    return response.json();
  }

  // Review endpoints
  async createReview(reviewData: {
    rating: number;
    comment: string;
    orderId?: string;
    shavedIceFlavor?: string;
    toppings?: string[];
  }) {
    const response = await fetch(`${API_BASE_URL}/reviews/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      },
      body: JSON.stringify(reviewData)
    });
    
    const result = await response.json();
    if (!response.ok) throw new Error(result.message);
    return result;
  }

  async getReviews(page = 1, limit = 10) {
    const response = await fetch(`${API_BASE_URL}/reviews?page=${page}&limit=${limit}`);
    
    if (!response.ok) throw new Error('Failed to fetch reviews');
    return response.json();
  }

  async voteHelpful(reviewId: string) {
    const response = await fetch(`${API_BASE_URL}/reviews/${reviewId}/helpful`, {
      method: 'POST',
      headers: getAuthHeaders()
    });
    
    const result = await response.json();
    if (!response.ok) throw new Error(result.message);
    return result;
  }
}

export const api = new BingsuAPI();

// Utility functions for auth state
export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

export const isAdmin = () => {
  const user = getCurrentUser();
  return user?.role === 'admin';
};