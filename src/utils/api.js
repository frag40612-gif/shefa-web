import axios from 'axios'
import { toast } from 'react-toastify'
import { API_ENDPOINTS } from '../constants'

const API = axios.create({
  baseURL: 'https://shefa-app.vercel.app',
})

// Request interceptor - Add token to headers
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor - Handle errors globally
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Don't show toast for login errors - let the component handle it
    const isLoginPage = window.location.pathname === '/login'
    
    if (error.response) {
      // Handle specific error codes
      switch (error.response.status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          if (window.location.pathname !== '/login' && !isLoginPage) {
            window.location.href = '/login'
            toast.error('انتهت صلاحية الجلسة، يرجى تسجيل الدخول مرة أخرى')
          }
          // Don't show toast on login page for 401
          break
        case 403:
          if (!isLoginPage) {
            toast.error('ليس لديك صلاحية للوصول إلى هذا المورد')
          }
          break
        case 404:
          // Don't show toast for 404, let components handle it
          break
        case 500:
          if (!isLoginPage) {
            toast.error('حدث خطأ في الخادم، يرجى المحاولة لاحقاً')
          }
          break
        default:
          // Show error message from server if available
          const message = error.response?.data?.message || 'حدث خطأ غير متوقع'
          if (error.response.status >= 400 && error.response.status < 500 && !isLoginPage) {
            // Only show toast for client errors, but not on login page
            toast.error(message)
          }
      }
    } else if (error.request) {
      // Network error - only show if not on login page
      if (!isLoginPage) {
        toast.error('خطأ في الاتصال بالخادم، يرجى التحقق من اتصالك بالإنترنت')
      }
    } else {
      // Something else happened
      if (!isLoginPage) {
        toast.error('حدث خطأ غير متوقع')
      }
    }
    return Promise.reject(error)
  }
)

// API service functions
export const apiService = {
  // Auth
  login: (email, password) => API.post(API_ENDPOINTS.LOGIN, { email, password }),
  
  signupDoctor: (data) => API.post(API_ENDPOINTS.SIGNUP_DOCTOR, data),
  signupPatient: (data) => API.post(API_ENDPOINTS.SIGNUP_PATIENT, data),
  signupCompanion: (data) => API.post(API_ENDPOINTS.SIGNUP_COMPANION, data),
  
  // User
  getUserProfile: () => API.get(API_ENDPOINTS.USER_PROFILE),
  updateUserProfile: (data) => API.put(API_ENDPOINTS.USER_PROFILE, data),
  getMyDoctor: () => API.get(API_ENDPOINTS.MY_DOCTOR),
  
  // Doctors
  getAllDoctors: () => API.get(API_ENDPOINTS.DOCTORS_ALL),
  getDoctorById: (id) => API.get(API_ENDPOINTS.DOCTOR_BY_ID(id)),
  getDoctorPatients: () => API.get(API_ENDPOINTS.DOCTOR_PATIENTS),
  getDoctorAlerts: () => API.get(API_ENDPOINTS.DOCTOR_ALERTS),
  
  // Appointments
  createAppointment: (data) => API.post(API_ENDPOINTS.APPOINTMENT_CREATE, data),
  getMyAppointments: () => API.get(API_ENDPOINTS.APPOINTMENT_MY),
  cancelAppointment: (id) => API.delete(API_ENDPOINTS.APPOINTMENT_DELETE(id)),
  
  // Health
  getHealthData: () => API.get(API_ENDPOINTS.HEALTH_DATA),
  syncHealthData: () => API.post(API_ENDPOINTS.HEALTH_SYNC),
  getHealthAnalytics: (range) => API.get(`${API_ENDPOINTS.HEALTH_ANALYTICS}?range=${range}`),
  
  // Emergency
  triggerEmergency: (data) => API.post(API_ENDPOINTS.EMERGENCY_TRIGGER, data),
  notifyDoctor: (data) => API.post(API_ENDPOINTS.EMERGENCY_NOTIFY_DOCTOR, data),
  
  // Contact
  sendContactMessage: (data) => API.post(API_ENDPOINTS.CONTACT, data)
}

export default API
