import React, { useEffect, useRef } from 'react'
import cx from 'classnames'
import { graphql } from 'gatsby'
import { H3 } from '@Components/Typography'
import * as style from './style.module.scss'
import debounce from 'lodash/debounce'

const Accordion = ({ accordion, className, isOpen, setIsOpen }) => {
  const accordionRef = useRef(null)

  useEffect(() => {
    const toggleStylesOnResize = () => {
      debounce(() => {
        toggleStyles(accordionRef, isOpen)
      }, 250)()
    }

    accordionRef.current.style.transition = 'padding-bottom 0.25s ease-in-out'
    toggleStyles(accordionRef, isOpen)
    window.addEventListener('resize', toggleStylesOnResize)

    return () => {
      window.removeEventListener('resize', toggleStylesOnResize)
    }
  }, [accordionRef, isOpen])

  const toggleStyles = (accordionRef, isOpen) => {
    if (isOpen) {
      const contentHeight = accordionRef.current.lastChild.offsetHeight
      accordionRef.current.style.paddingBottom = `${contentHeight}px`
      // accordionRef.current.style.marginBottom = `0`
    } else {
      accordionRef.current.style.paddingBottom = `0`
      accordionRef.current.style.marginBottom = `-1px`
    }
  }

  return (
    <div className={cx(className, style.accordion)} ref={accordionRef}>
      <div className={cx(style.border_top)} />
      <button
        className={cx(style.accordionButton)}
        onClick={() => setIsOpen(accordion.title)}
      >
        <H3 className={cx(style.accordionHeading)} text={accordion.title} />
      </button>
      <div
        className={cx(
          style.gradient,
          { [style.open]: isOpen },
          { [style.close]: !isOpen }
        )}
      />
      <div
        className={cx(
          style.accordionContent,
          { [style.open]: isOpen },
          { [style.close]: !isOpen }
        )}
      >
        <p>{accordion.content.content}</p>
      </div>
    </div>
  )
}

export default Accordion

export const query = graphql`
  fragment AccordionQuery on ContentfulComponentAccordion {
    content {
      content
    }
    title
  }
`
