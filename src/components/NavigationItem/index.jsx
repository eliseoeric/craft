import React from 'react'
import { Link } from 'gatsby'
import cx from 'classnames'

import * as navItem from './navigationItem.module.scss'

const NavigationItem = ({ title, url, className }) => {
  return (
    <li className={cx(className, navItem.root)}>
      <Link to={url}>{title}</Link>
    </li>
  )
}

export default NavigationItem
