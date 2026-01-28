import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, logout, user } = useAuth();
  const [showSignUpOptions, setShowSignUpOptions] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const accountRef = useRef();

  // إخفاء قائمة الحساب عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (accountRef.current && !accountRef.current.contains(event.target)) {
        setShowAccountMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { name: "الرئيسية", path: "/" },
    { name: "الأطباء", path: "/doctors" },
    { name: "من نحن", path: "/about" },
    { name: "اتصل بنا", path: "/contact" },
  ];

  return (
    <nav className="bg-gradient-to-r from-[#1D5E78] to-[#0b304a] text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* أيقونة الحساب */}
        <div className="relative flex items-center gap-3" ref={accountRef}>
          {token ? (
            <div
              className="flex items-center cursor-pointer hover:scale-105 transition-transform"
              onClick={() => setShowAccountMenu(!showAccountMenu)}
            >
              <img
                className="w-10 h-10 rounded-full border border-white"
                src={user?.image || "https://i.postimg.cc/YCVYfHQr/default-user.png"}
                alt="حساب المستخدم"
              />
              <img
                className="w-3 h-3 ml-1"
                src="https://i.postimg.cc/6Qxk8dVb/dropdown.png"
                alt="قائمة"
              />
            </div>
          ) : (
            <div className="hidden md:flex gap-2">
              <button
                onClick={() => navigate("/login")}
                className="bg-white text-[#1D5E78] px-4 py-2 rounded-full font-medium hover:bg-[#0b304a] hover:text-white transition-colors"
              >
                تسجيل الدخول
              </button>
              <div className="relative">
                <button
                  onClick={() => setShowSignUpOptions(!showSignUpOptions)}
                  className="bg-white bg-opacity-20 text-white px-4 py-2 rounded-full font-medium hover:scale-105 transition-transform"
                >
                  إنشاء حساب
                </button>
                {showSignUpOptions && (
                  <div className="absolute left-0 mt-2 w-40 bg-white text-[#0b304a] rounded shadow-lg z-50">
                    {["doctor", "patient", "companion"].map((role) => (
                      <p
                        key={role}
                        onClick={() => {
                          navigate(`/signup/${role}`);
                          setShowSignUpOptions(false);
                        }}
                        className="block px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors capitalize"
                      >
                        {role === "companion" ? "مرافق" : role === "doctor" ? "طبيب" : "مريض"}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* قائمة الحساب */}
          {showAccountMenu && token && (
            <div className="absolute top-full left-0 mt-2 min-w-[180px] bg-white text-[#0b304a] rounded shadow-lg z-50 flex flex-col gap-2 p-3">
              <p
                onClick={() => navigate("my-profile")}
                className="hover:text-[#1D5E78] cursor-pointer transition-colors"
              >
                حسابي
              </p>
              
              {/* روابط الطبيب */}
              {user?.role === 'doctor' && (
                <>
                  <p
                    onClick={() => navigate("doctor-dashboard")}
                    className="hover:text-[#1D5E78] cursor-pointer transition-colors font-semibold"
                  >
                    👨‍⚕️ لوحة تحكم الطبيب
                  </p>
                  <p
                    onClick={() => navigate("doctors")}
                    className="hover:text-[#1D5E78] cursor-pointer transition-colors"
                  >
                    قائمة الأطباء
                  </p>
                </>
              )}
              
              {/* روابط المريض */}
              {user?.role === 'patient' && (
                <>
                  <p
                    onClick={() => navigate("health-dashboard")}
                    className="hover:text-[#1D5E78] cursor-pointer transition-colors"
                  >
                    📊 البيانات الصحية
                  </p>
                  <p
                    onClick={() => navigate("my-appointments")}
                    className="hover:text-[#1D5E78] cursor-pointer transition-colors"
                  >
                    📅 مواعيدي
                  </p>
                  <p
                    onClick={() => navigate("doctors")}
                    className="hover:text-[#1D5E78] cursor-pointer transition-colors"
                  >
                    👨‍⚕️ الأطباء
                  </p>
                </>
              )}
              
              {/* روابط المرافق */}
              {user?.role === 'companion' && (
                <>
                  <p
                    onClick={() => navigate("health-dashboard")}
                    className="hover:text-[#1D5E78] cursor-pointer transition-colors"
                  >
                    📊 متابعة المريض
                  </p>
                </>
              )}
              
              {/* روابط مشتركة */}
              <p
                onClick={() => navigate("emergency")}
                className="hover:text-red-600 cursor-pointer transition-colors font-semibold"
              >
                🚨 طوارئ
              </p>
              <p
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="hover:text-[#1D5E78] cursor-pointer transition-colors border-t pt-2 mt-1"
              >
                تسجيل الخروج
              </p>
            </div>
          )}
        </div>

        {/* روابط التنقل (Desktop) */}
        <ul className="hidden md:flex items-center gap-8 font-semibold text-lg">
          {navLinks.map((link, idx) => (
            <NavLink
              key={idx}
              to={link.path}
              className={({ isActive }) =>
                isActive
                  ? "text-white border-b-2 border-white pb-1 transition-all"
                  : "text-white hover:text-gray-200 transition-colors"
              }
            >
              <li className="cursor-pointer">{link.name}</li>
            </NavLink>
          ))}
        </ul>

        {/* Hamburger Menu (Mobile) */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="focus:outline-none"
          >
            <img
              src="https://i.postimg.cc/qB0Y6Dq6/menu.png"
              alt="menu"
              className="w-6 h-6"
            />
          </button>
        </div>

        {/* اللوجو */}
        <div
          className="flex items-center cursor-pointer hover:scale-105 transition-transform"
          onClick={() => navigate("/")}
        >
          <img
            className="w-24 h-24 md:w-28 md:h-28"
            src="https://i.postimg.cc/MTzRJqFH/logoo.png"
            alt="شفاء"
          />
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <ul className="md:hidden bg-[#0b304a] flex flex-col gap-4 px-4 py-3 font-semibold text-white">
          {navLinks.map((link, idx) => (
            <NavLink
              key={idx}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "text-white border-b-2 border-white pb-1 transition-all"
                  : "text-white hover:text-gray-200 transition-colors"
              }
            >
              <li>{link.name}</li>
            </NavLink>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
