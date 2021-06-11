import React from 'react'
import { Link } from 'gatsby'
import cx from 'classnames'

import * as styles from './navigationItem.module.scss'

const NavigationItem = ({ title, url, className }) => {
  return (
    <li className={cx(className, styles.root)}>
      <Link className={styles.navigation__anchor} to={url} activeClassName={styles.active}>{title}</Link>
    </li>
  )
}

export default NavigationItem
