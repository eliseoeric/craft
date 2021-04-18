import React from 'react'
import cx from 'classnames'

// import Footer from '@Components/Footer'
import Sidebar from '@Components/Sidebar'

import '../styles/app.scss'
import * as styles from './layout.module.scss'

const CoreLayout = ({ children, className }) => {
  return (
    <div className={cx('core-layout', className, styles.case_study_wrapper)}>
      <Sidebar />
      <main>{children}</main>
      {/* <Footer /> */}
    </div>
  )
}

export default CoreLayout
