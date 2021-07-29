import React from 'react'
import cx from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import * as styles from './icons.module.scss'

const SocialIconsAlt = ({
  className,
  dribbleUrl,
  instagramUrl,
  linkedInUrl,
  mediumUrl,
  spotifyUrl,
}) => (
  <div className={cx(styles.root, className)}>
    {dribbleUrl && (
      <a href={dribbleUrl} target="blank">
        <FontAwesomeIcon icon={['fab', 'dribbble']} />
      </a>
    )}
    {instagramUrl && (
      <a href={instagramUrl} target="blank">
        <FontAwesomeIcon icon={['fab', 'instagram']} />
      </a>
    )}
    {linkedInUrl && (
      <a href={linkedInUrl} target="blank">
        <FontAwesomeIcon icon={['fab', 'linkedin']} />
      </a>
    )}
    {mediumUrl && (
      <a href={mediumUrl} target="blank">
        <FontAwesomeIcon icon={['fab', 'medium-m']} />
      </a>
    )}
    {spotifyUrl && (
      <a href={spotifyUrl} target="blank">
        <FontAwesomeIcon icon={['fab', 'spotify']} />
      </a>
    )}
  </div>
)

export default SocialIconsAlt
