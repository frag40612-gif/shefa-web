import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { doctors } from '../assets/assets'
import { useAuth } from '../context/AuthContext'
import API from '../api'
import { toast } from 'react-toastify'

const Appointment = () => {
  const { docId } = useParams()
  const navigate = useNavigate()
  const { isAuthenticated, user } = useAuth()
  const [doctor, setDoctor] = useState(null)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    reason: '',
    notes: ''
  })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchDoctor()
  }, [docId])

  const fetchDoctor = async () => {
    try {
      setLoading(true)
      try {
        const response = await API.get(`/doctor/${docId}`)
        setDoctor(response.data)
      } catch (error) {
        // استخدام البيانات المحلية
        const foundDoctor = doctors.find(d => d._id === docId)
        setDoctor(foundDoctor)
      }
      setLoading(false)
    } catch (error) {
      console.error('Error fetching doctor:', error)
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!isAuthenticated) {
      toast.error('يجب تسجيل الدخول أولاً')
      navigate('/login')
      return
    }

    if (!formData.date || !formData.time) {
      toast.error('يرجى اختيار التاريخ والوقت')
      return
    }

    setSubmitting(true)
    try {
      const appointmentData = {
        doctorId: docId,
        patientId: user._id,
        date: formData.date,
        time: formData.time,
        reason: formData.reason,
        notes: formData.notes
      }

      await API.post('/appointment/create', appointmentData)
      toast.success('تم حجز الموعد بنجاح!')
      navigate('/my-appointments')
    } catch (error) {
      console.error('Error booking appointment:', error)
      toast.error(error.response?.data?.message || 'حدث خطأ أثناء حجز الموعد')
    } finally {
      setSubmitting(false)
    }
  }

  const getSpecialityName = (spec) => {
    const translations = {
      'General physician': 'طبيب عام',
      'Gynecologist': 'طبيب نساء وتوليد',
      'Dermatologist': 'طبيب جلدية',
      'Pediatricians': 'طبيب أطفال',
      'Neurologist': 'طبيب أعصاب',
      'Gastroenterologist': 'طبيب جهاز هضمي'
    }
    return translations[spec] || spec
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-[#1D5E78]">جاري التحميل...</div>
      </div>
    )
  }

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-red-500">الطبيب غير موجود</div>
      </div>
    )
  }

  // توليد أوقات متاحة
  const availableTimes = []
  for (let hour = 9; hour <= 17; hour++) {
    availableTimes.push(`${hour.toString().padStart(2, '0')}:00`)
    if (hour < 17) {
      availableTimes.push(`${hour.toString().padStart(2, '0')}:30`)
    }
  }

  // الحصول على تاريخ اليوم
  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="min-h-screen py-10" style={{ direction: 'rtl' }}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="md:flex">
            {/* معلومات الطبيب */}
            <div className="md:w-1/3 bg-gradient-to-br from-[#1D5E78] to-[#0b304a] text-white p-8">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-white"
              />
              <h2 className="text-2xl font-bold text-center mb-2">{doctor.name}</h2>
              <p className="text-center text-blue-200 mb-4">
                {getSpecialityName(doctor.speciality)}
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-blue-200">الدرجة العلمية:</span>
                  <span>{doctor.degree}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-200">الخبرة:</span>
                  <span>{doctor.experience}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-200">رسوم الكشف:</span>
                  <span className="text-xl font-bold">${doctor.fees}</span>
                </div>
                {doctor.address && (
                  <div className="mt-4 pt-4 border-t border-blue-300">
                    <p className="text-blue-200 mb-2">العنوان:</p>
                    <p className="text-sm">{doctor.address.line1}</p>
                    <p className="text-sm">{doctor.address.line2}</p>
                  </div>
                )}
              </div>
            </div>

            {/* نموذج الحجز */}
            <div className="md:w-2/3 p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">حجز موعد</h3>
              
              {!isAuthenticated && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <p className="text-yellow-800">
                    يجب تسجيل الدخول لحجز موعد.{' '}
                    <button
                      onClick={() => navigate('/login')}
                      className="text-[#1D5E78] font-semibold hover:underline"
                    >
                      تسجيل الدخول
                    </button>
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    التاريخ
                  </label>
                  <input
                    type="date"
                    min={today}
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1D5E78]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    الوقت
                  </label>
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1D5E78]"
                    required
                  >
                    <option value="">اختر الوقت</option>
                    {availableTimes.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    سبب الزيارة
                  </label>
                  <input
                    type="text"
                    placeholder="مثال: فحص دوري، ألم في الصدر..."
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1D5E78]"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    ملاحظات إضافية (اختياري)
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1D5E78]"
                    rows={4}
                    placeholder="أي معلومات إضافية تريد إضافتها..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting || !isAuthenticated}
                  className={`w-full bg-[#1D5E78] text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity ${
                    submitting || !isAuthenticated ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {submitting ? 'جاري الحجز...' : 'احجز الموعد'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Appointment
