import React from 'react'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"


const SliderComponent = ({children, className}) => {
  return (
    <Slider infinite={false} variableWidth={true} speed={500} slidesToShow={1} dots={false} className={className}>
      {children}
    </Slider>
  )
}

export default SliderComponent