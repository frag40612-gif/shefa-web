import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const primaryColor = 'bg-[#1D5E78]';
  const primaryText = 'text-[#1D5E78]';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(email, password);
      
      if (result.success) {
        const message = result.message || 'تم تسجيل الدخول بنجاح!';
        toast.success(message);
        
        // Redirect based on user role
        setTimeout(() => {
          const userRole = JSON.parse(localStorage.getItem('user') || '{}')?.role;
          if (userRole === 'doctor') {
            navigate('/doctor-dashboard');
          } else if (userRole === 'patient') {
            navigate('/health-dashboard');
          } else {
            navigate('/');
          }
        }, 1000);
      } else {
        const errorMsg = result.message || 'حدث خطأ أثناء تسجيل الدخول';
        setError(errorMsg);
        toast.error(errorMsg);
      }
    } catch (err) {
      console.error('Login error:', err);
      const errorMsg = err.message || 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.';
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-10 pb-20" style={{ direction: 'rtl' }}>
      {/* الخلفية */}
      <div 
        className="w-full h-64 md:h-80 bg-cover bg-center relative"
        style={{
          backgroundImage: `url('https://i.postimg.cc/FzyNK8G1/header-img.png')`,
        }}
      />

      {/* المربع الأبيض */}
      <div className="flex flex-col md:flex-row justify-between max-w-[1200px] w-full p-8 mt-[-40px] bg-white rounded-lg shadow-xl z-10">
        
        {/* القسم الأيمن: الحقول */}
        <div className="w-full md:w-1/2 flex flex-col items-start px-4 md:px-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2 text-left">مرحباً بعودتك، الرجاء تسجيل الدخول</h2>
          <p className="text-sm text-gray-500 mb-6 text-left">سجل الدخول باستخدام البيانات التي أدخلتها أثناء التسجيل</p>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4 w-full">
              {error}
            </div>
          )}

          <form className="space-y-5 w-full" onSubmit={handleLogin}>
            <div className="relative">
              <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">📧</span>
              <input
                type="text"
                placeholder="ادخل البريد الإلكتروني أو رقم الهاتف"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1D5E78]"
              />
            </div>

            <div className="relative">
              <span 
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '🙈' : '👁️'}
              </span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="ادخل كلمة المرور"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1D5E78]"
              />
            </div>

            <div className="text-right">
              <a href="#" className="text-sm text-gray-500 hover:underline">هل نسيت كلمة المرور؟</a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full ${primaryColor} text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity`}
            >
              {loading ? 'جاري تسجيل الدخول...' : 'سجل الدخول الآن'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6 w-full">
            ليس لديك حساب؟ 
            <button 
              onClick={() => navigate('/signup/patient')}
              className={`font-semibold ${primaryText} hover:underline ml-1`}
            >
              أنشئ حساباً جديداً
            </button>
          </p>
        </div>

        {/* القسم الأيسر: الصورة */}
        <div className="w-full md:w-1/2 flex items-center justify-center mt-8 md:mt-0 px-4">
          <img 
            src="https://i.postimg.cc/pdJT09K5/login-icon.png" 
            alt="Login Illustration" 
            className="w-full h-auto max-w-[500px] rounded-lg"
          />
        </div>

      </div>
    </div>
  );
};

export default Login;
