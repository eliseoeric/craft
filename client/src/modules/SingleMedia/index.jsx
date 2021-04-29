import React from 'react'
import { graphql } from 'gatsby'
import cx from 'classnames'

import Container from '@Components/Grid/Container'

import * as styles from './style.module.scss'

const SingleMedia = ({ title, slug, description, media }) => {
  return (
    <section className={styles.root}>
      <Container>
        <figure className={styles.media}>
          {media && <img alt={media.file.fileName} src={media.file.url} />}
        </figure>
        <div className={styles.caption}>
          {title && <h4 className={styles.title}>{title}</h4>}
          {description && (
            <div className={styles.description}>
              <p>{description}</p>
            </div>
          )}
        </div>
      </Container>
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
