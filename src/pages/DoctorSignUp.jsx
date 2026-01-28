import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const DoctorSignUp = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const primaryColor = 'bg-[#1D5E78]';
  
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [availableTimes, setAvailableTimes] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('كلمة المرور وتأكيد كلمة المرور غير متطابقين');
      return;
    }

    setLoading(true);
    const userData = {
      fullName,
      email,
      password,
      phone,
      gender,
      specialization,
      availableTimes,
      role: 'doctor'
    };

    const result = await signup(userData, 'doctor');
    setLoading(false);

    if (result.success) {
      toast.success('تم التسجيل بنجاح!');
      navigate('/');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-10 pb-20" style={{ direction: 'rtl' }}>
      {/* الخلفية */}
      <div 
        className="w-full h-64 md:h-80 bg-cover bg-center relative"
        style={{ backgroundImage: `url('https://i.postimg.cc/FzyNK8G1/header-img.png')` }}
      />

      {/* المربع الأبيض */}
      <div className="flex flex-col md:flex-row justify-between max-w-[1200px] w-full p-8 mt-[-40px] bg-white rounded-lg shadow-xl z-10">

        {/* القسم الأيمن: الحقول */}
        <div className="w-full md:w-1/2 flex flex-col items-start px-4 md:px-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2 text-left">تسجيل طبيب جديد</h2>
          <p className="text-sm text-gray-500 mb-6 text-left">املأ البيانات لإنشاء حساب جديد</p>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4 w-full">
              {error}
            </div>
          )}

          <form className="space-y-5 w-full" onSubmit={handleSignUp}>
            <input
              type="text"
              placeholder="الاسم بالكامل"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1D5E78]"
              required
            />
            <input
              type="email"
              placeholder="البريد الإلكتروني"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1D5E78]"
              required
            />
            {/* كلمة المرور */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="كلمة المرور"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1D5E78]"
                required
              />
              <span
                className="absolute inset-y-0 left-0 flex items-center pl-3 cursor-pointer text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '🙈' : '👁️'}
              </span>
            </div>

            {/* تأكيد كلمة المرور */}
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="تأكيد كلمة المرور"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1D5E78]"
                required
              />
              <span
                className="absolute inset-y-0 left-0 flex items-center pl-3 cursor-pointer text-gray-400"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? '🙈' : '👁️'}
              </span>
            </div>

            <input
              type="tel"
              placeholder="رقم الهاتف"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1D5E78]"
              required
            />

           {/* النوع */}
<div>
  <label className="block mb-2 font-medium">النوع</label>
  <div className="flex gap-4">
    {/* خيار ذكر */}
    <div
      onClick={() => setGender('male')}
      className={`cursor-pointer flex-1 text-center py-3 rounded-lg border 
        ${gender === 'male' ? 'bg-[#1D5E78] text-white border-[#1D5E78]' : 'bg-white text-gray-700 border-gray-300'} 
        transition-all duration-200`}
    >
      ذكر
    </div>

    {/* خيار أنثى */}
    <div
      onClick={() => setGender('female')}
      className={`cursor-pointer flex-1 text-center py-3 rounded-lg border 
        ${gender === 'female' ? 'bg-[#1D5E78] text-white border-[#1D5E78]' : 'bg-white text-gray-700 border-gray-300'} 
        transition-all duration-200`}
    >
      أنثى
    </div>
  </div>
</div>



            <input
              type="text"
              placeholder="التخصص"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1D5E78]"
              required
            />
            <input
              type="text"
              placeholder="المواعيد المتاحة"
              value={availableTimes}
              onChange={(e) => setAvailableTimes(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1D5E78]"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-full ${primaryColor} text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity`}
            >
              {loading ? 'جاري التسجيل...' : 'سجل الآن'}
            </button>
          </form>
        </div>

        {/* القسم الأيسر: صورة */}
        <div className="w-full md:w-1/2 flex items-center justify-center mt-8 md:mt-0 px-4">
          <img 
            src="https://i.postimg.cc/Gh4sP8C1/signup-icon.png"
            alt="Signup Illustration"
            className="w-full h-auto max-w-[500px] rounded-lg"
          />
        </div>

      </div>
    </div>
  );
};

export default DoctorSignUp;
