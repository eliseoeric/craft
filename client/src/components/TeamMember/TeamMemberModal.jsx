import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'

import CloseButton from '@Components/CloseButton'
import Modal from '@Components/Modal'
import SocialIconsAlt from '@Components/SocialIconsAlt'

import * as styles from './member.module.scss'

const TeamMemberModal = React.forwardRef(
  ({ teamMember, ...modalProps }, ref) => {
    const {
      fullName,
      jobTitle,
      headshot,
      biography,
      dribbleUrl,
      instagramUrl,
      linkedInUrl,
      mediumUrl,
    } = teamMember

    const { handleOverlay } = modalProps
    const photo = headshot?.file?.url
    const bio = biography?.childMarkdownRemark?.rawMarkdownBody

    return (
      <Modal
        {...{ ref, ...modalProps }}
        disableCloseButton
        classes={{
          root: styles.root,
          wrapper: styles.member_popup__wrapper,
          container: cx(styles.member_popup, styles.fancybox_content),
          close_button: styles.modal_close_button,
        }}
      >
        <div className={styles.popup_header}>
          <div className={styles.popup_header__member_info}>
            <h3 className={styles.popup_header__member_name}>{fullName}</h3>
            <p className={styles.popup_header__member_designation}>
              {jobTitle}
            </p>
          </div>
          <SocialIconsAlt
            className={styles.popup_header__member_social}
            {...{ dribbleUrl, instagramUrl, linkedInUrl, mediumUrl }}
          />
        </div>
        <div className={styles.popup_content}>
          <figure className={styles.popup_content__member_photo}>
            <img src={photo} alt="bio" />
            <SocialIconsAlt
              className={styles.popup_header__member_social}
              {...{ dribbleUrl, instagramUrl, linkedInUrl, mediumUrl }}
            />
          </figure>
          <div className={styles.popup_content__mobile_details}>
            <div className={styles.popup_header__member_info}>
              <h3 className={styles.popup_header__member_name}>{fullName}</h3>
              <p className={styles.popup_header__member_designation}>
                {jobTitle}
              </p>
            </div>
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: bio }}
            className={cx(
              styles.popup_content__member_bio,
              styles.entry_content,
              styles.remark_content
            )}
          />
        </div>
        <CloseButton
          className={cx(styles.fancybox_button, styles.fancybox_close_small)}
          onClick={handleOverlay}
        />
      </Modal>
    )
  }
)

TeamMemberModal.propTypes = {
  isActive: PropTypes.bool,
  handleOverlay: PropTypes.func,
  teamMember: PropTypes.object,
}

export default TeamMemberModal
