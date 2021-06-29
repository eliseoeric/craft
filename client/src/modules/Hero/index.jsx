import React from 'react'
import PropTypes from 'prop-types'
import htmr from 'htmr'
import { graphql } from 'gatsby'
import cx from 'classnames'

import OrbContainer from '@Components/OrbContainer'
import Container from '@Components/Grid/Container'

import * as styles from './hero.module.scss'

const HeroModule = ({
  slug,
  headline,
  mobileHeadline,
  backgroundImage,
  displayOrb,
  body,
}) => {
  const renderMobileHeadline = (mobileHeadline, headline) => {
    const _headline = mobileHeadline ?? headline
    return <h1 className={styles.hero_block__mobile_title}>{htmr(_headline)}</h1>
  }

  const renderOrb = () => {
    if (displayOrb) {
      return (
        <OrbContainer
          className={styles.hero_block__orb_container}
          originXGetter={() => window.innerWidth / 15}
          originYGetter={() => window.innerHeight / 5}
          radiusRange={[250, 275]}
        />
      )
    }

    return null
  }

  const _slug = slug.replace('-', '_')

  const style = backgroundImage?.file?.url
    ? { backgroundImage: `url(${backgroundImage.file.url})` }
    : {}

  return (
    <section
      className={cx(styles.hero_block, styles[`hero_block__${_slug}`])}
      style={style}
    >
      {renderOrb()}
      <Container className={styles.hero_block__container}>
        {renderMobileHeadline(mobileHeadline, headline)}
        <h2 className={styles.hero_block__title}>{htmr(headline)}</h2>
        {body && <p className={styles.hero_block__description}>{htmr(body)}</p>}
      </Container>
    </section>
  )
}

HeroModule.propTypes = {
  slug: PropTypes.string,
  headline: PropTypes.string,
  mobileHeadline: PropTypes.string,
  body: PropTypes.string,
  backgroundImage: PropTypes.shape({
    file: PropTypes.shape({
      url: PropTypes.string,
    }),
  }),
  displayOrb: PropTypes.bool,
}

HeroModule.defaultProps = {
  displayOrb: false,
}

export default HeroModule

export const query = graphql`
  fragment HeroModule on ContentfulModuleHero {
    headline
    slug
    mobileHeadline
    displayOrb
    body
    backgroundImage {
      file {
        url
      }
    }
  }
`
