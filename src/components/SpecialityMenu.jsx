import React from 'react';
import { useNavigate } from 'react-router-dom';
import { specialityData } from '../assets/assets';
import { getSpecialityName } from '../utils/helpers';

const SpecialityMenu = () => {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col items-center gap-6 my-20 text-gray-900 md:mx-10'>
     <h1 className='text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#1D5E78] to-[#0b304a]'>
  خدماتنا الطبية
</h1>

      <p className='sm:w-2/3 text-center text-lg text-gray-600 leading-relaxed'>
        نقدم مجموعة شاملة من الخدمات الطبية المتخصصة بأعلى معايير الجودة والرعاية الصحية.
      </p>

      <div className='w-full grid [grid-template-columns:repeat(auto-fill,_minmax(220px,1fr))] gap-8 pt-8 px-3 sm:px-0'>
        {specialityData.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(`/doctors/${item.speciality}`)}
            className='rounded-2xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-white'
          >
            <div className='relative'>
              <img
                className='w-full h-52 object-cover brightness-90'
                src={item.image}
                alt={getSpecialityName(item.speciality)}
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/40 to-transparent'></div>
            </div>
            <div className='p-5 bg-white text-center'>
              <p className='text-lg md:text-xl font-semibold text-[#1D5E78] relative group transition-all duration-300 hover:text-[#0b304a] hover:drop-shadow-xl'>
                {getSpecialityName(item.speciality)}
                <span className='absolute left-1/2 -bottom-1 w-0 h-1 bg-[#1D5E78] transition-all duration-300 group-hover:w-full group-hover:-translate-x-1/2'></span>
              </p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate('/doctors')}
        className='mt-8 px-8 py-3 bg-gradient-to-r from-[#1D5E78] to-[#0b304a] text-white font-semibold rounded-xl hover:scale-105 hover:shadow-xl transition-all duration-300'
      >
        المزيد
      </button>
    </div>
  );
};

export default SpecialityMenu;
