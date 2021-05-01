import React from 'react'
import { graphql } from 'gatsby'
import uuid from 'uuid'

import Container from '@Components/Grid/Container'
import Row from '@Components/Grid/Row'
import Slider from '@Components/Slider'
import Slide from '@Components/Slider/Slide'
import * as styles from './styles.module.scss'

const CarouselModule = ({ title, slug, slides }) => {
  if (!window) {
    return
  }
  return (
    <section id={slug} className={styles.root}>
      <div className={styles.container}>
        <Slider className={'carousel'}>
          {slides &&
            slides.map(({ title, description, media }, index) => {
              return (
                <Slide key={uuid.v4()} title={title} description={description} media={media} />
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
