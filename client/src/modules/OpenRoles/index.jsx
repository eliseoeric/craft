import React from 'react'
import htmr from 'htmr'
import { graphql, Link } from 'gatsby'
import cx from 'classnames'
import { useDispatch, useSelector } from 'react-redux'

import { navigationActions } from '@State/ducks/ui/navigation'
import { H2 } from '@Components/Typography'
import Divider from '@Components/Divider'
import Container from '@Components/Grid/Container'
import Row from '@Components/Grid/Row'
import Column from '@Components/Grid/Column'

import * as styles from './roles.module.scss'

const OpenRoles = ({ title, slug, openRoles }) => {
  const dispatch = useDispatch()

  const renderLocations = (locations) => {
    return locations.join(' / ')
  }

  const loadRole = (event, role) => {
    event.preventDefault()
    dispatch(
      navigationActions.requestOpenDrawer({
        template: 'role',
        slug: role.slug,
        invertPalette: false,
      })
    )
  }

  return (
    <section className={cx(styles.content, 'remark_content')}>
      <Container className={cx(styles.container)}>
        <Divider />
        <Row>
          <Column lg={4}>
            <H2 text={htmr(title)} className={cx(styles.h2)} />
          </Column>
          <Column lg={8}>
            <div className={styles.careers_list}>
              {openRoles &&
                openRoles.map((role, index) => {
                  return (
                    <div class="careers_list__item">
                      {/* todo this needs to dispatch the open drawer */}
                      <Link
                        to={`/careers/${role.slug}`}
                        onClick={(event) => loadRole(event, role)}
                      >
                        <span className={styles.careers_list__item__title}>
                          {role.title}
                        </span>
                        <span className={styles.careers_list__item__location}>
                          {renderLocations(role.location)}
                        </span>
                      </Link>
                    </div>
                  )
                })}
            </div>
          </Column>
        </Row>
      </Container>
    </section>
  )
}

export default OpenRoles

export const query = graphql`
  fragment OpenRoles on ContentfulModuleOpenRoles {
    slug
    title
    openRoles {
      title
      slug
      location
    }
  }
`
