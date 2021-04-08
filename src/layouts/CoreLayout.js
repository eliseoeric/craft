import React from 'react'
import cx from 'classnames'
import Header from '@Components/Header'
import TopBar from '@Components/TopBar'
import Footer from '@Components/Footer'
import ToastProvider from '@Components/ToastProvider'
import '../styles/app.scss'

const CoreLayout = ({ children, className }) => {
  return (
    <div className={cx('core-layout', className)}>
      <TopBar />
      <Header />
      <main>{children}</main>
      <Footer />
      <ToastProvider displayCount={3} placement="bottom-left" />
    </div>
  )
}

export default CoreLayout
