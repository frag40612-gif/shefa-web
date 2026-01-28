import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import { assets } from '../assets/assets'
import doc3 from '../assets/doc3.png'
import doc8 from '../assets/doc8.png'
import doc11 from '../assets/doc11.png'
import person1 from '../assets/person1.png'
import person2 from '../assets/person2.jpg'
import person3 from '../assets/person3.AVIF'


const Home = () => {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  const Star = ({ filled }) => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      className={filled ? 'text-amber-400' : 'text-slate-200'}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 17.27l5.18 3.04-1.64-5.81 4.46-3.86-5.87-.5L12 4.7 9.87 10.14l-5.87.5 4.46 3.86-1.64 5.81L12 17.27z" />
    </svg>
  )

  return (
    <div className="relative">
      <Header />

      {/* لماذا شفاء؟ Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-slate-50/50" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#1D5E78]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 relative z-10" style={{ direction: 'rtl' }}>
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-gradient-to-r from-[#1D5E78]/10 to-orange-500/10 rounded-full text-[#1D5E78] font-semibold text-sm">
                مميزات منصة شفاء
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-extrabold mb-6">
              <span className="bg-gradient-to-r from-[#1D5E78] to-[#0b304a] bg-clip-text text-transparent">
                لماذا تختار شفاء؟
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              منصة طبية متكاملة تجمع بين الرعاية الصحية التقليدية والتكنولوجيا الحديثة
              <br />
              لتقديم أفضل تجربة رعاية صحية ممكنة
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                number: '01',
                icon: '💬',
                gradient: 'from-blue-500 to-cyan-500',
                bgGradient: 'from-blue-50 to-cyan-50',
                title: 'خدمة 24 ساعة',
                subtitle: 'على مدار الأسبوع',
                description: 'لا داعي للانتظار في العيادات. تواصل مع أفضل الأطباء وعلى مدار الساعة.'
              },
              {
                number: '02',
                icon: '🔒',
                gradient: 'from-purple-500 to-pink-500',
                bgGradient: 'from-purple-50 to-pink-50',
                title: 'خصوصية وأمان',
                subtitle: 'حماية كاملة',
                description: 'نحرص على خصوصية معلوماتك الصحية ونستخدم أحدث التقنيات لضمان أمان بياناتك.'
              },
              {
                number: '03',
                icon: '👨‍⚕️',
                gradient: 'from-green-500 to-emerald-500',
                bgGradient: 'from-green-50 to-emerald-50',
                title: 'أطباء معتمدين',
                subtitle: 'خبرة ومهنية',
                description: 'استشارات طبية مباشرة مع الأطباء من خلال الدردشة الفورية والمكالمات.'
              },
              {
                number: '04',
                icon: '💰',
                gradient: 'from-orange-500 to-red-500',
                bgGradient: 'from-orange-50 to-red-50',
                title: 'تكلفة مناسبة',
                subtitle: 'باقات مرنة',
                description: 'خدمات رعاية صحية بباقات اشتراك مختلفة تناسب احتياجاتك وميزانيتك.'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-transparent hover:-translate-y-2"
              >
                {/* Number badge */}
                <div className="absolute top-6 left-6">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                    <span className="text-white font-bold text-lg">{feature.number}</span>
                  </div>
                </div>

                {/* Icon */}
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.bgGradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-5xl">{feature.icon}</span>
                </div>

                {/* Content */}
                <div className="mt-4">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1 group-hover:text-[#1D5E78] transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm font-semibold text-gray-500 mb-4">
                    {feature.subtitle}
                  </p>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {feature.description}
                  </p>
                </div>

                {/* Hover effect overlay */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`} />
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <button
              onClick={() => navigate('/doctors')}
              className="px-8 py-4 bg-gradient-to-r from-[#1D5E78] to-[#0b304a] text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-lg"
            >
              ابدأ رحلتك الصحية الآن
            </button>
          </div>
        </div>
      </section>

      {/* من نحن - مقتبس من صفحة About */}
      <section className="py-16 bg-slate-50" style={{ direction: 'rtl' }}>
        <div className="max-w-6xl mx-auto px-4">
          {/* Hero */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1D5E78] mb-4">من نحن</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              منصة شفاء هي منصة طبية متكاملة تهدف إلى ربط المرضى بالأطباء المختصين
              وتسهيل عملية حجز المواعيد الطبية
            </p>
          </div>

          {/* Mission */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-10">
            <h3 className="text-3xl font-bold text-[#1D5E78] mb-4">رؤيتنا</h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-3">
              نسعى لأن نكون المنصة الرائدة في مجال الرعاية الصحية الرقمية في المنطقة،
              من خلال توفير خدمات طبية عالية الجودة وسهلة الوصول لجميع المرضى.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              نؤمن بأن الرعاية الصحية يجب أن تكون متاحة للجميع، وأن التكنولوجيا يمكنها
              أن تلعب دوراً مهماً في تحسين تجربة المرضى والأطباء على حد سواء.
            </p>
          </div>

          {/* Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              { icon: '🎯', title: 'الجودة', desc: 'نضمن أعلى معايير الجودة في جميع خدماتنا الطبية' },
              { icon: '⚡', title: 'السرعة', desc: 'حجز المواعيد بسهولة وسرعة في أي وقت ومن أي مكان' },
              { icon: '🔒', title: 'الأمان', desc: 'حماية كاملة لبياناتك الشخصية والطبية' },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-[#1D5E78] to-[#0b304a] text-white rounded-xl p-6 shadow-lg"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                <p className="text-blue-100 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Services */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-10">
            <h3 className="text-3xl font-bold text-[#1D5E78] mb-6">خدماتنا</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: '👨‍⚕️', title: 'قاعدة بيانات شاملة للأطباء', desc: 'تصفح قائمة واسعة من الأطباء المختصين في مختلف التخصصات الطبية' },
                { icon: '📅', title: 'حجز المواعيد الإلكتروني', desc: 'احجز موعدك مع الطبيب المفضل لديك بسهولة وسرعة' },
                { icon: '👥', title: 'نظام المرافقين', desc: 'إمكانية ربط المرضى بمرافقين لمساعدتهم في الرعاية الصحية' },
                { icon: '💬', title: 'دعم فني متواصل', desc: 'فريق دعم متاح على مدار الساعة لمساعدتك في أي استفسار' },
              ].map((service, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="text-3xl">{service.icon}</div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">{service.title}</h4>
                    <p className="text-gray-600 leading-relaxed">{service.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: '100+', label: 'طبيب' },
              { value: '1000+', label: 'مريض' },
              { value: '500+', label: 'موعد محجوز' },
              { value: '24/7', label: 'دعم فني' },
            ].map((stat, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="text-3xl font-bold text-[#1D5E78] mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="py-12">
        <SpecialityMenu />
      </div>

      <div className="py-4">
        <TopDoctors />
      </div>

      {/* آراء المستخدمين */}
      <section
        className="py-16 bg-gradient-to-br from-slate-50 via-white to-blue-50/40 relative overflow-hidden"
        style={{ direction: 'rtl' }}
      >
        <div className="absolute -top-10 -left-10 w-56 h-56 bg-[#1D5E78]/10 blur-3xl rounded-full" />
        <div className="absolute -bottom-16 -right-10 w-72 h-72 bg-orange-400/10 blur-3xl rounded-full" />

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 rounded-full shadow-sm border border-slate-200">
                <img src={assets.verified_icon} alt="" className="w-5 h-5" />
                <span className="text-sm font-semibold text-[#1D5E78]">آراء موثّقة من مستخدمين</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0b304a] mt-4 mb-2">
                آراء المستخدمين
              </h2>
              <p className="text-gray-600 text-base md:text-lg max-w-2xl">
                تقييمات تساعدك تختار بثقة — تصميم آمن، تجربة سلسة، واستجابة سريعة.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur rounded-2xl border border-slate-200 shadow-sm px-5 py-4 w-full md:w-auto">
              <div className="flex items-center justify-between md:justify-start md:gap-4">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} filled={i <= 5} />
                  ))}
                </div>
                <div className="text-right">
                  <p className="font-extrabold text-[#0b304a] text-lg leading-tight">5.0/5</p>
                  <p className="text-sm text-gray-500 leading-tight">متوسط التقييم</p>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between gap-4">
                <img
                  src={assets.group_profiles}
                  alt="مستخدمون"
                  className="h-7 w-auto opacity-90"
                />
                <button
                  onClick={() => navigate('/doctors')}
                  className="text-sm font-semibold text-[#1D5E78] hover:text-[#0b304a] transition"
                >
                  تصفح الأطباء →
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'سارة حسن',
                title: 'مستخدمة للتطبيق',
                date: 'منذ أسبوع',
                quote:
                  'كنت مترددة من مشاركة بياناتي، لكن بعد التجربة والتواصل مع الطبيب شعرت بالأمان والخصوصية.',
                rating: 5,
                avatar: person2
              },
              {
                name: 'أحمد الجبيري',
                title: 'مستخدم منذ ٦ شهور',
                date: 'منذ شهر',
                quote:
                  'تواصلت مع طبيب عبر التطبيق، الرد كان سريع والطبيب متعاون جداً والمواعيد مرنة.',
                rating: 5,
                avatar: person1
              },
              {
                name: 'مها القحطاني',
                title: 'مستخدمة للتطبيق',
                date: 'منذ يومين',
                quote:
                  'التطبيق ساعدني أتواصل مع دكتور خصوصاً وقت الطوارئ، وسهّل علي حجز موعد مناسب.',
                rating: 4,
                avatar: person3
              }
            ].map((item, idx) => (
              <article
                key={idx}
                className="rounded-3xl bg-white/80 backdrop-blur shadow-lg border border-slate-200/70 p-7 hover:-translate-y-1 hover:shadow-xl transition duration-300"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.avatar}
                      alt=""
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-sm"
                    />
                    <div>
                      <p className="font-bold text-[#0b304a] text-lg leading-tight">{item.name}</p>
                      <p className="text-sm text-gray-500 leading-tight">{item.title}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <img src={assets.verified_icon} alt="" className="w-4 h-4" />
                    <span>Verified</span>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} filled={i <= item.rating} />
                  ))}
                  <span className="text-sm text-gray-500 mr-2">{item.date}</span>
                </div>

                <div className="mt-4 relative">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    className="absolute -top-3 -right-2 text-slate-200"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M7.17 6A5.17 5.17 0 0 0 2 11.17V18h6v-6H6.5a.5.5 0 0 1-.5-.5V11.17A1.17 1.17 0 0 1 7.17 10H9V6H7.17zM19.17 6A5.17 5.17 0 0 0 14 11.17V18h6v-6h-1.5a.5.5 0 0 1-.5-.5V11.17A1.17 1.17 0 0 1 19.17 10H21V6h-1.83z" />
                  </svg>
                  <p className="text-gray-800 text-lg leading-relaxed pr-8">“{item.quote}”</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Smart Watch Health Monitoring Section */}
      <div className="bg-gradient-to-r from-[#1D5E78] to-[#0b304a] text-white py-16 my-10 rounded-2xl mx-4 md:mx-10">
        <div className="max-w-6xl mx-auto px-4" style={{ direction: 'rtl' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-4xl font-extrabold mb-4">⌚ مراقبة صحية ذكية</h2>
              <p className="text-xl mb-6 text-blue-100">
                ربط ساعة ذكية لمراقبة صحتك على مدار الساعة
              </p>
              <ul className="space-y-3 text-lg mb-8">
                <li className="flex items-center gap-3">
                  <span className="text-2xl">❤️</span>
                  <span>مراقبة معدل ضربات القلب</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-2xl">🫁</span>
                  <span>قياس الأكسجين في الدم</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-2xl">🚶</span>
                  <span>تتبع الخطوات والنشاط البدني</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-2xl">😴</span>
                  <span>تحليل جودة النوم</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-2xl">🧘</span>
                  <span>قياس مستوى التوتر</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-2xl">🚨</span>
                  <span>تنبيهات طوارئ تلقائية</span>
                </li>
              </ul>
              {isAuthenticated ? (
                <button
                  onClick={() => navigate('/health-dashboard')}
                  className="bg-white text-[#1D5E78] px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
                >
                  عرض البيانات الصحية
                </button>
              ) : (
                <button
                  onClick={() => navigate('/login')}
                  className="bg-white text-[#1D5E78] px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
                >
                  سجل الدخول للبدء
                </button>
              )}
            </div>
            <div className="text-center">
              <div className="text-8xl mb-4">📈</div>
              <p className="text-xl text-blue-100">
                الساعة الذكية ترسل البيانات تلقائياً للموقع
              </p>
              <p className="text-lg text-blue-200 mt-4">
                تحليل ذكي باستخدام ML للكشف عن أي حالات غير طبيعية
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Chat Container */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
        {/* Chat Box */}
        <div
          className={`transition-all duration-300 ease-in-out bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden ${
            isChatOpen
              ? "w-[90vw] max-w-[400px] h-[90vh] md:h-[700px] opacity-100"
              : "w-12 h-12 opacity-100"
          }`}
          style={{ backdropFilter: isChatOpen ? "blur(10px)" : "none" }}
        >
          {isChatOpen && (
            <div className="w-full h-full overflow-auto flex flex-col">
              <iframe
                src="https://dereistic-laurette-alpinely.ngrok-free.dev/widget"
                className="w-full h-full"
                title="Widget"
              ></iframe>

              {/* Close Button */}
              <button
                className="absolute top-2 right-2 bg-[#1D5E78] text-white p-2 rounded-full shadow-md z-50"
                onClick={() => setIsChatOpen(false)}
              >
                ❌
              </button>
            </div>
          )}
        </div>

        {/* Open Button */}
        {!isChatOpen && (
          <button
            className="mt-2 h-12 w-12 bg-[#1D5E78] text-white rounded-full shadow-lg flex items-center justify-center text-2xl"
            onClick={() => setIsChatOpen(true)}
          >
            💬
          </button>
        )}
      </div>
    </div>
  )
}

export default Home
