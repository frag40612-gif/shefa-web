import { useState, useEffect, useCallback } from 'react'
import { apiService } from '../utils/api'
import { toast } from 'react-toastify'

export const useAppointments = () => {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchAppointments = useCallback(async () => {
    try {
      setError(null)
      setLoading(true)
      const response = await apiService.getMyAppointments()
      setAppointments(response.data)
    } catch (err) {
      console.error('Error fetching appointments:', err)
      setError(err)
      // Use mock data on error
      setAppointments([])
    } finally {
      setLoading(false)
    }
  }, [])

  const cancelAppointment = useCallback(async (appointmentId) => {
    if (!window.confirm('هل أنت متأكد من إلغاء هذا الموعد؟')) {
      return
    }

    try {
      await apiService.cancelAppointment(appointmentId)
      toast.success('تم إلغاء الموعد بنجاح')
      await fetchAppointments()
    } catch (err) {
      console.error('Error canceling appointment:', err)
      // Error toast is handled by interceptor
    }
  }, [fetchAppointments])

  useEffect(() => {
    fetchAppointments()
  }, [fetchAppointments])

  return {
    appointments,
    loading,
    error,
    refetch: fetchAppointments,
    cancelAppointment
  }
}
