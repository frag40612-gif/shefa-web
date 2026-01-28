import React, { createContext, useState, useContext, useEffect } from 'react';
import { apiService } from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // تحقق من وجود token في localStorage
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Try to login via API first
      try {
        const response = await apiService.login(email, password);
        
        // Check if response has data
        if (!response || !response.data) {
          throw new Error('استجابة غير صحيحة من الخادم');
        }
        
        const { token: newToken, user: userData } = response.data;
        
        if (!newToken) {
          throw new Error('لم يتم استلام رمز الدخول من الخادم');
        }
        
        localStorage.setItem('token', newToken);
        localStorage.setItem('user', JSON.stringify(userData || {}));
        setToken(newToken);
        setUser(userData || {});
        
        return { success: true };
      } catch (apiError) {
        // If API fails, use mock login for testing
        console.log('API login failed, using mock login:', apiError);
        return mockLogin(email, password);
      }
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        message: error.message || 'حدث خطأ أثناء تسجيل الدخول. يرجى التحقق من بياناتك والمحاولة مرة أخرى.'
      };
    }
  };

  // Mock login for testing when backend is not available
  const mockLogin = (email, password) => {
    // Mock users for testing
    const mockUsers = {
      'doctor@shefa.com': {
        token: 'mock-token-doctor-' + Date.now(),
        user: {
          _id: 'doc1',
          fullName: 'د. أحمد محمد',
          email: 'doctor@shefa.com',
          role: 'doctor',
          phone: '01234567890',
          gender: 'male',
          specialization: 'General physician'
        }
      },
      'patient@shefa.com': {
        token: 'mock-token-patient-' + Date.now(),
        user: {
          _id: 'patient1',
          fullName: 'محمد علي',
          email: 'patient@shefa.com',
          role: 'patient',
          phone: '01234567891',
          gender: 'male',
          age: 35,
          bloodType: 'O+',
          disease: 'سكري'
        }
      },
      'companion@shefa.com': {
        token: 'mock-token-companion-' + Date.now(),
        user: {
          _id: 'companion1',
          fullName: 'فاطمة حسن',
          email: 'companion@shefa.com',
          role: 'companion',
          phone: '01234567892',
          gender: 'female',
          relation: 'زوجة'
        }
      }
    };

    // Check if user exists and password is correct (mock passwords)
    const validPasswords = {
      'doctor@shefa.com': 'doctor123',
      'patient@shefa.com': 'patient123',
      'companion@shefa.com': 'companion123'
    };

    if (mockUsers[email] && validPasswords[email] === password) {
      const { token, user } = mockUsers[email];
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setToken(token);
      setUser(user);
      
      return { 
        success: true,
        message: 'تم تسجيل الدخول بنجاح (وضع تجريبي - Backend غير متاح)'
      };
    } else {
      return {
        success: false,
        message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة'
      };
    }
  };

  const signup = async (userData, role) => {
    try {
      let response;
      if (role === 'doctor') {
        response = await apiService.signupDoctor(userData);
      } else if (role === 'patient') {
        response = await apiService.signupPatient(userData);
      } else {
        response = await apiService.signupCompanion(userData);
      }
      
      const { token: newToken, user: newUser } = response.data;
      
      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(newUser));
      setToken(newToken);
      setUser(newUser);
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'حدث خطأ أثناء التسجيل' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const value = {
    user,
    token,
    loading,
    login,
    signup,
    logout,
    updateUser,
    isAuthenticated: !!token
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

