import React, { useState } from 'react'
import API from '../api'
import { toast } from 'react-toastify'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await API.post('/contact', formData)
      toast.success('تم إرسال الرسالة بنجاح!')
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      })
    } catch (error) {
      console.error('Error sending message:', error)
      toast.error('حدث خطأ أثناء إرسال الرسالة')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen py-10" style={{ direction: 'rtl' }}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#1D5E78] mb-4">اتصل بنا</h1>
          <p className="text-xl text-gray-600">
            نحن هنا لمساعدتك. لا تتردد في التواصل معنا
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* معلومات الاتصال */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-[#1D5E78] mb-6">معلومات الاتصال</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="text-2xl">📧</div>
                  <div>
                    <h3 className="font-semibold text-gray-800">البريد الإلكتروني</h3>
                    <p className="text-gray-600">info@shefa.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="text-2xl">📞</div>
                  <div>
                    <h3 className="font-semibold text-gray-800">رقم الهاتف</h3>
                    <p className="text-gray-600">+20 123 456 7890</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="text-2xl">📍</div>
                  <div>
                    <h3 className="font-semibold text-gray-800">العنوان</h3>
                    <p className="text-gray-600">القاهرة، مصر</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="text-2xl">🕐</div>
                  <div>
                    <h3 className="font-semibold text-gray-800">ساعات العمل</h3>
                    <p className="text-gray-600">24/7 - متاح على مدار الساعة</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* نموذج الاتصال */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-[#1D5E78] mb-6">أرسل لنا رسالة</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="الاسم"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1D5E78]"
                  required
                />
              </div>

              <div>
                <input
                  type="email"
                  placeholder="البريد الإلكتروني"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1D5E78]"
                  required
                />
              </div>

              <div>
                <input
                  type="tel"
                  placeholder="رقم الهاتف"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1D5E78]"
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="الموضوع"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1D5E78]"
                  required
                />
              </div>

              <div>
                <textarea
                  placeholder="الرسالة"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1D5E78]"
                  rows={6}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1D5E78] text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading ? 'جاري الإرسال...' : 'إرسال الرسالة'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
