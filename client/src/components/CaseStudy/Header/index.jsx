import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import Container from '@Components/Grid/Container'
import BackgroundGradient from '@Components/BackgroundGradient'
import { SectionTitle, H3 } from '@Components/Typography'

import * as styles from './styles.module.scss'

const Header = ({ title, byline }) => {
  return (
    <section className={styles.root}>
      <BackgroundGradient />
      <Container>
        <SectionTitle text={title} className={styles.block_title} />
        <H3 text={byline} className={styles.block_subtitle} />
      </Container>
    </section>
  )
}

export default Header
