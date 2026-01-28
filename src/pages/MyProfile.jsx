import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { apiService } from '../utils/api'
import { toast } from 'react-toastify'

const MyProfile = () => {
  const navigate = useNavigate()
  const { user, updateUser, isAuthenticated } = useAuth()
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  
  // Initialize form data based on user role
  const getInitialFormData = () => {
    if (user?.role === 'doctor') {
      return {
        fullName: '',
        email: '',
        phone: '',
        gender: '',
        specialization: '',
        degree: '',
        experience: '',
        availableTimes: '',
        address: ''
      }
    } else if (user?.role === 'companion') {
      return {
        fullName: '',
        email: '',
        phone: '',
        gender: '',
        relation: '',
        experience: ''
      }
    } else {
      // Patient
      return {
        fullName: '',
        email: '',
        phone: '',
        gender: '',
        age: '',
        bloodType: '',
        disease: '',
        medications: ''
      }
    }
  }
  
  const [formData, setFormData] = useState(getInitialFormData())

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    fetchUserData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, navigate])

  const fetchUserData = async () => {
    try {
      setLoading(true)
      try {
        const response = await apiService.getUserProfile()
        const userData = response.data
        
        // Set form data based on role
        if (userData.role === 'doctor') {
          setFormData({
            fullName: userData.fullName || userData.name || '',
            email: userData.email || '',
            phone: userData.phone || '',
            gender: userData.gender || '',
            specialization: userData.specialization || '',
            degree: userData.degree || '',
            experience: userData.experience || '',
            availableTimes: userData.availableTimes || '',
            address: userData.address || ''
          })
        } else if (userData.role === 'companion') {
          setFormData({
            fullName: userData.fullName || userData.name || '',
            email: userData.email || '',
            phone: userData.phone || '',
            gender: userData.gender || '',
            relation: userData.relation || '',
            experience: userData.experience || ''
          })
        } else {
          // Patient
          setFormData({
            fullName: userData.fullName || userData.name || '',
            email: userData.email || '',
            phone: userData.phone || '',
            gender: userData.gender || '',
            age: userData.age || '',
            bloodType: userData.bloodType || '',
            disease: userData.disease || '',
            medications: userData.medications || ''
          })
        }
        updateUser(userData)
      } catch (error) {
        // استخدام بيانات المستخدم من context
        if (user) {
          if (user.role === 'doctor') {
            setFormData({
              fullName: user.fullName || user.name || '',
              email: user.email || '',
              phone: user.phone || '',
              gender: user.gender || '',
              specialization: user.specialization || '',
              degree: user.degree || '',
              experience: user.experience || '',
              availableTimes: user.availableTimes || '',
              address: user.address || ''
            })
          } else if (user.role === 'companion') {
            setFormData({
              fullName: user.fullName || user.name || '',
              email: user.email || '',
              phone: user.phone || '',
              gender: user.gender || '',
              relation: user.relation || '',
              experience: user.experience || ''
            })
          } else {
            setFormData({
              fullName: user.fullName || user.name || '',
              email: user.email || '',
              phone: user.phone || '',
              gender: user.gender || '',
              age: user.age || '',
              bloodType: user.bloodType || '',
              disease: user.disease || '',
              medications: user.medications || ''
            })
          }
        }
      }
      setLoading(false)
    } catch (error) {
      console.error('Error fetching user data:', error)
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await apiService.updateUserProfile(formData)
      updateUser({ ...user, ...formData })
      toast.success('تم تحديث البيانات بنجاح!')
      setEditing(false)
    } catch (error) {
      console.error('Error updating profile:', error)
      // Save locally if API fails
      updateUser({ ...user, ...formData })
      toast.success('تم حفظ البيانات محلياً!')
      setEditing(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-[#1D5E78]">جاري التحميل...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-10" style={{ direction: 'rtl' }}>
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-[#1D5E78]">حسابي</h1>
            {!editing && (
              <button
                onClick={() => setEditing(true)}
                className="bg-[#1D5E78] text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
              >
                تعديل البيانات
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  الاسم الكامل
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  disabled={!editing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1D5E78] disabled:bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={!editing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1D5E78] disabled:bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  رقم الهاتف
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  disabled={!editing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1D5E78] disabled:bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  النوع
                </label>
                {editing ? (
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1D5E78]"
                  >
                    <option value="">اختر النوع</option>
                    <option value="male">ذكر</option>
                    <option value="female">أنثى</option>
                  </select>
                ) : (
                  <input
                    type="text"
                    value={formData.gender === 'male' ? 'ذكر' : formData.gender === 'female' ? 'أنثى' : ''}
                    disabled
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100"
                  />
                )}
              </div>

              {/* Doctor specific fields */}
              {user?.role === 'doctor' && (
                <>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      التخصص
                    </label>
                    <input
                      type="text"
                      value={formData.specialization || ''}
                      onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                      disabled={!editing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1D5E78] disabled:bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      الدرجة العلمية
                    </label>
                    <input
                      type="text"
                      value={formData.degree || ''}
                      onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                      disabled={!editing}
                      placeholder="مثال: MBBS, MD"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1D5E78] disabled:bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      سنوات الخبرة
                    </label>
                    <input
                      type="text"
                      value={formData.experience || ''}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      disabled={!editing}
                      placeholder="مثال: 5 Years"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1D5E78] disabled:bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      المواعيد المتاحة
                    </label>
                    <input
                      type="text"
                      value={formData.availableTimes || ''}
                      onChange={(e) => setFormData({ ...formData, availableTimes: e.target.value })}
                      disabled={!editing}
                      placeholder="مثال: 9:00 AM - 5:00 PM"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1D5E78] disabled:bg-gray-100"
                    />
                  </div>
                </>
              )}

              {/* Companion specific fields */}
              {user?.role === 'companion' && (
                <>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      صلة القرابة
                    </label>
                    <input
                      type="text"
                      value={formData.relation || ''}
                      onChange={(e) => setFormData({ ...formData, relation: e.target.value })}
                      disabled={!editing}
                      placeholder="مثال: زوجة، ابن، أخت"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1D5E78] disabled:bg-gray-100"
                    />
                  </div>
                </>
              )}

              {/* Patient specific fields */}
              {user?.role === 'patient' && (
                <>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      العمر
                    </label>
                    <input
                      type="number"
                      value={formData.age || ''}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      disabled={!editing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1D5E78] disabled:bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      فصيلة الدم
                    </label>
                    {editing ? (
                      <select
                        value={formData.bloodType || ''}
                        onChange={(e) => setFormData({ ...formData, bloodType: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1D5E78]"
                      >
                        <option value="">اختر فصيلة الدم</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                      </select>
                    ) : (
                      <input
                        type="text"
                        value={formData.bloodType || ''}
                        disabled
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100"
                      />
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Doctor - Address */}
            {user?.role === 'doctor' && (
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  العنوان
                </label>
                <textarea
                  value={formData.address || ''}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  disabled={!editing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1D5E78] disabled:bg-gray-100"
                  rows={3}
                />
              </div>
            )}

            {/* Companion - Experience */}
            {user?.role === 'companion' && (
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  الخبرات السابقة في الرعاية الطبية
                </label>
                <textarea
                  value={formData.experience || ''}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  disabled={!editing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1D5E78] disabled:bg-gray-100"
                  rows={4}
                />
              </div>
            )}

            {/* Patient - Disease and Medications */}
            {user?.role === 'patient' && (
              <>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    المرض
                  </label>
                  <input
                    type="text"
                    value={formData.disease || ''}
                    onChange={(e) => setFormData({ ...formData, disease: e.target.value })}
                    disabled={!editing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1D5E78] disabled:bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    الأدوية الحالية
                  </label>
                  <textarea
                    value={formData.medications || ''}
                    onChange={(e) => setFormData({ ...formData, medications: e.target.value })}
                    disabled={!editing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1D5E78] disabled:bg-gray-100"
                    rows={4}
                  />
                </div>
              </>
            )}

            {editing && (
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-[#1D5E78] text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                  حفظ التغييرات
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditing(false)
                    fetchUserData()
                  }}
                  className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-400 transition-colors"
                >
                  إلغاء
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}

export default MyProfile
