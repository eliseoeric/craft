import React from 'react'
import cx from 'classnames'

import * as styles from './sidebar.module.scss'

const Sidebar = ({className}) => {
  return (
    <section className={cx(styles.root, className)}>
    </section>
  )
}

export default Sidebar;