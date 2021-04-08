import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import * as styles from './icons.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SocialIcons = ({}) => {
  const links = [
    {  url: 'https://twitter.com', type: 'twitter' },
    {  url: 'https://linkedin.com', type: 'linkedin' },
    {  url: 'https://facebook.com', type: 'facebook' },
    {  url: 'https://instgram.com', type: 'instagram' },
    { url: 'https://youtube.com', type: 'youtube' },
  ]

  return (
    <div className={styles.root}>
      {links.map(({url, icon: Icon, type}, index) => (
        <a key={index} href={url} className={cx('icon', styles.icon)}><FontAwesomeIcon icon={['fab', type]} /></a>
      ))}
    </div>
  )
}

export default SocialIcons
