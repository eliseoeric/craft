import React from 'react'
import { graphql } from 'gatsby'
import uuid from 'uuid'
import cx from 'classnames'

import Container from '@Components/Grid/Container'
import Row from '@Components/Grid/Row'
import { H2 } from '@Components/Typography'
import Divider from '@Components/Divider'

import * as styles from './style.module.scss'

const Statistics = ({ slug, title, statistics }) => {
  return (
    <section className={styles.root} id={slug}>
      <Container>
        <Divider />
        <Row>
          <H2 text={title} className={styles.title} />
          <div className={cx(styles.items_wrapper)}>
            {statistics &&
              statistics.map((statistic) => (
                <div
                  className={cx(styles.item, styles.fade_in_bottom_delay)}
                  key={uuid.v4()}
                >
                  <span className={styles.value}>{statistic.value}</span>
                  <p className={styles.description}>{statistic.title}</p>
                </div>
              ))}
          </div>
        </Row>
      </Container>
    </section>
  )
}

export default Statistics

export const query = graphql`
  fragment StatisticModule on ContentfulModuleStats {
    slug
    title
    statistics {
      title
      value
    }
  }
`
