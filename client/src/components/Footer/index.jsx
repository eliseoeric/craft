import React from 'react'
import cx from 'classnames'
import Container from '@Components/Grid/Container'
import Row from '@Components/Grid/Row'
import Logo from '@Components/Logo'
import Clock from '@Components/Clock'
// import WidgetSubscribe from '@Components/Widget/Subscribe'
// import WidgetMap from '@Components/Widget/Map'
import SocialIcons from '@Components/SocialIcons'
import * as footer from './footer.module.scss'

const Footer = ({ className }) => {
  

  return (
    <footer className={cx(className, footer.site__footer)}>

      <div className={cx(footer.footer__logo_wrap)}>
        <Logo variant={'gray'} title={'Craft'} />
      </div>

      <div className={cx(footer.footer__clock_wrap)}>
        <Clock location="Philly" />
      </div>


      <Container>
        <Row>
          
        </Row>

        <Row justifyContent={'between'}>
          <div className={footer.footer__nav}>
            <SocialIcons />
          </div>
        </Row>

      </Container>
    </footer>
  )
}

export default Footer
