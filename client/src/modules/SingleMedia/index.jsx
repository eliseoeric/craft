import React, { useState } from 'react'
import { graphql } from 'gatsby'
import cx from 'classnames'
import ScrollTrigger from 'react-scroll-trigger'

import Slide from '@Components/Slider/Slide'
import useScrollProgress from '@Hooks/useScrollProgress'
import * as styles from './style.module.scss'

const SingleMedia = ({ title, slug, description, media }) => {
  const { handleScrollProgress, setVisible, visible } = useScrollProgress()

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
      <Slide
        title={title}
        description={description}
        media={media}
        contained={true}
      />
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
