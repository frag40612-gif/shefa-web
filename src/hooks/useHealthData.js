import { useState, useEffect, useCallback } from 'react'
import { apiService } from '../utils/api'
import { toast } from 'react-toastify'

export const useHealthData = (autoRefresh = true, refreshInterval = 60000) => {
  const [healthData, setHealthData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchHealthData = useCallback(async () => {
    try {
      setError(null)
      const response = await apiService.getHealthData()
      setHealthData(response.data)
    } catch (err) {
      console.error('Error fetching health data:', err)
      setError(err)
      // Use mock data on error
      setHealthData({
        heartRate: 72,
        bloodOxygen: 98,
        steps: 8500,
        sleepHours: 7.5,
        stressLevel: 3,
        lastUpdate: new Date().toISOString(),
        alerts: [],
        riskScore: 'low'
      })
    } finally {
      setLoading(false)
    }
  }, [])

  const syncWithWatch = useCallback(async () => {
    try {
      toast.info('جاري مزامنة البيانات مع الساعة...')
      await apiService.syncHealthData()
      toast.success('تمت المزامنة بنجاح!')
      await fetchHealthData()
    } catch (err) {
      console.error('Error syncing health data:', err)
      toast.error('حدث خطأ أثناء المزامنة')
    }
  }, [fetchHealthData])

  useEffect(() => {
    fetchHealthData()

    if (autoRefresh) {
      const interval = setInterval(fetchHealthData, refreshInterval)
      return () => clearInterval(interval)
    }
  }, [fetchHealthData, autoRefresh, refreshInterval])

  return {
    healthData,
    loading,
    error,
    refetch: fetchHealthData,
    syncWithWatch
  }
}
