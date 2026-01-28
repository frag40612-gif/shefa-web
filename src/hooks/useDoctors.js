import { useState, useEffect, useCallback } from 'react'
import { apiService } from '../utils/api'
import { doctors } from '../assets/assets'

export const useDoctors = (speciality = null) => {
  const [allDoctors, setAllDoctors] = useState([])
  const [filteredDoctors, setFilteredDoctors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchDoctors = useCallback(async () => {
    try {
      setError(null)
      setLoading(true)
      const response = await apiService.getAllDoctors()
      setAllDoctors(response.data)
    } catch (err) {
      console.error('Error fetching doctors:', err)
      setError(err)
      // Use local data on error
      setAllDoctors(doctors)
    } finally {
      setLoading(false)
    }
  }, [])

  const filterBySpeciality = useCallback((spec) => {
    if (!spec || spec === 'all') {
      setFilteredDoctors(allDoctors)
      return
    }

    const filtered = allDoctors.filter(doctor => {
      const doctorSpec = doctor.speciality?.toLowerCase() || ''
      const specLower = spec.toLowerCase()
      
      // Match exact speciality name (case insensitive)
      if (doctorSpec === specLower) {
        return true
      }
      
      // Match partial (for flexibility)
      if (doctorSpec.includes(specLower) || specLower.includes(doctorSpec)) {
        return true
      }
      
      return false
    })
    setFilteredDoctors(filtered)
  }, [allDoctors])

  useEffect(() => {
    fetchDoctors()
  }, [fetchDoctors])

  useEffect(() => {
    if (speciality) {
      filterBySpeciality(speciality)
    } else {
      setFilteredDoctors(allDoctors)
    }
  }, [speciality, allDoctors, filterBySpeciality])

  return {
    doctors: filteredDoctors,
    allDoctors,
    loading,
    error,
    refetch: fetchDoctors,
    filterBySpeciality
  }
}
