import { SPECIALITY_TRANSLATIONS, RISK_COLORS, RISK_TEXT, APPOINTMENT_STATUS_COLORS, APPOINTMENT_STATUS_TEXT, HEALTH_THRESHOLDS } from '../constants'

/**
 * Translate speciality name to Arabic
 */
export const getSpecialityName = (speciality) => {
  return SPECIALITY_TRANSLATIONS[speciality] || speciality
}

/**
 * Get risk level color class
 */
export const getRiskColor = (risk) => {
  return RISK_COLORS[risk] || 'bg-gray-500'
}

/**
 * Get risk level text
 */
export const getRiskText = (risk) => {
  return RISK_TEXT[risk] || 'غير محدد'
}

/**
 * Get appointment status color class
 */
export const getAppointmentStatusColor = (status) => {
  return APPOINTMENT_STATUS_COLORS[status] || 'bg-gray-100 text-gray-800'
}

/**
 * Get appointment status text
 */
export const getAppointmentStatusText = (status) => {
  return APPOINTMENT_STATUS_TEXT[status] || status
}

/**
 * Check heart rate status
 */
export const getHeartRateStatus = (heartRate) => {
  if (!heartRate) return { status: 'normal', color: 'text-green-600', message: 'لا توجد بيانات' }
  
  if (heartRate > HEALTH_THRESHOLDS.HEART_RATE.HIGH) {
    return { status: 'high', color: 'text-red-600', message: '⚠️ مرتفع' }
  }
  if (heartRate < HEALTH_THRESHOLDS.HEART_RATE.LOW) {
    return { status: 'low', color: 'text-yellow-600', message: '⚠️ منخفض' }
  }
  return { status: 'normal', color: 'text-green-600', message: '✓ طبيعي' }
}

/**
 * Check blood oxygen status
 */
export const getOxygenStatus = (spo2) => {
  if (!spo2) return { status: 'normal', color: 'text-green-600', message: 'لا توجد بيانات' }
  
  if (spo2 < HEALTH_THRESHOLDS.BLOOD_OXYGEN.CRITICAL) {
    return { status: 'critical', color: 'text-red-600', message: '🚨 حرج - اتصل بالطبيب' }
  }
  if (spo2 < HEALTH_THRESHOLDS.BLOOD_OXYGEN.LOW) {
    return { status: 'low', color: 'text-yellow-600', message: '⚠️ منخفض' }
  }
  return { status: 'normal', color: 'text-green-600', message: '✓ طبيعي' }
}

/**
 * Check sleep quality
 */
export const getSleepStatus = (sleepHours) => {
  if (!sleepHours) return { status: 'unknown', message: 'لا توجد بيانات' }
  
  if (sleepHours < HEALTH_THRESHOLDS.SLEEP.MIN_HOURS) {
    return { status: 'low', message: '⚠️ قلة نوم' }
  }
  if (sleepHours > HEALTH_THRESHOLDS.SLEEP.MAX_HOURS) {
    return { status: 'high', message: '⚠️ نوم زائد' }
  }
  return { status: 'normal', message: '✓ جيد' }
}

/**
 * Check stress level
 */
export const getStressStatus = (stressLevel) => {
  if (!stressLevel) return { status: 'unknown', message: 'لا توجد بيانات' }
  
  if (stressLevel > HEALTH_THRESHOLDS.STRESS.HIGH) {
    return { status: 'high', message: '⚠️ مرتفع - خذ قسطاً من الراحة' }
  }
  if (stressLevel > HEALTH_THRESHOLDS.STRESS.MEDIUM) {
    return { status: 'medium', message: '⚠️ متوسط' }
  }
  return { status: 'low', message: '✓ منخفض' }
}

/**
 * Format date to Arabic locale
 */
export const formatDate = (dateString) => {
  if (!dateString) return 'لا توجد بيانات'
  return new Date(dateString).toLocaleString('ar-EG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

/**
 * Format date short
 */
export const formatDateShort = (dateString) => {
  if (!dateString) return 'لا توجد بيانات'
  return new Date(dateString).toLocaleDateString('ar-EG', {
    day: 'numeric',
    month: 'short'
  })
}

/**
 * Get today's date in YYYY-MM-DD format
 */
export const getTodayDate = () => {
  return new Date().toISOString().split('T')[0]
}

/**
 * Validate email
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate phone number (Egyptian format)
 */
export const isValidPhone = (phone) => {
  const phoneRegex = /^(\+20|0)?1[0-9]{9}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

/**
 * Calculate percentage
 */
export const calculatePercentage = (value, max) => {
  return Math.min((value / max) * 100, 100)
}

/**
 * Debounce function
 */
export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * Get severity color class
 */
export const getSeverityColor = (severity) => {
  switch (severity) {
    case 'high':
      return 'text-red-600 bg-red-50 border-red-200'
    case 'medium':
      return 'text-yellow-600 bg-yellow-50 border-yellow-200'
    case 'low':
      return 'text-blue-600 bg-blue-50 border-blue-200'
    default:
      return 'text-gray-600 bg-gray-50 border-gray-200'
  }
}
