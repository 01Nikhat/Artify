import React from 'react'
import { testimonialsData } from '../assets/assets'

const BgTestimonial = () => {
  return (
    <div className=" bg-gradient-to-br from-gray-900 to-gray-800 ">
      {/* Title */}
      <h1 className='mb-12 sm:mb-20 text-center text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold bg-gradient-to-r from-gray-400 to-gray-200 bg-clip-text text-transparent py-5'>Cutomerm Testimonial</h1>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto px-4 py-8'>
        {
          testimonialsData.map((item,index) =>(
            <div className='bg-white roundedn-xl  p-6 drop-shadow-md max-w-lg m-auto hover:scale-105 transition-all duration-700' key={index}>
              <p className='text-4xl text-gray-500' >”</p>
              <p className='text-sm'>{item.text}</p>
              <div className='flex items-center gap-3 mt-5'>
                <img className='w-9 rounded-full' src={item.image} alt="" />
                <div>
                  <p>{item.name}</p>
                  <p className='text-sm text-gray-600'>{item.role}</p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default BgTestimonial
