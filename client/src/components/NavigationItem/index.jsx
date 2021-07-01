import React from 'react'
import { Link } from 'gatsby'
import cx from 'classnames'

import * as styles from './navigationItem.module.scss'

const NavigationItem = ({ title, url, className, invertPalette, onClickEvent }) => {
  return (
    <li className={cx(className, styles.root)}>
      <Link
        className={cx(styles.navigation__anchor, {
          [styles.navigation__anchor__inverse]: invertPalette,
        })}
        to={url}
        onClick={onClickEvent}
        activeClassName={styles.active}
      >
        {title}
      </Link>
    </li>
  )
}

export default NavigationItem
