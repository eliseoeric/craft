import React from 'react'
import htmr from 'htmr'
import cx from 'classnames'
import { graphql } from 'gatsby'
import * as styles from './styles.module.scss'

import { H2 } from '@Components/Typography'
import Divider from '@Components/Divider'
import Container from '@Components/Grid/Container'
import Row from '@Components/Grid/Row'
import Column from '@Components/Grid/Column'

const ContentWithHeadline = ({ className, content, title }) => {
  return (
    <section className={cx(styles.content_with_headline)}>
      <Container className={cx(styles.container)}>
        <Divider />
        <Row justifyContent={'between'}>
          <Column lg={4}>
            <H2 text={htmr(title)} className={cx(styles.h2)} />
          </Column>
          <Column lg={7} className={cx(styles.content, 'remark_content')}>
            {htmr(content.childMarkdownRemark.html)}
          </Column>
        </Row>
      </Container>
    </section>
  )
}

export default ContentWithHeadline

export const query = graphql`
  fragment ContentWithHeadlineModuleQuery on ContentfulModuleContentWithHeadline {
    title
    content {
      childMarkdownRemark {
        html
      }
    }
  }
`
