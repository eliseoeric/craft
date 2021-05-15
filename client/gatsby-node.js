const Promise = require('bluebird')
const path = require('path')

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === 'build-html' || stage === 'develop-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /pixi.js|filter-kawase-blur/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const pageTemplate = path.resolve('./src/templates/page.js')
  const caseStudyTemplate = path.resolve('./src/templates/caseStudy.js')
  const results = await graphql(`
    {
      allContentfulTypeCaseStudy {
        edges {
          node {
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
  `)

  results.data.allContentfulPage.edges.forEach((post, index) => {
    // front-page slug should be /
    const path = post.node.slug === 'front-page' ? '/' : `/${post.node.slug}/`

    createPage({
      path: path,
      component: pageTemplate,
      context: {
        slug: post.node.slug,
      },
    })
  })

  results.data.allContentfulTypeCaseStudy.edges.forEach((post, index) => {
    // front-page slug should be /
    const path = `/case-studies/${post.node.slug}/`

    createPage({
      path: path,
      component: caseStudyTemplate,
      context: {
        slug: post.node.slug,
      },
    })
  })
}

// exports.createPages = ({ graphql, actions }) => {
//   const { createPage } = actions

//   return new Promise((resolve, reject) => {
//     const template = path.resolve('./src/templates/page.js')
//     resolve(
//       graphql(
//         `
//           {
//             allContentfulPage {
//               edges {
//                 node {
//                   canonicalUrl
//                   id
//                   slug
//                   title
//                   description {
//                     childMarkdownRemark {
//                       rawMarkdownBody
//                     }
//                   }
//                 }
//               }
//             }
//           }
//         `
//       ).then((result) => {
//         if (result.errors) {
//           console.log(result.errors)
//           reject(result.errors)
//         }

//         const posts = result.data.allContentfulPage.edges
//   posts.forEach((post, index) => {
//     // front-page slug should be /
//     const path = post.node.slug === 'front-page' ? '/' : `/${post.node.slug}/`

//     createPage({
//       path: path,
//       component: template,
//       context: {
//         slug: post.node.slug,
//       },
//     })
//   })
// })
//     )
//   })
// }
