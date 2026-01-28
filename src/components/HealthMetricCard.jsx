import React from 'react'

const HealthMetricCard = ({ 
  title, 
  value, 
  unit = '', 
  icon, 
  status, 
  statusMessage,
  progress,
  progressMax,
  children 
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        {icon && <span className="text-2xl">{icon}</span>}
      </div>
      <div className="text-center">
        <div className={`text-4xl font-bold mb-2 ${status?.color || 'text-[#1D5E78]'}`}>
          {value || '--'} {unit && <span className="text-xl">{unit}</span>}
        </div>
        {statusMessage && (
          <p className={`text-sm ${status?.color || 'text-gray-600'}`}>
            {statusMessage}
          </p>
        )}
        {progress !== undefined && progressMax && (
          <>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-[#1D5E78] h-2 rounded-full transition-all"
                style={{ width: `${Math.min((progress / progressMax) * 100, 100)}%` }}
              ></div>
            </div>
            {progressMax === 10000 && (
              <p className="text-sm text-gray-600 mt-2">الهدف: {progressMax.toLocaleString()} خطوة</p>
            )}
          </>
        )}
        {children}
      </div>
    </div>
  )
}

export default HealthMetricCard
