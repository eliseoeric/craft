import Service from '@Services/Service'

const BASE_URI = '/.netlify/functions'

class ContentfulService extends Service {
  
  getPostBySlug = (slug) => {
    return this.post(`${BASE_URI}/get-news-article`, {
      slug,
    })
  }

  getAllPosts = () => {
    return this.get(`${BASE_URI}/get-news-article`)
  }
}

export default new ContentfulService()
