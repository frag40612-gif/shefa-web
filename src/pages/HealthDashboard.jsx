import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useHealthData } from '../hooks/useHealthData'
import HealthMetricCard from '../components/HealthMetricCard'
import LoadingSpinner from '../components/LoadingSpinner'
import { 
  getHeartRateStatus, 
  getOxygenStatus, 
  getSleepStatus, 
  getStressStatus,
  getRiskColor,
  getRiskText
} from '../utils/helpers'

const HealthDashboard = () => {
  const navigate = useNavigate()
  const { isAuthenticated, user } = useAuth()
  const { healthData, loading, syncWithWatch } = useHealthData()

  if (!isAuthenticated) {
    navigate('/login')
    return null
  }

  // إذا كان المستخدم طبيب، اذهب إلى dashboard الطبيب
  if (user?.role === 'doctor') {
    navigate('/doctor-dashboard')
    return null
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  const heartRateStatus = getHeartRateStatus(healthData?.heartRate)
  const oxygenStatus = getOxygenStatus(healthData?.bloodOxygen)
  const sleepStatus = getSleepStatus(healthData?.sleepHours)
  const stressStatus = getStressStatus(healthData?.stressLevel)
  const alerts = healthData?.alerts || []
  const riskScore = healthData?.riskScore

  return (
    <div className="min-h-screen py-10" style={{ direction: 'rtl' }}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-[#1D5E78]">لوحة البيانات الصحية</h1>
          <button
            onClick={syncWithWatch}
            className="bg-[#1D5E78] text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            🔄 مزامنة مع الساعة
          </button>
        </div>

        {/* Risk Score */}
        {riskScore && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">مستوى الخطر</h2>
                <p className="text-gray-600">بناءً على تحليل البيانات الصحية</p>
              </div>
              <div className={`${getRiskColor(riskScore)} text-white px-8 py-4 rounded-lg text-2xl font-bold`}>
                {getRiskText(riskScore)}
              </div>
            </div>
          </div>
        )}

        {/* Alerts */}
        {alerts.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
            <h3 className="text-xl font-bold text-red-800 mb-4">⚠️ تنبيهات مهمة</h3>
            <div className="space-y-2">
              {alerts.map((alert, index) => (
                <div key={index} className="bg-white rounded-lg p-4 border border-red-300">
                  <p className="text-red-800 font-semibold">{alert.message}</p>
                  <p className="text-sm text-red-600 mt-1">{alert.timestamp}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Health Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <HealthMetricCard
            title="معدل ضربات القلب"
            value={healthData?.heartRate}
            unit="bpm"
            icon="❤️"
            status={heartRateStatus}
            statusMessage={heartRateStatus.message}
          />
          
          <HealthMetricCard
            title="الأكسجين في الدم"
            value={healthData?.bloodOxygen}
            unit="%"
            icon="🫁"
            status={oxygenStatus}
            statusMessage={oxygenStatus.message}
          />
          
          <HealthMetricCard
            title="الخطوات اليومية"
            value={healthData?.steps?.toLocaleString()}
            icon="🚶"
            progress={healthData?.steps}
            progressMax={10000}
          />
          
          <HealthMetricCard
            title="ساعات النوم"
            value={healthData?.sleepHours}
            unit="ساعة"
            icon="😴"
            status={{ color: 'text-[#1D5E78]' }}
            statusMessage={sleepStatus.message}
          />
          
          <HealthMetricCard
            title="مستوى التوتر"
            value={healthData?.stressLevel}
            unit="/10"
            icon="🧘"
            status={{ 
              color: healthData?.stressLevel > 7 ? 'text-red-600' :
                     healthData?.stressLevel > 4 ? 'text-yellow-600' : 'text-green-600'
            }}
            statusMessage={stressStatus.message}
          >
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className={`h-2 rounded-full ${
                  healthData?.stressLevel > 7 ? 'bg-red-500' :
                  healthData?.stressLevel > 4 ? 'bg-yellow-500' : 'bg-green-500'
                }`}
                style={{ width: `${((healthData?.stressLevel || 0) / 10) * 100}%` }}
              ></div>
            </div>
          </HealthMetricCard>
          
          <HealthMetricCard
            title="آخر تحديث"
            value={healthData?.lastUpdate ? new Date(healthData.lastUpdate).toLocaleString('ar-EG', { 
              hour: '2-digit', 
              minute: '2-digit',
              day: 'numeric',
              month: 'short'
            }) : 'لا توجد بيانات'}
            icon="🕐"
          />
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">إجراءات سريعة</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => navigate('/health-analytics')}
              className="bg-[#1D5E78] text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
            >
              📊 عرض التحليلات التفصيلية
            </button>
            <button
              onClick={() => navigate('/emergency')}
              className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors"
            >
              🚨 طوارئ
            </button>
            <button
              onClick={() => navigate('/doctors')}
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
            >
              👨‍⚕️ احجز موعد مع طبيب
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HealthDashboard
