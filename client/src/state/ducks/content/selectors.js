const getRoleBySlug = (state, slug) => {
  return slug ? state.content.roles.byId[slug] : null;
}

const getPostBySlug = (state, slug) => {
  return slug ? state.content.posts.byId[slug] : null;
}

const getCaseStudyBySlug = (state, slug) => {
  return slug ? state.content.caseStudies.byId[slug] : null;
}

const getNextPost = (state) => {
  const slug = state.ui.navigation.drawer.slug;
  if (slug) {
    const post = state.content.posts.byId[slug];
    return post ? state.content.posts.byId[post.next.slug] : null;
  }
  
  return null;
}

export default {
  getRoleBySlug,
  getPostBySlug,
  getCaseStudyBySlug,
  getNextPost, 
}
