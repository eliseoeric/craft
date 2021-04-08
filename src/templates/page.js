import React from 'react'
import { graphql } from 'gatsby'
import cx from 'classnames'

import { useSelector } from 'react-redux'
import { navigationSelectors } from '@State/ducks/ui/navigation'

import CoreLayout from '@Layouts/CoreLayout'
import SEO from '@Components/Seo'
import Module from '@Components/Module'

const PageTemplate = ({ data, pageContext }) => {
  const renderModules = (modules) => {
    return modules.map((module) => {
      const { __typename, ...attributes } = module
      return (
        <Module attributes={attributes} type={__typename} key={__typename} />
      )
    })
  }

  const renderLayout = (layout) => {
    return (
      <CoreLayout className={cx({ 'body--header-fixed': isHeaderFixed })}>
        {layout &&
          layout.contentModules &&
          renderModules(layout.contentModules)}
      </CoreLayout>
    )
  }

  const { title, slug, description, layout } = data?.contentfulPage
  // const logo = data.contentfulSiteConfig?.logo?.file?.url
  const seoDescription = description?.childMarkdownRemark?.rawMarkdownBody

  const isHeaderFixed = useSelector(navigationSelectors.isHeaderFixed)

  return (
    <>
      <SEO
        title={title}
        titleTemplate={`%s - ${title}`}
        // image={`https:${socialShareImage?.file?.url}`}
        description={seoDescription}
      />
      {renderLayout(layout)}
    </>
  )
}

export default PageTemplate

export const query = graphql`
  query($slug: String!) {
    contentfulPage(slug: { eq: $slug }) {
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
          ...CoverSliderModule
          ...FeaturedStepsModule
          ...FeaturedImageSplitModule
          ...CopyRightAlignedModule
          ...HeroCenteredTextModule
          ...CoreValuesModule
          ...LocationMapModule
          ...MembershipPlansModule
          ...ProductGridModule
          ...CallToActionModule
          ...FaQsModule
          ...AccountModule
        }
      }
    }
  }
`
