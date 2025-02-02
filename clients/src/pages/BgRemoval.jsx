import React from 'react'
import BgHeader from '../components/BgHeader'
import BgSteps from '../components/BgSteps'
import BgSlider from '../components/BgSlider'
import BgTestimonial from '../components/BgTestimonial'
import BgUpload from '../components/BgUpload'

const BgRemoval = () => {
  return (
    <div  className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 z-0">
      <BgHeader />
      <BgSteps />
      <BgSlider />
      <BgTestimonial />
      <BgUpload />
    </div>
  )
}

export default BgRemoval
