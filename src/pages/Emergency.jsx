import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import API from '../api'
import { toast } from 'react-toastify'

const Emergency = () => {
  const { isAuthenticated, user } = useAuth()
  const [countdown, setCountdown] = useState(null)
  const [emergencyActive, setEmergencyActive] = useState(false)
  const [location, setLocation] = useState(null)

  useEffect(() => {
    // الحصول على الموقع
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        },
        (error) => {
          console.error('Error getting location:', error)
        }
      )
    }
  }, [])

  const triggerEmergency = async () => {
    if (!window.confirm('هل أنت متأكد من تفعيل حالة الطوارئ؟ سيتم إرسال إشعار للطبيب والطوارئ.')) {
      return
    }

    setEmergencyActive(true)
    setCountdown(20)

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          sendEmergencyAlert()
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const cancelEmergency = () => {
    setEmergencyActive(false)
    setCountdown(null)
    toast.info('تم إلغاء حالة الطوارئ')
  }

  const sendEmergencyAlert = async () => {
    try {
      const emergencyData = {
        userId: user?._id,
        location: location,
        timestamp: new Date().toISOString(),
        type: 'manual'
      }

      await API.post('/emergency/trigger', emergencyData)
      toast.success('تم إرسال حالة الطوارئ بنجاح!')
      
      // إرسال إشعار للطبيب
      await API.post('/emergency/notify-doctor', {
        patientId: user?._id,
        location: location
      })

      setEmergencyActive(false)
      setCountdown(null)
    } catch (error) {
      console.error('Error sending emergency alert:', error)
      toast.error('حدث خطأ أثناء إرسال حالة الطوارئ')
    }
  }

  const callAmbulance = () => {
    window.location.href = 'tel:123'
    toast.info('جاري الاتصال بالإسعاف...')
  }

  const callDoctor = async () => {
    try {
      const response = await API.get('/user/my-doctor')
      const doctor = response.data
      if (doctor?.phone) {
        window.location.href = `tel:${doctor.phone}`
      } else {
        toast.error('لا يوجد رقم هاتف للطبيب')
      }
    } catch (error) {
      console.error('Error getting doctor:', error)
      toast.error('حدث خطأ أثناء جلب بيانات الطبيب')
    }
  }

  return (
    <div className="min-h-screen py-10" style={{ direction: 'rtl' }}>
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-[#1D5E78] mb-8">
          🚨 حالة الطوارئ
        </h1>

        {/* Emergency Button */}
        {!emergencyActive ? (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="mb-8">
              <div className="text-6xl mb-4">🚨</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                هل تحتاج إلى مساعدة طارئة؟
              </h2>
              <p className="text-gray-600 mb-8">
                اضغط على الزر أدناه لإرسال إشعار للطبيب والطوارئ
              </p>
            </div>

            <button
              onClick={triggerEmergency}
              className="bg-red-600 text-white text-2xl font-bold px-12 py-6 rounded-full hover:bg-red-700 transition-all transform hover:scale-105 shadow-2xl"
            >
              تفعيل حالة الطوارئ
            </button>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
              <button
                onClick={callAmbulance}
                className="bg-red-500 text-white px-8 py-4 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-3"
              >
                <span className="text-2xl">🚑</span>
                <span className="text-lg font-semibold">اتصل بالإسعاف</span>
              </button>

              <button
                onClick={callDoctor}
                className="bg-[#1D5E78] text-white px-8 py-4 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-3"
              >
                <span className="text-2xl">👨‍⚕️</span>
                <span className="text-lg font-semibold">اتصل بالطبيب</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-red-50 border-4 border-red-500 rounded-2xl shadow-xl p-12 text-center animate-pulse">
            <div className="text-6xl mb-6">⚠️</div>
            <h2 className="text-3xl font-bold text-red-800 mb-4">
              حالة الطوارئ نشطة!
            </h2>
            <p className="text-xl text-red-700 mb-8">
              سيتم إرسال الإشعار خلال:
            </p>
            <div className="text-6xl font-bold text-red-600 mb-8">
              {countdown} ثانية
            </div>
            <button
              onClick={cancelEmergency}
              className="bg-green-500 text-white px-8 py-4 rounded-lg hover:bg-green-600 transition-colors text-lg font-semibold"
            >
              إلغاء - أنا بخير
            </button>
          </div>
        )}

        {/* Emergency Instructions */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">تعليمات الطوارئ</h3>
          <ul className="space-y-3 text-gray-700" style={{ direction: 'rtl' }}>
            <li className="flex items-start gap-3">
              <span className="text-red-500 font-bold">•</span>
              <span>في حالة الطوارئ الحقيقية، اضغط على زر "تفعيل حالة الطوارئ"</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-500 font-bold">•</span>
              <span>سيتم إرسال موقعك الحالي للطبيب والطوارئ تلقائياً</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-500 font-bold">•</span>
              <span>يمكنك إلغاء حالة الطوارئ خلال 20 ثانية إذا كنت بخير</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-500 font-bold">•</span>
              <span>في حالة الخطر الفوري، اتصل بالإسعاف مباشرة على 123</span>
            </li>
          </ul>
        </div>

        {/* Auto-detected Emergencies */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <h3 className="text-xl font-bold text-yellow-800 mb-4">
            ⚠️ تنبيهات تلقائية من الساعة
          </h3>
          <p className="text-yellow-700">
            إذا اكتشفت الساعة الذكية حالة طارئة (مثل: سقوط، نبض غير طبيعي، 
            انخفاض الأكسجين)، سيتم إرسال تنبيه تلقائياً للطبيب.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Emergency
