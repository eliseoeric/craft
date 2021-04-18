import React from 'react'
import { graphql } from 'gatsby'
import cx from 'classnames'

import Button from '@Components/Button'
import Container from '@Components/Grid/Container'
import Row from '@Components/Grid/Row'
import { H2 } from '@Components/Typography'

import * as styles from './callToAction.module.scss'

const CallToAction = ({
  slug,
  headline,
  actionUrl,
  actionText,
  alignment,
  backgroundImage,
}) => {
  const { url } = backgroundImage.file

  const align = alignment[0].toLowerCase()

  return (
    <section className={styles.root} style={{ backgroundImage: `url(${url})` }}>
      <div className={styles.wrapper}>
        <Container>
          <Row className={cx(styles.row, styles[`row__${align}`])}>
            {headline && (
              <div className={styles.headline}>
                <H2 text={headline} />
              </div>
            )}

            {actionText && (
              <div className={styles.action}>
                <Button url={actionUrl} className={styles.button}>
                  {actionText}
                </Button>
              </div>
            )}
          </Row>
        </Container>
      </div>
    </section>
  )
}

export default CallToAction

export const query = graphql`
  fragment CallToActionModule on ContentfulModuleCallToAction {
    slug
    headline
    actionUrl
    actionText
    alignment
    backgroundImage {
      title
      file {
        url
      }
    }
  }
`
