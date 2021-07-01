import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { graphql } from 'gatsby'

import Container from '@Components/Grid/Container'
import TeamMemberCard from '@Components/TeamMember/TeamMemberCard'
import TeamMemberModal from '@Components/TeamMember/TeamMemberModal'
import { withModal } from '@Components/withModal'
import Divider from '@Components/Divider'

import {
  navigationOperations,
  navigationSelectors,
} from '@State/ducks/ui/navigation'
import * as styles from './team.module.scss'

const TeamMembers = ({ title, teamMembers }) => {
  const dispatch = useDispatch()

  const activeMemberIndex = useSelector(
    navigationSelectors.getActiveTeamMemberIndex
  )
  const activeMember = teamMembers[activeMemberIndex] ?? null

  const handleOverlay = (index = null) => {
    dispatch(navigationOperations.setActiveTeamMemberIndex(index))
  }

  const TeamMemberWithModal = withModal(TeamMemberModal)

  return (
    <section className={styles.team_block}>
      <Divider />
      <Container className={styles.container}>
        <h2 className={styles.team_block__title}>{title}</h2>
        <div className={styles.team_grid}>
          {teamMembers.map((member, index) => (
            <TeamMemberCard
              key={index}
              onClick={() => handleOverlay(index)}
              {...member}
            />
          ))}
        </div>
      </Container>
      <TeamMemberWithModal
        isModalActive={Boolean(activeMember)}
        handleOverlay={() => handleOverlay(null)}
        teamMember={activeMember}
      />
    </section>
  )
}

export default TeamMembers

export const query = graphql`
  fragment TeamMembersModule on ContentfulModuleTeamMembers {
    title
    teamMembers {
      fullName
      jobTitle
      linkedInUrl
      dribbleUrl
      instagramUrl
      mediumUrl
      biography {
        childMarkdownRemark {
          rawMarkdownBody
        }
      }
      headshot {
        file {
          url
        }
      }
      headshotOnHover {
        file {
          url
        }
      }
    }
  }
`
