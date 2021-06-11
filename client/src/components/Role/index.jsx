import React, { useEffect } from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import cx from 'classnames'
import { DateTime } from 'luxon'
import { useSelector, useDispatch } from 'react-redux'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import Button from '@Components/Button'
import * as styles from './role.module.scss'

const Role = ({ roleData }) => {
  const { title, slug, location, jobDescription, updatedAt, applicationLink } =
    roleData

  console.log({ jobDescription })

  const updatedAtObject = DateTime.fromISO(updatedAt, {zone: 'utc'})

  const renderLocations = (locations) => {
    return locations.join(' / ')
  }

  return (
    <div className={styles.career_single}>
      <div className={styles.careers_single__content}>
        <div className={styles.careers_single__heading}>
          <h2 className={styles.careers_single__title}>{title}</h2>
          <time
            className={styles.careers_single__published}
            datetime={updatedAt}
          >
            Posted {updatedAtObject.toFormat('MM.dd.yy')}
          </time>
          <div className={styles.careers_single__category}>
            {renderLocations(location)}
          </div>
        </div>

        <div
          className={cx(
            styles.remark_content,
            styles.careers_single__description
          )}
        >
          {documentToReactComponents(JSON.parse(jobDescription.raw))}
        </div>
        <Button url={applicationLink} isLink={false}>Apply Now</Button>
      </div>
    </div>
  )
}

export default Role
