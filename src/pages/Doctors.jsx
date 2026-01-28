import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { specialityData } from '../assets/assets'
import { useDoctors } from '../hooks/useDoctors'
import LoadingSpinner from '../components/LoadingSpinner'
import { getSpecialityName } from '../utils/helpers'

const Doctors = () => {
  const { speciality } = useParams()
  const navigate = useNavigate()
  const { doctors: filteredDoctors, loading, filterBySpeciality } = useDoctors(speciality)
  const [selectedSpeciality, setSelectedSpeciality] = React.useState(speciality || 'all')

  React.useEffect(() => {
    if (speciality) {
      setSelectedSpeciality(speciality)
      filterBySpeciality(speciality)
    }
  }, [speciality, filterBySpeciality])

  const handleSpecialityClick = (spec) => {
    setSelectedSpeciality(spec)
    filterBySpeciality(spec)
    navigate(spec === 'all' ? '/doctors' : `/doctors/${spec}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="min-h-screen py-10" style={{ direction: 'rtl' }}>
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-4 text-[#1D5E78]">
          قائمة الأطباء
        </h1>
        {speciality && (
          <p className="text-center text-xl text-gray-600 mb-8">
            التخصص: {getSpecialityName(speciality)}
          </p>
        )}

        {/* فلاتر التخصصات */}
        <div className="mb-8 flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => handleSpecialityClick('all')}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              selectedSpeciality === 'all'
                ? 'bg-[#1D5E78] text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            الكل
          </button>
          {specialityData.map((item, index) => (
            <button
              key={index}
              onClick={() => handleSpecialityClick(item.speciality)}
              className={`px-6 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                selectedSpeciality === item.speciality
                  ? 'bg-[#1D5E78] text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <img src={item.image} alt={item.speciality} className="w-6 h-6" />
              {getSpecialityName(item.speciality)}
            </button>
          ))}
        </div>

        {/* قائمة الأطباء */}
        {filteredDoctors.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">لا يوجد أطباء متاحون في هذا التخصص</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDoctors.map((doctor) => (
              <div
                key={doctor._id}
                onClick={() => navigate(`/appointment/${doctor._id}`)}
                className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:scale-105 transition-all duration-300"
              >
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-600">متاح</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-1">
                    {doctor.name}
                  </h3>
                  <p className="text-[#1D5E78] text-sm mb-2">
                    {getSpecialityName(doctor.speciality)}
                  </p>
                  <p className="text-gray-600 text-sm mb-2">
                    {doctor.degree} • {doctor.experience}
                  </p>
                  <p className="text-[#1D5E78] font-bold text-lg">
                    ${doctor.fees}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Doctors
