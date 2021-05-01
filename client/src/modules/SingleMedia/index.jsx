import React, { useState } from 'react'
import { graphql } from 'gatsby'
import cx from 'classnames'
import ScrollTrigger from 'react-scroll-trigger'

import Slide from '@Components/Slider/Slide'
import useWindowSize from '@Hooks/useWindowSize'

import * as styles from './style.module.scss'

const maxOffset = 24

const SingleMedia = ({ title, slug, description, media }) => {
  const [visible, setVisible] = useState(false)
  const [offset, setOffset] = useState(maxOffset)

  const handleScrollProgress = ({ progress }) => {
    const newOffset = maxOffset - 0.9 * progress * maxOffset
    setOffset(Math.min(Math.round(newOffset), maxOffset))
  }
  return (
    <section
      className={cx(styles.root, styles.scroll_reveal, {
        [styles.fade_in_bottom]: visible,
      })}
    >
      <ScrollTrigger
        onEnter={() => setVisible(true)}
        onProgress={handleScrollProgress}
      />
      <Slide title={title} description={description} media={media} contained={true} />
    </section>
  )
}

export default SingleMedia

export const query = graphql`
  fragment SingleMediaModule on ContentfulModuleSingleMedia {
    slug
    title
    description
    media {
      file {
        fileName
        url
      }
    }
  }
`
