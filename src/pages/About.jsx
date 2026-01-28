import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className="min-h-screen py-10" style={{ direction: 'rtl' }}>
      <div className="max-w-6xl mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1D5E78] mb-4">
            من نحن
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            منصة شفاء هي منصة طبية متكاملة تهدف إلى ربط المرضى بالأطباء المختصين
            وتسهيل عملية حجز المواعيد الطبية
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8">
          <h2 className="text-3xl font-bold text-[#1D5E78] mb-6">رؤيتنا</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            نسعى لأن نكون المنصة الرائدة في مجال الرعاية الصحية الرقمية في المنطقة،
            من خلال توفير خدمات طبية عالية الجودة وسهلة الوصول لجميع المرضى.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            نؤمن بأن الرعاية الصحية يجب أن تكون متاحة للجميع، وأن التكنولوجيا يمكنها
            أن تلعب دوراً مهماً في تحسين تجربة المرضى والأطباء على حد سواء.
          </p>
        </div>

        {/* Values Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-[#1D5E78] to-[#0b304a] text-white rounded-xl p-6">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold mb-2">الجودة</h3>
            <p className="text-blue-100">
              نضمن أعلى معايير الجودة في جميع خدماتنا الطبية
            </p>
          </div>
          <div className="bg-gradient-to-br from-[#1D5E78] to-[#0b304a] text-white rounded-xl p-6">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-bold mb-2">السرعة</h3>
            <p className="text-blue-100">
              حجز المواعيد بسهولة وسرعة في أي وقت ومن أي مكان
            </p>
          </div>
          <div className="bg-gradient-to-br from-[#1D5E78] to-[#0b304a] text-white rounded-xl p-6">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-bold mb-2">الأمان</h3>
            <p className="text-blue-100">
              حماية كاملة لبياناتك الشخصية والطبية
            </p>
          </div>
        </div>

        {/* Services Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8">
          <h2 className="text-3xl font-bold text-[#1D5E78] mb-6">خدماتنا</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <div className="text-3xl">👨‍⚕️</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">قاعدة بيانات شاملة للأطباء</h3>
                <p className="text-gray-600">
                  تصفح قائمة واسعة من الأطباء المختصين في مختلف التخصصات الطبية
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-3xl">📅</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">حجز المواعيد الإلكتروني</h3>
                <p className="text-gray-600">
                  احجز موعدك مع الطبيب المفضل لديك بسهولة وسرعة
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-3xl">👥</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">نظام المرافقين</h3>
                <p className="text-gray-600">
                  إمكانية ربط المرضى بمرافقين لمساعدتهم في الرعاية الصحية
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-3xl">💬</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">دعم فني متواصل</h3>
                <p className="text-gray-600">
                  فريق دعم متاح على مدار الساعة لمساعدتك في أي استفسار
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-[#1D5E78] mb-2">100+</div>
            <div className="text-gray-600">طبيب</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-[#1D5E78] mb-2">1000+</div>
            <div className="text-gray-600">مريض</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-[#1D5E78] mb-2">500+</div>
            <div className="text-gray-600">موعد محجوز</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-[#1D5E78] mb-2">24/7</div>
            <div className="text-gray-600">دعم فني</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
