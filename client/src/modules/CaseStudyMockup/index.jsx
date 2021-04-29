import React from 'react'
import { graphql } from 'gatsby'

import Container from '@Components/Grid/Container'
import Row from '@Components/Grid/Row'
import OrbContainer from '@Components/OrbContainer'

import * as styles from './mockup.module.scss'

const CaseStudyMockUp = ({ title, mocks }) => {
  return (
    <section className={styles.showcase_block}>
      <OrbContainer
        originXGetter={() => window.innerWidth / 1.65}
        originYGetter={() => window.innerHeight / 2}
        radiusRange={[150, 175]}
      />
      <Container>
        <Row className={styles.showcase_block__items}>
          {mocks.map((mock) => (
            <div className={styles.showcase_block__item}>
              <figure className={styles.showcase_block__media}>
                <img src={mock?.file?.url} alt="mockup" />
              </figure>
            </div>
          ))}
        </Row>
        <h2 className={styles.showcase_block__title}>{title}</h2>
      </Container>
    </section>
  )
}

export default CaseStudyMockUp

export const query = graphql`
  fragment CaseStudyMockUpModule on ContentfulModuleCaseStudyMockUp {
    title
    mocks {
      file {
        url
        contentType
      }
    }
  }
`
