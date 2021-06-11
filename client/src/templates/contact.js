import React from 'react'
import { graphql } from 'gatsby'
import cx from 'classnames'

import CoreLayout from '@Layouts/CoreLayout'
import SEO from '@Components/Seo'
import Module from '@Components/Module'
import ContactBlock from '@Components/ContactBlock'
import { TEMPLATES } from '../utils/enums'

const ContactTemplate = ({ data, pageContext }) => {
  console.log('hello from contact')
  const renderModules = (modules) => {
    return modules.map((module) => {
      const { __typename, ...attributes } = module
      return (
        <Module attributes={attributes} type={__typename} key={__typename} />
      )
    })
  }

  const { title, slug, description, layout, featuredImage } =
    data?.contentfulPage
  const { page_links, addresses } = layout.frontmatter
  // const logo = data.contentfulSiteConfig?.logo?.file?.url
  const seoDescription = description?.childMarkdownRemark?.rawMarkdownBody

  console.log()

  return (
    <>
      <SEO
        title={title}
        titleTemplate={`%s - ${title}`}
        // image={featuredImage.gatsbyImageData.images}
        description={seoDescription}
      />
      <CoreLayout templateSlug={TEMPLATES[layout.template]}>
        {layout &&
          layout.contentModules &&
          renderModules(layout.contentModules)}
        <ContactBlock
          links={page_links}
          featuredImage={featuredImage}
          addresses={addresses}
        />
      </CoreLayout>
    </>
  )
}

export default ContactTemplate

export const query = graphql`
  query ($slug: String!) {
    contentfulPage(slug: { eq: $slug }) {
      title
      slug
      description {
        childrenMarkdownRemark {
          rawMarkdownBody
        }
      }
      featuredImage {
        gatsbyImageData(aspectRatio: 1.65)
      }
      layout {
        template
        frontmatter {
          addresses {
            title
            address
            city
            state
            zip
          }
          page_links {
            url
            title
          }
        }
        contentModules {
          __typename
          ...SelectedWorksModule
          ...HeroModule
          ...TeamMembersModule
          ...ContentWithHeadlineModuleQuery
          ...ImageGroupModule
          ...OpenRoles
        }
      }
    }
  }
`
