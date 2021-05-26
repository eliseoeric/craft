import React from 'react'
import cx from 'classnames'

import Logo from '@Components/Logo'

import * as styles from './sidebar.module.scss'

const Sidebar = ({className}) => {
  // todo on smaller screens, change the logo variant
  return (
    <section className={styles.root}>
      <Logo variant={'caseStudy'} />
    </section>
  )
}

export default Sidebar;