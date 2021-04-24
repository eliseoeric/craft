import React, { Fragment } from 'react'
import { graphql } from 'gatsby'
import cx from 'classnames'

import CoreLayout from '@Layouts/CoreLayout'
import SEO from '@Components/Seo'
import Module from '@Components/Module'
import Header from '@Components/CaseStudy/Header'

const PageTemplate = ({ data, pageContext }) => {
  const { title, slug, description, layout } = data?.contentfulCaseStudy
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

  return (
    <Fragment>
      <SEO
        title={title}
        titleTemplate={`%s - ${title}`}
        // image={`https:${socialShareImage?.file?.url}`}
        description={seoDescription}
      />
      <CoreLayout>
        <Header title={title} byline={seoDescription} />
        {layout &&
          layout.contentModules &&
          renderModules(layout.contentModules)}
      </CoreLayout>
    </Fragment>
  )
}

export default PageTemplate

export const query = graphql`
  query($slug: String!) {
    contentfulCaseStudy(slug: { eq: $slug }) {
      title
      slug
      description {
        childrenMarkdownRemark {
          rawMarkdownBody
        }
      }
      layout {
        contentModules {
          __typename
          ...SingleMediaModule
        }
      }
    }
  }
`
