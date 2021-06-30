import React from 'react'
import { graphql } from 'gatsby'
import cx from 'classnames'
import { useSelector, useDispatch } from 'react-redux'
import uuid from 'uuid'

import CoreLayout from '@Layouts/CoreLayout'
import SEO from '@Components/Seo'
import Module from '@Components/Module'
import BlogIndexModule from '@Modules/BlogIndex'
import { TEMPLATES } from '../utils/enums'
import Banner from '@Components/Banner'
import {
  navigationActions,
  navigationSelectors,
} from '@State/ducks/ui/navigation'

const PageTemplate = ({ data, pageContext }) => {
  const drawer = useSelector(navigationSelectors.getDrawer)
  const invertPalette = useSelector(navigationSelectors.isPaletteInverted)

  const renderModules = (modules) => {
    return modules.map((module) => {
      const { __typename, ...attributes } = module
      if (__typename === 'ContentfulModuleBlogIndex') {
        return <BlogIndexModule key={__typename} />
      }
      return (
        <Module attributes={attributes} type={__typename} key={uuid.v4()} />
      )
    })
  }

  const { title, slug, description, layout } = data?.contentfulPage
  // const logo = data.contentfulSiteConfig?.logo?.file?.url
  const seoDescription = description?.childMarkdownRemark?.rawMarkdownBody

  return (
    <>
      <SEO
        title={title}
        titleTemplate={`%s - ${title}`}
        // image={`https:${socialShareImage?.file?.url}`}
        description={seoDescription}
      />
      <CoreLayout
        hasHero={layout.hasHero}
        drawerOpen={drawer.isOpen}
        templateSlug={TEMPLATES[layout.template]}
        invertPalette={invertPalette !== null ? invertPalette : layout.invertPalette}
      >
        {layout &&
          layout.contentModules &&
          renderModules(layout.contentModules)}
        {layout?.frontmatter?.banner_text && (
          <Banner text={layout?.frontmatter?.banner_text} />
        )}
      </CoreLayout>
    </>
  )
}

export default PageTemplate

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
      layout {
        template
        hasHero
        invertPalette
        frontmatter {
          banner_text
        }
        contentModules {
          __typename
          ...SelectedWorksModule
          ...HeroModule
          ...TeamMembersModule
          ...ContentWithHeadlineModuleQuery
          ...AccordionGroupQuery
          ...ImageGroupModule
          ...OpenRoles
        }
      }
    }
  }
`
