import React from 'react'
import cx from 'classnames'

import Logo from '@Components/Logo'
import Clock from '@Components/Clock'
import SocialIcons from '@Components/SocialIcons'
import * as footer from './footer.module.scss'

const Footer = ({ className }) => {
  

  return (
    <footer className={cx(className, footer.site__footer)}>

      <div className={cx(footer.footer__logo_wrap)}>
        <Logo variant={'gray'} title={'Craft'} />
      </div>

      <div className={cx(footer.footer__content_wrap)}>
        <div className={cx(footer.footer__clock_wrap)}>
          <Clock 
            className={cx(footer.footer__clock, footer.footer__upper)}
            locationLabel="Philly"
            timeZone="America/New_York" />
          <Clock
            className={cx(footer.footer__clock, footer.footer__upper)}
            locationLabel="Boston"
            timeZone="America/New_York" />
          <Clock 
            className={cx(footer.footer__clock, footer.footer__upper)}
            locationLabel="Portland"
            timeZone="America/Los_Angeles" />
          <Clock
            className={cx(footer.footer__clock, footer.footer__upper)}
            locationLabel="Toronto"
            timeZone="America/Toronto" />
          <Clock
            className={cx(footer.footer__clock, footer.footer__upper)}
            locationLabel="Madison"
            timeZone="America/Chicago" />
        </div>
        <div className={cx(footer.footer__info)}>
          <div className={cx(footer.footer__text, footer.contact)}>
            <p className={cx(footer.footer__upper)}>Find Us</p>
            <p><a href="mailto:hello@madebycraft.co">hello@madebycraft.co</a></p>
            <p><a href="tel:2158888888">215.888.8888</a></p>
          </div>
          <SocialIcons className="socialIcons" /> 
        </div>
      </div>
    </footer>
  )
}

export default Footer
