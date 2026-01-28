import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useAppointments } from '../hooks/useAppointments'
import LoadingSpinner from '../components/LoadingSpinner'
import { getSpecialityName, getAppointmentStatusColor, getAppointmentStatusText } from '../utils/helpers'

const MyAppointments = () => {
  const navigate = useNavigate()
  const { isAuthenticated, user } = useAuth()
  const { appointments, loading, cancelAppointment } = useAppointments()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    
    // إذا كان المستخدم طبيب، اذهب إلى dashboard الطبيب
    if (user?.role === 'doctor') {
      navigate('/doctor-dashboard')
      return
    }
  }, [isAuthenticated, navigate, user])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="min-h-screen py-10" style={{ direction: 'rtl' }}>
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-[#1D5E78] mb-8">مواعيدي</h1>

        {appointments.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <p className="text-xl text-gray-500 mb-4">لا توجد مواعيد محجوزة</p>
            <button
              onClick={() => navigate('/doctors')}
              className="bg-[#1D5E78] text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
            >
              احجز موعد الآن
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div
                key={appointment._id}
                className="bg-white rounded-xl shadow-lg p-6 flex flex-col md:flex-row items-center gap-6"
              >
                <img
                  src={appointment.doctor?.image || 'https://i.postimg.cc/MTzRJqFH/logoo.png'}
                  alt={appointment.doctor?.name}
                  className="w-24 h-24 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {appointment.doctor?.name || 'طبيب'}
                  </h3>
                  <p className="text-[#1D5E78] mb-2">
                    {getSpecialityName(appointment.doctor?.speciality)}
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <span>📅 {appointment.date}</span>
                    <span>🕐 {appointment.time}</span>
                    {appointment.reason && <span>📝 {appointment.reason}</span>}
                  </div>
                  <span
                    className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium ${getAppointmentStatusColor(
                      appointment.status
                    )}`}
                  >
                    {getAppointmentStatusText(appointment.status)}
                  </span>
                </div>
                {appointment.status !== 'cancelled' && (
                  <button
                    onClick={() => cancelAppointment(appointment._id)}
                    className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    إلغاء الموعد
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MyAppointments
