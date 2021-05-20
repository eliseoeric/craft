import React, { useState } from 'react'
import { graphql } from 'gatsby'
import cx from 'classnames'

import Container from '@Components/Grid/Container'

import * as styles from './works.module.scss'

const SelectedWorks = ({ caseStudies, title }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const handleMouseHover = (event, index) => {
    event.stopPropagation() // dont fire handleMouseLeave
    setHoveredIndex(index)
  }

  const handleMouseLeave = () => {
    setHoveredIndex(null)
  }

  return (
    <section onMouseOver={handleMouseLeave} className={styles.work_block}>
      <Container className={styles.container}>
        <h2 className={styles.work_block__vcenter}>{title}</h2>
        <ul className={styles.work_block__list}>
          {caseStudies.map((study, index) => (
            <li
              key={study.slug}
              className={cx(styles.work_block__list_item, {
                [styles.fade]: hoveredIndex !== null && index !== hoveredIndex,
              })}
            >
              <a
                href={`/case-studies/${study.slug}`}
                onMouseOver={(event) => handleMouseHover(event, index)}
              >
                {study.title}
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}

export default SelectedWorks

export const query = graphql`
  fragment SelectedWorksModule on ContentfulModuleSelectedWorks {
    slug
    title
    caseStudies {
      slug
      title
      description {
        childrenMarkdownRemark {
          rawMarkdownBody
        }
      }
    }
  }
`
