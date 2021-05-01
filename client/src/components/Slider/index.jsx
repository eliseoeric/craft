import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import cx from 'classnames'

import SlickArrowPrev from '@SVGs/slick-arrow-prev.svg'
import SlickArrowNext from '@SVGs/slick-arrow-next.svg'

const PrevArrow = ({ className, style, onClick }) => {
  return (
    <button
      className={cx(className, 'slick-arrow', 'slick-prev')}
      onClick={onClick}
      style={style}
      type="button"
    >
      <SlickArrowPrev />
    </button>
  )
}

const NextArrow = ({ className, style, onClick }) => {
  return (
    <button
      className={cx(className, 'slick-arrow', 'slick-next')}
      onClick={onClick}
      style={style}
      type="button"
    >
      <SlickArrowNext />
    </button>
  )
}

const SliderComponent = ({ children, className }) => {
  return (
    <Slider
      lazyLoad={true}
      infinite={true}
      variableWidth={true}
      speed={500}
      slidesToShow={1}
      dots={false}
      className={className}
      nextArrow={<NextArrow />}
      prevArrow={<PrevArrow />}
    >
      {children}
    </Slider>
  )
}

export default SliderComponent
