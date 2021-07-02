import React, { useState } from 'react'
import cx from 'classnames'
import Header from '@Components/CaseStudy/Header'
import Module from '@Components/Module'

const CaseStudyTemplate = ({ caseStudyData }) => {
  const { title, description, layout, orbColor1, orbColor2 } = caseStudyData
  const seoDescription = description?.childrenMarkdownRemark[0].rawMarkdownBody

  const renderModules = (modules) => {
    return modules.map((module) => {
      const { __typename, ...attributes } = module
      const _attributes = {
        ...attributes,
        orbColor1,
        orbColor2
      }
      return (
        <Module attributes={_attributes} type={__typename} key={__typename} />
      )
    })
  }

  return (
    <div>
      <Header title={title} byline={seoDescription} orbColor1={orbColor1} orbColor2={orbColor2} />
      {layout && layout.contentModules && renderModules(layout.contentModules)}
    </div>
  )
}

export default CaseStudyTemplate
