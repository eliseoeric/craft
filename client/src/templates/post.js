import React, { useEffect } from 'react'
import { graphql } from 'gatsby'
import { useSelector, useDispatch } from 'react-redux'

import {
  navigationActions,
  navigationSelectors,
} from '@State/ducks/ui/navigation'
import CoreLayout from '@Layouts/CoreLayout'
import BlogIndexModule from '@Modules/BlogIndex'
import SEO from '@Components/Seo'
import { TEMPLATES } from '@Utils/enums'

/**
 * Render the Blog index via a manual query. Then loads the requested news article
 * by slug into the app drawer
 * @param {*} param0 
 * @returns 
 */
const PostTemplate = ({ data, pageContext }) => {
  const dispatch = useDispatch()
  const drawer = useSelector(navigationSelectors.getDrawer)
  const invertPalette = useSelector(navigationSelectors.isPaletteInverted)

  const renderModules = (modules) => {
    return modules.map((module) => {
      const { __typename } = module
      return <BlogIndexModule key={__typename} />
    })
  }

  /**
   * On boot, open the drawer with the requested post
   */
  useEffect(() => {
    dispatch(
      navigationActions.requestOpenDrawer({
        template: 'post',
        slug: pageContext.slug,
      })
    )
  }, [])

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
        invertPalette={
          invertPalette !== null ? invertPalette : layout.invertPalette
        }
      >
        {layout &&
          layout.contentModules &&
          renderModules(layout.contentModules)}
      </CoreLayout>
    </>
  )
}

export default PostTemplate

export const query = graphql`
  query {
    contentfulPage(slug: { eq: "news" }) {
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
