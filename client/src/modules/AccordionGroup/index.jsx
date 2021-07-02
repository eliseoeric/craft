import React, { useRef, useState } from 'react'
import cx from 'classnames'
import { graphql } from 'gatsby'
import { H2 } from '@Components/Typography'
import * as style from './style.module.scss'
import Accordion from '@Components/Accordion'
import OrbContainer from '@Components/OrbContainer'

const AccordionGroup = ({ accordions, className, title }) => {
  const [accordionsTouched, setAccordionsTouched] = useState(false)
  const [openAccordion, setOpenAccordion] = useState('')

  const containerRef = useRef()

  const renderAccordions = (accordions) => {
    return accordions.map((a, idx) => {
      return (
        <Accordion
          accordion={a}
          key={a.title}
          isOpen={
            (!accordionsTouched && idx === 0) || openAccordion === a.title
          }
          setIsOpen={(accordionTitle) => {
            setAccordionsTouched(true)
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
          <div className={cx(style.circles)}>
            <div className={cx(style.circleGroup)}>
              <div className={cx(style.circle)} />
              <div className={cx(style.circle)} />
            </div>
            <div className={cx(style.circleGroup)}>
              <div className={cx(style.circle)} />
              <div className={cx(style.circle)} />
            </div>
          </div>
        </div>
        <div className={cx(style.col, style.colRight)}>
          {renderAccordions(accordions)}
        </div>
      </div>
      <OrbContainer
        className={style.orb_container}
        originXGetter={() =>
          containerRef?.current ?? containerRef.current.offsetWidth + window.innerWidth / 4
        }
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
