import React, { Fragment, useEffect } from 'react'
import { graphql } from 'gatsby'
import cx from 'classnames'
import { useSelector, useDispatch } from 'react-redux'

import CoreLayout from '@Layouts/CoreLayout'
import SEO from '@Components/Seo'
import Module from '@Components/Module'
import Header from '@Components/CaseStudy/Header'
import {
  navigationActions,
} from '@State/ducks/ui/navigation'
import { TEMPLATES } from '../utils/enums'
import Drawer from '@Components/Drawer'
import * as styles from './styles.module.scss'

const CaseStudyTemplate = ({ data, pageContext }) => {
  const dispatch = useDispatch()
  const { title, slug, description, layout } = data?.contentfulTypeCaseStudy
  // const logo = data.contentfulSiteConfig?.logo?.file?.url
  const seoDescription = description?.childrenMarkdownRemark[0].rawMarkdownBody

  const renderModules = (modules) => {
    return modules.map((module) => {
      const { __typename, ...attributes } = module
      return (
        <Module attributes={attributes} type={__typename} key={__typename} />
      )
    })
  }

  /**
   * On boot, open the drawer
   */
  useEffect(() => {
    dispatch(
      navigationActions.requestOpenDrawer({
        template: 'case-study',
        slug: slug,
      })
    )
  }, [])

  return (
    <Fragment>
      <SEO
        title={title}
        titleTemplate={`%s - ${title}`}
        // image={`https:${socialShareImage?.file?.url}`}
        description={seoDescription}
      />
      <CoreLayout drawerOpen templateSlug={TEMPLATES['Case Study']}>
        <Drawer className={styles.case_study}>
          <Header title={title} byline={seoDescription} />
          {layout &&
            layout.contentModules &&
            renderModules(layout.contentModules)}
        </Drawer>
      </CoreLayout>
    </Fragment>
  )
}

export default CaseStudyTemplate

export const query = graphql`
  query ($slug: String!) {
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
