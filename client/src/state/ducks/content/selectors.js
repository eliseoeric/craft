const getRoleBySlug = (state, slug) => {
  return slug ? state.content.roles.byId[slug] : null;
}

const getPostBySlug = (state, slug) => {
  return slug ? state.content.posts.byId[slug] : null;
}

const getCaseStudyBySlug = (state, slug) => {
  return slug ? state.content.caseStudies.byId[slug] : null;
}

export default {
  getRoleBySlug,
  getPostBySlug,
  getCaseStudyBySlug,
}
