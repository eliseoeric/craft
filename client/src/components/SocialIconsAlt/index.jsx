import React from 'react'
import cx from 'classnames'

import DribbbleIcon from '@SVGs/social-dribbble.svg'
import InstagramIcon from '@SVGs/social-instagram.svg'
import LinkedInIcon from '@SVGs/social-linkedin.svg'
import MediumIcon from '@SVGs/social-medium.svg'

import * as styles from './icons.module.scss'

const SocialIconsAlt = ({
  className,
  dribbleUrl,
  instagramUrl,
  linkedInUrl,
  mediumUrl,
}) => (
  <div className={cx(styles.root, className)}>
    {dribbleUrl && (
      <a href={dribbleUrl} target="blank">
        <DribbbleIcon className={cx(styles.icon)} />
      </a>
    )}
    {instagramUrl && (
      <a href={instagramUrl} target="blank">
        <InstagramIcon className={cx(styles.icon)} />
      </a>
    )}
    {linkedInUrl && (
      <a href={linkedInUrl} target="blank">
        <LinkedInIcon className={cx(styles.icon)} />
      </a>
    )}
    {mediumUrl && (
      <a href={mediumUrl} target="blank">
        <MediumIcon className={cx(styles.icon)} />
      </a>
    )}
  </div>
)

export default SocialIconsAlt
