import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { graphql } from 'gatsby'

import * as styles from './group.module.scss'

const ImageGroup = ({ slug, title, images }) => {
  const renderImage = (imageData) => {
    const image = getImage(imageData)
    return (
      <div className={styles.image_group__item}>
        <figure className={styles.image_group__item_image}>
        <GatsbyImage image={image} alt={imageData.title} />
      </figure>
      </div>
    )
  }

  return (
    <section>
      <div className={cx(styles.image_group, styles[`image_group__${slug}`])}>
        {images && images.map((imageData) => renderImage(imageData))}
      </div>
    </section>
  )
}

export default ImageGroup

export const query = graphql`
  fragment ImageGroupModule on ContentfulModuleImageGroup {
    slug
    title
    images {
      title
      gatsbyImageData(aspectRatio: 1.65)
    }
  }
`
