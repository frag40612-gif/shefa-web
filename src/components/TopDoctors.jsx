import React from 'react'
import { doctors } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const TopDoctors = () => {
    const navigate = useNavigate()

    return (
        <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
            <h1 className='text-3xl font-medium'>أفضل الأطباء للحجز</h1>
            <p className='sm:w-1/3 text-center text-sm'>
                تصفح قائمة أطبائنا الموثوقين وحدد موعدك بسهولة وسرعة.
            </p>

            <div className='w-full grid [grid-template-columns:repeat(auto-fill,_minmax(200px,1fr))] gap-4 gap-y-6 pt-5 px-3 sm:px-0'>
                {doctors.slice(0, 10).map((item, index) => (
                    <div  
                        key={index}
                        onClick={() => navigate(`/appointment/${item._id}`)} 
                        className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[10px] transition-all duration-500'
                    >
                        <img 
                            className='bg-blue-50 w-full h-48 object-cover' 
                            src={item.image} 
                            alt={item.name} 
                        />
                        <div className='p-4'>
                            <div className='flex items-center gap-2 text-sm justify-center text-green-500'>
                                <p className='w-2 h-2 bg-green-500 rounded-full'></p>
                                <p>متاح</p>
                            </div>
                            <p className='text-gray-900 text-lg font-medium text-center'>{item.name}</p>
                            <p className='text-[#1D5E78] text-sm text-center'>
                                {item.speciality === 'General Surgery' ? 'الجراحة العامة' :
                                 item.speciality === 'Chest Diseases' ? 'الأمراض الصدرية' :
                                 item.speciality === 'Kidney Diseases' ? 'أمراض الكلى' :
                                 item.speciality === 'Blood Diseases' ? 'أمراض الدم' :
                                 item.speciality}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <button 
                onClick={() => navigate('/doctors')}
                className='mt-6 px-6 py-2 bg-gradient-to-r from-[#1D5E78] to-[#0b304a] text-white rounded-lg hover:scale-105 transition-all duration-300'
            >
                المزيد
            </button>
        </div>
    )
}

export default TopDoctors
