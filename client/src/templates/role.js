import React, { useEffect } from 'react'
import { graphql } from 'gatsby'
import cx from 'classnames'
import { useSelector, useDispatch } from 'react-redux'

import {
  navigationActions,
  navigationSelectors,
} from '@State/ducks/ui/navigation'
import CoreLayout from '@Layouts/CoreLayout'
import SEO from '@Components/Seo'
import Drawer from '@Components/Drawer'
import Role from '@Components/Role'
import { TEMPLATES } from '../utils/enums'

// todo, create a graphql service to query contentful. The service can request roles and case study data on demand, and then pass it to the drawer to render
const RoleTemplate = ({ data, pageContext }) => {
  const dispatch = useDispatch();
  const drawer = useSelector(navigationSelectors.getDrawer)
  const { title, slug, description, layout } = data?.contentfulTypeRole

  const renderLayout = (layout) => {
    return (
      <CoreLayout
        drawerOpen={drawer.isOpen}
        templateSlug={TEMPLATES.Role}
      >
        <Drawer>
          <Role roleData={data?.contentfulTypeRole} />
        </Drawer>
      </CoreLayout>
    )
  }
  
  /**
   * On boot, open the drawer
   */
  useEffect(() => {
    dispatch(navigationActions.requestOpenDrawer({template: 'role', slug: slug}))
  }, [])

  
  // const logo = data.contentfulSiteConfig?.logo?.file?.url
  // const seoDescription = description?.childMarkdownRemark?.rawMarkdownBody

  return (
    <>
      <SEO
        title={title}
        titleTemplate={`%s - ${title}`}
        // image={`https:${socialShareImage?.file?.url}`}
        // description={seoDescription}
      />
      {renderLayout(layout)}
    </>
  )
}

export default RoleTemplate

export const query = graphql`
  query ($slug: String!) {
    contentfulTypeRole(slug: { eq: $slug }) {
      title
      slug
      location
      jobDescription {
        raw
      }
      updatedAt
      applicationLink
    }
  }
`
