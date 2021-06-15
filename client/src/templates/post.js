import React, { useEffect } from 'react'
import { graphql } from 'gatsby'
import cx from 'classnames'
import { useSelector, useDispatch } from 'react-redux'
import _ from "lodash"

import {
  navigationActions,
  navigationSelectors,
} from '@State/ducks/ui/navigation'
import CoreLayout from '@Layouts/CoreLayout'
import SEO from '@Components/Seo'
import Drawer from '@Components/Drawer'
import Post from '@Components/Post'
import NextPost from '@Components/NextPost'
import { TEMPLATES } from '../utils/enums'

// todo, create a graphql service to query contentful. The service can request roles and case study data on demand, and then pass it to the drawer to render
const PostTemplate = ({ data, pageContext }) => {
  const dispatch = useDispatch()
  const drawer = useSelector(navigationSelectors.getDrawer)
  const { title, slug, description, layout } = data?.contentfulTypeBlogPost

  const { next } = pageContext

  const renderLayout = (layout) => {
    return (
      <CoreLayout drawerOpen={drawer.isOpen} templateSlug={TEMPLATES.Post}>
        <Drawer>
          <Post postData={data?.contentfulTypeBlogPost} />
        </Drawer>
        {!_.isEmpty(next) && <NextPost nextPost={next} />}
      </CoreLayout>
    )
  }

  /**
   * On boot, open the drawer
   */
  useEffect(() => {
    dispatch(
      navigationActions.requestOpenDrawer({ template: 'post', slug: slug })
    )
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

export default PostTemplate

export const query = graphql`
  query ($slug: String!) {
    contentfulTypeBlogPost(slug: { eq: $slug }) {
      title
      slug
      category
      content {
        raw
        references {
          gatsbyImageData(aspectRatio: 1.5)
          title
        }
      }
      featuredImage {
        gatsbyImageData(aspectRatio: 1.5)
        title
      }
      updatedAt
    }
  }
`
