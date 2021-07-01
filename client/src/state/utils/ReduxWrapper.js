import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore as reduxCreateStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from '@State/rootReducer'

import createSagaMiddleware from 'redux-saga'

import rootSaga from '@State/rootSaga'

const contentStateFromGraphql = (data, dataObjectKey) => {
  let byId = {}
  let allIds = []
  const { edges } = data[dataObjectKey]
  const entities = edges
    .map((edge) => {
      return {
        ...edge.node,
      }
    })
    .forEach((post) => {
      byId[post.slug] = post
      allIds.push(post.slug)
    })

  return {
    byId,
    allIds,
  }
}
/**
 * Configures the redux store. 
 * 
 * This additionally loads all of the data that can be "mounted"
 * into a drawer into state. This allows us to statically generate
 * the pages, with the index page in the background, and the open state
 * of a drawer, populated with the post content
 * @param {*} param0 
 * @returns 
 */
const ReduxWrapper = ({ element }) => (
  <StaticQuery
    query={graphql`
      query contentData {
        allContentfulTypeCaseStudy {
          edges {
            node {
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
        }
        allContentfulTypeRole {
          edges {
            node {
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
        }
        allContentfulTypeBlogPost {
          edges {
            node {
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
        }
      }
    `}
    render={(data) => {
      let postState = contentStateFromGraphql(data, 'allContentfulTypeBlogPost')
      let roleState = contentStateFromGraphql(data, 'allContentfulTypeRole')
      let caseState = contentStateFromGraphql(data, 'allContentfulTypeCaseStudy')
      console.log({ postState })
      const middleware = createSagaMiddleware()
      const store = reduxCreateStore(
        rootReducer,
        { content: { posts: postState, roles: roleState, caseStudies: caseState } },
        composeWithDevTools(applyMiddleware(middleware))
      )

      middleware.run(rootSaga)

      return <Provider store={store}>{element}</Provider>
    }}
  />
)

export default ReduxWrapper
