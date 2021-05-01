import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'

import Container from '@Components/Grid/Container'
import * as styles from './styles.module.scss'

const Slide = ({ title, description, media, contained }) => {
  return (
    <Container className={cx(styles.root, { [styles.contained]: !contained })}>
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
  )
}

Slide.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  media: PropTypes.object,
  contained: PropTypes.bool
}

Slide.defaultProps = {
  contained: true,
}

export default Slide
