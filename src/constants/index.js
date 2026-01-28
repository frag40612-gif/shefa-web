// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/user/login',
  SIGNUP_DOCTOR: '/doctor/signup',
  SIGNUP_PATIENT: '/patient/signup',
  SIGNUP_COMPANION: '/companion/signup',
  
  // User
  USER_PROFILE: '/user/profile',
  MY_DOCTOR: '/user/my-doctor',
  
  // Doctors
  DOCTORS_ALL: '/doctor/all',
  DOCTOR_BY_ID: (id) => `/doctor/${id}`,
  DOCTOR_PATIENTS: '/doctor/patients',
  DOCTOR_ALERTS: '/doctor/alerts',
  
  // Appointments
  APPOINTMENT_CREATE: '/appointment/create',
  APPOINTMENT_MY: '/appointment/my-appointments',
  APPOINTMENT_DELETE: (id) => `/appointment/${id}`,
  
  // Health
  HEALTH_DATA: '/health/data',
  HEALTH_SYNC: '/health/sync',
  HEALTH_ANALYTICS: '/health/analytics',
  
  // Emergency
  EMERGENCY_TRIGGER: '/emergency/trigger',
  EMERGENCY_NOTIFY_DOCTOR: '/emergency/notify-doctor',
  
  // Contact
  CONTACT: '/contact'
}

// Risk Levels
export const RISK_LEVELS = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low'
}

// Risk Colors
export const RISK_COLORS = {
  [RISK_LEVELS.HIGH]: 'bg-red-500',
  [RISK_LEVELS.MEDIUM]: 'bg-yellow-500',
  [RISK_LEVELS.LOW]: 'bg-green-500'
}

// Risk Text
export const RISK_TEXT = {
  [RISK_LEVELS.HIGH]: 'عالي',
  [RISK_LEVELS.MEDIUM]: 'متوسط',
  [RISK_LEVELS.LOW]: 'منخفض'
}

// Speciality Translations
export const SPECIALITY_TRANSLATIONS = {
  'General physician': 'طبيب عام',
  'Gynecologist': 'طبيب نساء وتوليد',
  'Dermatologist': 'طبيب جلدية',
  'Pediatricians': 'طبيب أطفال',
  'Neurologist': 'طبيب أعصاب',
  'Gastroenterologist': 'طبيب جهاز هضمي',
  'General Surgery': 'الجراحة العامة',
  'Chest Diseases': 'الأمراض الصدرية',
  'Kidney Diseases': 'أمراض الكلى',
  'Blood Diseases': 'أمراض الدم'
}

// Appointment Status
export const APPOINTMENT_STATUS = {
  CONFIRMED: 'confirmed',
  PENDING: 'pending',
  CANCELLED: 'cancelled'
}

export const APPOINTMENT_STATUS_COLORS = {
  [APPOINTMENT_STATUS.CONFIRMED]: 'bg-green-100 text-green-800',
  [APPOINTMENT_STATUS.PENDING]: 'bg-yellow-100 text-yellow-800',
  [APPOINTMENT_STATUS.CANCELLED]: 'bg-red-100 text-red-800'
}

export const APPOINTMENT_STATUS_TEXT = {
  [APPOINTMENT_STATUS.CONFIRMED]: 'مؤكد',
  [APPOINTMENT_STATUS.PENDING]: 'قيد الانتظار',
  [APPOINTMENT_STATUS.CANCELLED]: 'ملغي'
}

// Health Thresholds
export const HEALTH_THRESHOLDS = {
  HEART_RATE: {
    NORMAL_MIN: 60,
    NORMAL_MAX: 100,
    HIGH: 100,
    LOW: 60
  },
  BLOOD_OXYGEN: {
    NORMAL_MIN: 95,
    CRITICAL: 90,
    LOW: 95
  },
  SLEEP: {
    MIN_HOURS: 7,
    MAX_HOURS: 9
  },
  STEPS: {
    DAILY_GOAL: 10000
  },
  STRESS: {
    HIGH: 7,
    MEDIUM: 4
  }
}

// Time Ranges
export const TIME_RANGES = {
  WEEK: 'week',
  MONTH: 'month',
  YEAR: 'year'
}

export const TIME_RANGE_LABELS = {
  [TIME_RANGES.WEEK]: 'أسبوع',
  [TIME_RANGES.MONTH]: 'شهر',
  [TIME_RANGES.YEAR]: 'سنة'
}

// Available Times for Appointments
export const AVAILABLE_TIMES = []
for (let hour = 9; hour <= 17; hour++) {
  AVAILABLE_TIMES.push(`${hour.toString().padStart(2, '0')}:00`)
  if (hour < 17) {
    AVAILABLE_TIMES.push(`${hour.toString().padStart(2, '0')}:30`)
  }
}

// Blood Types
export const BLOOD_TYPES = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']

// Roles
export const USER_ROLES = {
  DOCTOR: 'doctor',
  PATIENT: 'patient',
  COMPANION: 'companion'
}
