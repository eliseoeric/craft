import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import Container from '@Components/Grid/Container'
import OrbContainer from '@Components/OrbContainer'
import { SectionTitle, H3 } from '@Components/Typography'

import * as styles from './styles.module.scss'

const Header = ({ title, byline, orbColor1, orbColor2 }) => {
  console.log({orbColor1})
  return (
    <section className={styles.root}>
      <OrbContainer orbColor1={orbColor1} orbColor2={orbColor2} />
      <Container>
        <SectionTitle text={title} />
        <H3 text={byline} className={styles.block_subtitle} />
      </Container>
    </section>
  )
}

export default Header
