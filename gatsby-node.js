const Promise = require('bluebird')
const path = require('path')

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === 'build-html' || stage === 'develop-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /masonry-layout/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const template = path.resolve('./src/templates/page.js')
    resolve(
      graphql(
        `
          {
            allContentfulPage {
              edges {
                node {
                  canonicalUrl
                  id
                  slug
                  title
                  description {
                    childMarkdownRemark {
                      rawMarkdownBody
                    }
                  }
                }
              }
            }
          }
        `
      ).then((result) => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const posts = result.data.allContentfulPage.edges
        posts.forEach((post, index) => {
          // front-page slug should be /
          const path = post.node.slug === 'front-page' ? '/' : `/${post.node.slug}/`

          createPage({
            path: path,
            component: template,
            context: {
              slug: post.node.slug,
            },
          })
        })
      })
    )
  })
}
