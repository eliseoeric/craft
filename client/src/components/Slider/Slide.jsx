import React from 'react'

import Container from '@Components/Grid/Container'
import * as styles from './styles.module.scss'

const Slide = ({title, description, media}) => {

  return (
    <div className={styles.root}>
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
    </div>
  )
}

export default Slide;