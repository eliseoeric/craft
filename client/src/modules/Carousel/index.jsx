import React, { useEffect, useRef, useState } from 'react'
import { graphql } from 'gatsby'
import uuid from 'uuid'

import { isBrowser } from '../../utils'
import Slider from '@Components/Slider'
import Slide from '@Components/Slider/Slide'
import * as styles from './styles.module.scss'

const CarouselModule = ({ title, slug, slides }) => {
  const carouselRef = useRef(null)
  const [height, setHeight] = useState(0)
  // No need to render during SSR
  if (!isBrowser) {
    return null
  }

  /**
   * Set the height of the carousel wrapper to match the inner slick-track height
   */
  const onReInit = () => {
    if (carouselRef.current) {
      const sliderNode = carouselRef.current.innerSlider.track.node
      setHeight(sliderNode.clientHeight)
    }
  }

  return (
    <section id={slug} className={styles.carousel__wrapper} style={{height: `${height}px`}}>
      <div className={styles.container}>
        <Slider className={'carousel'} ref={carouselRef} onReInit={onReInit}>
          {slides &&
            slides.map(({ title, description, media }, index) => {
              return (
                <Slide
                  key={uuid.v4()}
                  title={title}
                  description={description}
                  media={media}
                  contained={false}
                />
              )
            })}
        </Slider>
      </div>
    </section>
  )
}

export default CarouselModule

export const query = graphql`
  fragment CarouselModule on ContentfulModuleCarousel {
    title
    slug
    slides {
      title
      slug
      description
      media {
        file {
          url
        }
      }
    }
  }
`
