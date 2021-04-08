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
  const data = useStaticQuery(graphql`
    query footerNavigation {
      allContentfulNavigationMenu(
        filter: { slug: { in: ["footer-1", "footer-2"] } }
      ) {
        edges {
          node {
            slug
            id
            title
            navigationMenuItems {
              canonicalUrl
              slug
              title
            }
          }
        }
      }
    }
  `)

  const columns = data.allContentfulNavigationMenu.edges.map((item) => {
    // flatten the data a bit
    return {
      ...item.node,
    }
  })

  return (
    <footer className={cx(className, footer.site__footer)}>
      <Container>
        <Row>
          <Logo variant={'footer'} title={'Kitch Meals'} />
        </Row>

        <Row justifyContent={'between'}>
          <div className={footer.footer__nav}>
            {columns &&
              columns.map(({ title, slug, navigationMenuItems: items }) => {
                return (
                  <Widget title={title} key={slug}>
                    <WidgetList links={items} />
                  </Widget>
                )
              })}
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
