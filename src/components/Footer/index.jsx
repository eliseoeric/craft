import React from 'react'
import PropTypes from 'prop-types'
import { graphql, useStaticQuery } from 'gatsby'
import cx from 'classnames'
import Container from '@Components/Grid/Container'
import Row from '@Components/Grid/Row'
import Logo from '@Components/Logo'
import Widget from '@Components/Widget'
import WidgetList from '@Components/Widget/List'
import WidgetSubscribe from '@Components/Widget/Subscribe'
import WidgetMap from '@Components/Widget/Map'
import SocialIcons from '@Components/SocialIcons'
import * as footer from './footer.module.scss'

const Footer = ({ className }) => {
  

  return (
    <footer className={cx(className, footer.site__footer)}>
      <Container>
        <Row>
          <Logo variant={'footer'} title={'Kitch Meals'} />
        </Row>

        <Row justifyContent={'between'}>
          <div className={footer.footer__nav}>
            
            <Widget title={'Stay Updated'} wide>
              <WidgetSubscribe />
            </Widget>
            <SocialIcons />
          </div>

          <Widget className={footer.store_map}>
            <WidgetMap />
          </Widget>
        </Row>

        <Row>
          <p className={footer.copyright}>
            &copy; Copyright {new Date().getFullYear()} Kitch
          </p>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
