import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import API from '../api'

const DoctorDashboard = () => {
  const { isAuthenticated, user } = useAuth()
  const navigate = useNavigate()
  const [patients, setPatients] = useState([])
  const [alerts, setAlerts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [filter, setFilter] = useState('all') // all, high-risk, alerts

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    // التحقق من أن المستخدم طبيب
    if (user?.role !== 'doctor') {
      navigate('/')
      return
    }
    fetchData()
  }, [isAuthenticated, navigate, user])

  const fetchData = async () => {
    try {
      setLoading(true)
      try {
        const [patientsRes, alertsRes] = await Promise.all([
          API.get('/doctor/patients'),
          API.get('/doctor/alerts')
        ])
        setPatients(patientsRes.data)
        setAlerts(alertsRes.data)
      } catch (error) {
        // بيانات تجريبية
        setPatients([
          {
            _id: '1',
            name: 'أحمد محمد',
            age: 45,
            condition: 'أمراض القلب',
            riskScore: 'high',
            lastUpdate: '2024-12-25 10:30',
            healthData: {
              heartRate: 95,
              bloodOxygen: 96,
              steps: 3200,
              sleepHours: 5.5
            },
            alerts: 2
          },
          {
            _id: '2',
            name: 'فاطمة علي',
            age: 32,
            condition: 'سكري',
            riskScore: 'medium',
            lastUpdate: '2024-12-25 09:15',
            healthData: {
              heartRate: 78,
              bloodOxygen: 98,
              steps: 8500,
              sleepHours: 7.0
            },
            alerts: 0
          },
          {
            _id: '3',
            name: 'محمد حسن',
            age: 28,
            condition: 'ربو',
            riskScore: 'low',
            lastUpdate: '2024-12-25 11:00',
            healthData: {
              heartRate: 72,
              bloodOxygen: 97,
              steps: 12000,
              sleepHours: 8.0
            },
            alerts: 0
          }
        ])
        setAlerts([
          {
            _id: '1',
            patientId: '1',
            patientName: 'أحمد محمد',
            type: 'heartRate',
            message: 'ارتفاع مفاجئ في معدل ضربات القلب',
            severity: 'high',
            timestamp: '2024-12-25 10:30'
          },
          {
            _id: '2',
            patientId: '1',
            patientName: 'أحمد محمد',
            type: 'oxygen',
            message: 'انخفاض في مستوى الأكسجين',
            severity: 'medium',
            timestamp: '2024-12-25 09:45'
          }
        ])
      }
      setLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error)
      setLoading(false)
    }
  }

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'high':
        return 'bg-red-500'
      case 'medium':
        return 'bg-yellow-500'
      case 'low':
        return 'bg-green-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getRiskText = (risk) => {
    switch (risk) {
      case 'high':
        return 'عالي'
      case 'medium':
        return 'متوسط'
      case 'low':
        return 'منخفض'
      default:
        return 'غير محدد'
    }
  }

  const getSeverityColor = (severity) => {
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

  const filteredPatients = patients.filter(patient => {
    if (filter === 'high-risk') return patient.riskScore === 'high'
    if (filter === 'alerts') return patient.alerts > 0
    return true
  })

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-[#1D5E78]">جاري التحميل...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-10" style={{ direction: 'rtl' }}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-[#1D5E78]">لوحة تحكم الطبيب</h1>
          <div className="flex gap-2">
            {['all', 'high-risk', 'alerts'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg ${
                  filter === f
                    ? 'bg-[#1D5E78] text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {f === 'all' ? 'الكل' : f === 'high-risk' ? 'خطر عالي' : 'تنبيهات'}
              </button>
            ))}
          </div>
        </div>

        {/* Alerts Section */}
        {alerts.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
            <h2 className="text-2xl font-bold text-red-800 mb-4">⚠️ تنبيهات عاجلة</h2>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div
                  key={alert._id}
                  className={`p-4 rounded-lg border ${getSeverityColor(alert.severity)}`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{alert.patientName}</p>
                      <p className="text-sm mt-1">{alert.message}</p>
                      <p className="text-xs mt-1 opacity-75">{alert.timestamp}</p>
                    </div>
                    <button
                      onClick={() => setSelectedPatient(patients.find(p => p._id === alert.patientId))}
                      className="bg-[#1D5E78] text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                    >
                      عرض التفاصيل
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Patients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPatients.map((patient) => (
            <div
              key={patient._id}
              className="bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow"
              onClick={() => setSelectedPatient(patient)}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">{patient.name}</h3>
                {patient.alerts > 0 && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {patient.alerts} تنبيه
                  </span>
                )}
              </div>

              <div className="space-y-2 mb-4">
                <p className="text-gray-600">العمر: {patient.age} سنة</p>
                <p className="text-gray-600">الحالة: {patient.condition}</p>
                <p className="text-sm text-gray-500">
                  آخر تحديث: {new Date(patient.lastUpdate).toLocaleString('ar-EG')}
                </p>
              </div>

              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-600">مستوى الخطر:</span>
                <span
                  className={`${getRiskColor(patient.riskScore)} text-white px-3 py-1 rounded-full text-sm font-semibold`}
                >
                  {getRiskText(patient.riskScore)}
                </span>
              </div>

              {patient.healthData && (
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="bg-gray-50 p-2 rounded">
                    <p className="text-gray-600">نبض</p>
                    <p className="font-semibold">{patient.healthData.heartRate} bpm</p>
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <p className="text-gray-600">أكسجين</p>
                    <p className="font-semibold">{patient.healthData.bloodOxygen}%</p>
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <p className="text-gray-600">خطوات</p>
                    <p className="font-semibold">{patient.healthData.steps?.toLocaleString()}</p>
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <p className="text-gray-600">نوم</p>
                    <p className="font-semibold">{patient.healthData.sleepHours} س</p>
                  </div>
                </div>
              )}

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedPatient(patient)
                }}
                className="w-full mt-4 bg-[#1D5E78] text-white py-2 rounded-lg hover:opacity-90 transition-opacity"
              >
                عرض التفاصيل الكاملة
              </button>
            </div>
          ))}
        </div>

        {/* Patient Details Modal */}
        {selectedPatient && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">تفاصيل المريض: {selectedPatient.name}</h2>
                <button
                  onClick={() => setSelectedPatient(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">المعلومات الشخصية</h3>
                  <p className="text-gray-600">العمر: {selectedPatient.age} سنة</p>
                  <p className="text-gray-600">الحالة: {selectedPatient.condition}</p>
                </div>

                {selectedPatient.healthData && (
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">البيانات الصحية الحالية</h3>
                    <div className="space-y-2">
                      <p className="text-gray-600">معدل ضربات القلب: {selectedPatient.healthData.heartRate} bpm</p>
                      <p className="text-gray-600">الأكسجين: {selectedPatient.healthData.bloodOxygen}%</p>
                      <p className="text-gray-600">الخطوات: {selectedPatient.healthData.steps?.toLocaleString()}</p>
                      <p className="text-gray-600">ساعات النوم: {selectedPatient.healthData.sleepHours} ساعة</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 flex gap-4">
                <button
                  onClick={() => navigate(`/health-analytics?patient=${selectedPatient._id}`)}
                  className="bg-[#1D5E78] text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
                >
                  عرض التحليلات التفصيلية
                </button>
                <button
                  onClick={() => setSelectedPatient(null)}
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  إغلاق
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DoctorDashboard
