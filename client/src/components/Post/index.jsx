import React from 'react'
import { Link } from 'gatsby'
import cx from 'classnames'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { DateTime } from 'luxon'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import readingTime from 'reading-time'

import { stringToSlug } from '@Utils/string'
import * as styles from './post.module.scss'

const Post = ({ postData, nextPost }) => {
  const { title, slug, category, content, featuredImage, updatedAt } = postData

  const updatedAtObject = DateTime.fromISO(updatedAt, { zone: 'utc' })

  const stats = readingTime(content.raw)

  return (
    <div className={cx(styles[`news_single__${slug}`])}>
      {featuredImage && <figure className={styles.news_single__thumbnail}>
        <GatsbyImage
          image={getImage(featuredImage)}
          alt={featuredImage?.title}
        />
      </figure>}

      <div className={styles.news_single__content}>
        <div className={styles.news_single__heading}>
          <h2 className={styles.news_single__title}>{title}</h2>
          <time className={styles.news_single__published} datetime={updatedAt}>
            {updatedAtObject.toFormat('MM.dd.yy')}
          </time>

          <div className={styles.news_single__category}>
            {category.map((cat, index) => (
              <Link key={index} to={`/news/category/${stringToSlug(cat)}`}>
                {cat}
              </Link>
            ))}{' '}
            <span>{stats.text}</span>
          </div>
        </div>
        <div className={cx(styles.remark_content)}>
          {documentToReactComponents(JSON.parse(content.raw))}
        </div>
      </div>
    </div>
  )
}

export default Post
