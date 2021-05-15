import React from 'react'
import { graphql } from 'gatsby'
import cx from 'classnames'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import Container from '@Components/Grid/Container'
import Row from '@Components/Grid/Row'
import Column from '@Components/Grid/Column'
import Divider from '@Components/Divider'

import * as styles from './styles.module.scss'

const ContentThreeColumns = ({
  title,
  slug,
  columnCenter,
  columnLeft,
  columnRight,
}) => {
  
  return (
    <section className={styles.root}>
      <Container className={cx(styles.container, 'remark-content')}>
        <Divider />
        <Row>
          <Column lg={4}>{documentToReactComponents(JSON.parse(columnLeft.raw))}</Column>
          <Column lg={6}>{documentToReactComponents(JSON.parse(columnCenter.raw))}</Column>
          <Column lg={2}>{documentToReactComponents(JSON.parse(columnRight.raw))}</Column>
        </Row>
      </Container>
    </section>
  )
}

export default ContentThreeColumns

export const query = graphql`
  fragment ContentThreeColumnsModule on ContentfulModuleContentThreeColumns {
    slug
    title
    columnCenter {
      raw
    }
    columnLeft {
      raw
    }
    columnRight {
      raw
    }
  }
`
