import React from 'react';
import { assets } from '../assets/assets';

const Header = () => {
  return (
    <div
      className="relative flex flex-col md:flex-row flex-wrap rounded-lg px-6 md:px-10 lg:px-20 py-20 md:py-40"
      style={{
        backgroundImage: `url(${assets.header_img})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '400px', 
      }}
    >
      
      <div className="absolute bottom-0 left-0 w-full flex justify-start p-6 z-10">
        <a
         href="#speciality"
         className="flex items-center gap-2 px-8 py-3 rounded-full text-white font-bold text-lg tracking-wide
             bg-gradient-to-r from-[#00c6ff] to-[#0072ff] 
             shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300"
        >

          احجز الآن <img className="w-3" src={assets.arrow_icon} alt="Arrow" />
        </a>

      </div>
    </div>
  );
};

export default Header;
