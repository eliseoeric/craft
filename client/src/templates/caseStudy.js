import React, { Fragment } from 'react'
import { graphql } from 'gatsby'
import cx from 'classnames'

import CoreLayout from '@Layouts/CoreLayout'
import SEO from '@Components/Seo'
import Module from '@Components/Module'
import Header from '@Components/CaseStudy/Header'
import CloseButton from '@Components/CloseButton'
import { TEMPLATES } from '../utils/enums'

import useToggle from '@Hooks/useToggle'
import * as styles from './styles.module.scss'

import Container from '@Components/Grid/Container'

const CaseStudyTemplate = ({ data, pageContext }) => {
  const { title, slug, description, layout } = data?.contentfulTypeCaseStudy
  // const logo = data.contentfulSiteConfig?.logo?.file?.url
  const seoDescription = description?.childrenMarkdownRemark[0].rawMarkdownBody

  const [open, toggleOpen] = useToggle(true)

  const renderModules = (modules) => {
    return modules.map((module) => {
      const { __typename, ...attributes } = module
      return (
        <Module attributes={attributes} type={__typename} key={__typename} />
      )
    })
  }

  return (
    <Fragment>
      <SEO
        title={title}
        titleTemplate={`%s - ${title}`}
        // image={`https:${socialShareImage?.file?.url}`}
        description={seoDescription}
      />
      <CoreLayout caseStudy templateSlug={TEMPLATES[layout.template]}>
        <div
          className={cx(styles.slide_in_left_full, styles.case_study, {
            [styles.slide_out_right_full]: !open,
          })}
        >
          <CloseButton onClick={toggleOpen} />

          <Header title={title} byline={seoDescription} />
          {layout &&
            layout.contentModules &&
            renderModules(layout.contentModules)}
        </div>
      </CoreLayout>
    </Fragment>
  )
}

export default CaseStudyTemplate

export const query = graphql`
  query($slug: String!) {
    contentfulTypeCaseStudy(slug: { eq: $slug }) {
      title
      slug
      description {
        childrenMarkdownRemark {
          rawMarkdownBody
        }
      }
      layout {
        template
        contentModules {
          __typename
          ...SingleMediaModule
          ...CaseStudyMockUpModule
          ...TestimonyModule
          ...ContentThreeColumnsModule
          ...IconShowcaseModule
          ...ColorPaletteModule
          ...CarouselModule
          ...StatisticModule
          ...ContentWithHeadlineModuleQuery
        }
      }
    }
  }
`
