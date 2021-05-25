import React from 'react'
import cx from 'classnames'

import Footer from '@Components/Footer'
import Header from '@Components/Header'
import Sidebar from '@Components/Sidebar'

import '../styles/app.scss'
import * as styles from './layout.module.scss'

const CoreLayout = ({ children, className, caseStudy, renderBelowModules }) => {
  return (
    <div
      className={cx('core-layout', className, {
        [styles.case_study_wrapper]: caseStudy,
      })}
    >
      {caseStudy ? <Sidebar /> : <Header />}
      <main
        className={cx(styles.content_wrapper, {
          [styles.content_wrapper__flair]: !caseStudy,
        })}
      >
        {children}
        {renderBelowModules && renderBelowModules()}
      </main>
      <Footer />
    </div>
  )
}

export default CoreLayout
