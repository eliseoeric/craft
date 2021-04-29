import React from 'react'
import { graphql } from 'gatsby'

import Container from '@Components/Grid/Container'
import Row from '@Components/Grid/Row'

import OrbImage from '@Images/gradient-orb-03.png'
import QuoteImage from '@Images/icon-quote.png'

import * as styles from './testimony.module.scss'

const Testimony = ({ citation, testimony }) => {
  return (
    <section className={styles.quote_block}>
      <Container>
        <Row>
          <div className={styles.quote_block__icon}>
            <img src={QuoteImage} alt="icon quote" />
            <div className={styles.quote_block__background_orb}>
              <img src={OrbImage} alt="bg orb" />
            </div>
          </div>
          <blockquote className={styles.quote_block__blockquote}>
            <p>{testimony}</p>
            <cite>– {citation}</cite>
          </blockquote>
        </Row>
      </Container>
    </section>
  )
}

export default Testimony

export const query = graphql`
  fragment TestimonyModule on ContentfulModuleTestimony {
    slug
    testimony
    citation
  }
`
