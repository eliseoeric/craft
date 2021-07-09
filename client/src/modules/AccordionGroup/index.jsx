import React, { useEffect, useRef, useState } from 'react'
import cx from 'classnames'
import { graphql } from 'gatsby'
import { H2 } from '@Components/Typography'
import * as style from './style.module.scss'
import Accordion from '@Components/Accordion'
import OrbContainer from '@Components/OrbContainer'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

const AccordionGroup = ({ accordions, className, title }) => {

  const [openAccordion, setOpenAccordion] = useState(accordions?.length > 0 ? accordions[0] : null)
  const [accordionImage, setAccordionImage] = useState(accordions?.length > 0 ? accordions[0].image : null)

  useEffect(() => {
    if(openAccordion?.image?.gatsbyImageData) {
      setAccordionImage(getImage(openAccordion.image.gatsbyImageData))
    }
    else {
      setAccordionImage(null)
    }
  }, [openAccordion])

  const containerRef = useRef()

  const renderAccordions = (accordions) => {
    return accordions.map((a, idx) => {
      return (
        <Accordion
          accordion={a}
          key={a.title}
          isOpen={openAccordion.title === a.title}
          setIsOpen={(accordionTitle) => {
            setOpenAccordion(accordionTitle)
          }}
        />
      )
    })
  }

  return (
    <section className={cx(className, style.root)}>
      <div className={style.container}>
        <div className={cx(style.col, style.colLeft)} ref={containerRef}>

          <H2 text={title} className={style.title} />

          <div className={cx(style.accordionImage)}>
            {accordionImage && <GatsbyImage image={accordionImage} alt="icon" />}
          </div>

        </div>
        <div className={cx(style.col, style.colRight)}>
          {renderAccordions(accordions)}
        </div>
      </div>
      <OrbContainer
        className={style.orb_container}
        originXGetter={() => {
          if (containerRef.current) {
            return containerRef.current.offsetWidth + window.innerWidth / 4
          } else {
            return undefined
          }
        }}
        originYGetter={() => 100}
        radiusRange={[400, 450]}
      />
    </section>
  )
}

export default AccordionGroup

export const query = graphql`
  fragment AccordionGroupQuery on ContentfulModuleAccordionGroup {
    accordions {
      ...AccordionQuery
    }
    title
  }
`
