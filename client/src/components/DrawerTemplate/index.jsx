import React from 'react'
import cx from 'classnames'
import { useSelector } from 'react-redux'

import {
  navigationSelectors,
} from '@State/ducks/ui/navigation'
import { contentSelectors } from '@State/ducks/content'
import Post from '@Components/Post'
import Role from '@Components/Role'
import { TEMPLATES } from '@Utils/enums'
import CaseStudyTemplate from '@Components/CaseStudy/Template'

const DrawerTemplate = ({ className }) => {
  const template = useSelector(navigationSelectors.getDrawerTemplate)
  const templateSlug = useSelector(navigationSelectors.getDrawerSlug)
  const roleData = useSelector((state) => contentSelectors.getRoleBySlug(state, templateSlug))
  const postData = useSelector((state) => contentSelectors.getPostBySlug(state, templateSlug))
  const caseStudyData = useSelector((state) => contentSelectors.getCaseStudyBySlug(state, templateSlug))
  

  const renderTemplateComponent = (template) => {
    switch (template) {
      case TEMPLATES.Post: {
        return <Post postData={postData} />
      }

      case TEMPLATES.Role: {
        
        return <Role roleData={roleData} />
      }

      case TEMPLATES['Case Study']: {
        return <CaseStudyTemplate caseStudyData={caseStudyData} />
      }

      default:
        return null
    }
  }

  return renderTemplateComponent(template)
}

export default DrawerTemplate
