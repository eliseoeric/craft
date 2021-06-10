import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import Footer from '@Components/Footer'
import Header from '@Components/Header'
import Sidebar from '@Components/Sidebar'

import '../styles/app.scss'
import * as styles from './layout.module.scss'

const CoreLayout = ({ children, className, caseStudy, hasHero }) => {
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
        <div
          className={cx(styles.page_wrapper, {
            [styles.page_wrapper__no_hero]: !hasHero,
          })}
        >
          {children}
        </div>
      </main>
      <Footer />
    </div>
  )
}

CoreLayout.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  caseStudy: PropTypes.bool,
  hasHero: PropTypes.bool,
}

CoreLayout.defaultProps = {
  hasHero: false,
}

export default CoreLayout
