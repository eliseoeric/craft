import React, { Fragment, useEffect } from 'react'
import { graphql } from 'gatsby'
import cx from 'classnames'
import { useSelector, useDispatch } from 'react-redux'
import uuid from 'uuid'

import CoreLayout from '@Layouts/CoreLayout'
import SEO from '@Components/Seo'
import Module from '@Components/Module'
import { TEMPLATES } from '@Utils/enums'
import Banner from '@Components/Banner'
import {
  navigationActions,
  navigationSelectors,
} from '@State/ducks/ui/navigation'

/**
 * Render the Front Page via a manual query. Then loads the requested case
 * study by slug into the app drawer.
 * @param {*} param0 
 * @returns 
 */
const CaseStudyTemplate = ({ data, pageContext }) => {
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
  console.log({pageContext})
  const { title, slug, description, layout } = data?.contentfulPage
  // const logo = data.contentfulSiteConfig?.logo?.file?.url
  const seoDescription = description?.childMarkdownRemark?.rawMarkdownBody

  /**
   * On boot, open the drawer using the Case study slug
   */
  useEffect(() => {
    dispatch(
      navigationActions.requestOpenDrawer({
        template: 'caseStudy',
        slug: pageContext.slug,
      })
    )
  }, [])

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
        {layout?.frontmatter?.banner_text && (
          <Banner text={layout?.frontmatter?.banner_text} />
        )}
      </CoreLayout>
    </>
  )
}

export default CaseStudyTemplate

export const query = graphql`
  query {
    contentfulPage(slug: { eq: "front-page" }) {
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
