import cx from 'classnames'
import { graphql } from 'gatsby'
import debounce from 'lodash/debounce'
import { H3 } from '@Components/Typography'
import * as style from './style.module.scss'
import React, { useEffect, useRef } from 'react'

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
    }
  }

  return (
    <div className={cx(className, style.accordion)} ref={accordionRef}>
      <button
        className={cx(style.accordionButton)}
        onClick={() => setIsOpen(accordion)}
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
      <div className={cx(style.accordionContentWrap)}>
        <div
          className={cx(
            style.accordionContent,
            { [style.open]: isOpen },
            { [style.close]: !isOpen }
          )}
        >
          <p>{accordion.content.content}</p>
        </div>
        <div className={cx(style.bottomBorderLine)} />
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
    image {
      gatsbyImageData
    }
    title
  }
`
