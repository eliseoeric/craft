import React, { useState } from 'react'
import { graphql } from 'gatsby'
import cx from 'classnames'
import ScrollTrigger from 'react-scroll-trigger'

import Container from '@Components/Grid/Container'
import IconBlock from './IconBlock'
import TypeBlock from './TypeBlock'

import useWindowSize from '@Hooks/useWindowSize'
import * as styles from './iconShowcase.module.scss'

const maxOffset = 24

const IconShowcase = ({ title, category, iconBox, typeVariant }) => {
  const [visible, setVisible] = useState(false)
  const [offset, setOffset] = useState(maxOffset)
  const { width } = useWindowSize()

  const Block = typeVariant ? TypeBlock : IconBlock
  const blockSize = typeVariant ? 'large' : 'small'

  const handleScrollProgress = ({ progress }) => {
    const newOffset = maxOffset - 0.9 * progress * maxOffset
    setOffset(Math.min(Math.round(newOffset), maxOffset))
  }

  return (
    <section className={styles.floating_cards}>
      <Container className={styles.container}>
        <ScrollTrigger
          onEnter={() => setVisible(true)}
          onProgress={handleScrollProgress}
        />
        <p
          className={cx(
            styles.floating_cards__lead_text,
            styles.scroll_reveal,
            {
              [styles.fade_in_bottom]: visible,
            }
          )}
        >
          {category}
        </p>
        <h2
          className={cx(styles.floating_cards__title, styles.scroll_reveal, {
            [styles.fade_in_bottom]: visible,
          })}
        >
          {title}
        </h2>
        <div
          className={cx(
            styles.floating_cards___items,
            styles[`floating_cards___items__${blockSize}`],
            styles.scroll_reveal,
            { [styles.fade_in_bottom]: visible }
          )}
        >
          {iconBox.map((block, i) => {
            // default
            let paddingTop = offset * (i % 3)

            // type block && phone
            if (typeVariant && width <= 767) {
              paddingTop = offset * (i % 2) * 6
            }

            return (
              <div
                className={cx(styles.floating_cards__item)}
                style={{ paddingTop }}
              >
                <Block key={block.id} {...block} />
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

export default IconShowcase

export const query = graphql`
  fragment IconShowcaseModule on ContentfulModuleIconShowcase {
    slug
    title
    typeVariant
    category
    iconBox {
      id
      iconName
      icon {
        file {
          url
        }
      }
    }
  }
`
