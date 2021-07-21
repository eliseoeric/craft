import React, { useEffect } from 'react'
import { graphql } from 'gatsby'
import { useSelector, useDispatch } from 'react-redux'
import uuid from 'uuid'

import {
  navigationActions,
  navigationSelectors,
} from '@State/ducks/ui/navigation'
import CoreLayout from '@Layouts/CoreLayout'
import Module from '@Components/Module'
import SEO from '@Components/Seo'
import { TEMPLATES } from '@Utils/enums'

/**
 * Render the Careers page via a manual query, then loads the requested role by
 * slug into the app drawer
 * @param {*} param0 
 * @returns 
 */
const RoleTemplate = ({ data, pageContext }) => {
  const dispatch = useDispatch()
  const drawer = useSelector(navigationSelectors.getDrawer)
  const invertPalette = useSelector(navigationSelectors.isPaletteInverted)

  const renderModules = (modules) => {
    return modules.map((module) => {
      const { __typename, ...attributes } = module
      return (
        <Module attributes={attributes} type={__typename} key={uuid.v4()} />
      )
    })
  }

  /**
   * On boot, open the drawer
   */
  useEffect(() => {
    dispatch(
      navigationActions.requestOpenDrawer({
        template: 'role',
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

export default RoleTemplate

export const query = graphql`
  query {
    contentfulPage(slug: { eq: "careers" }) {
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
