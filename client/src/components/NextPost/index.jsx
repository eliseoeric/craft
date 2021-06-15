import React from 'react'
import { Link } from 'gatsby'
import cx from 'classnames'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

import * as styles from './next.module.scss'

const NextPost = ({nextPost}) => {
  return (
    <div className={styles.next_post}>
      <div className={styles.next_post__inner}>
        <div className={styles.next_post__content}>
          <Link
            className={styles.next_post__subtitle}
            to={`/news/${nextPost.slug}`}
          >
            <span>Read Next</span>
          </Link>
          <h2 className={styles.next_post__title}>
            <Link to={`/news/${nextPost.slug}`}>{nextPost.title}</Link>
          </h2>
        </div>
        {nextPost.featuredImage && <figure className={styles.next_post__image}>
          <Link to={`/news/${nextPost.slug}`}>
            <GatsbyImage
              image={getImage(nextPost.featuredImage)}
              alt={nextPost.featuredImage?.title}
            />
          </Link>
        </figure>}
      </div>
    </div>
  )
}

export default NextPost
