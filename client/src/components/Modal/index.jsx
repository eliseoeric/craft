import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import CloseButton from '@Components/CloseButton'
import Container from '@Components/Grid/Container'
import * as modal from './modal.module.scss'

export default class Modal extends React.Component {
  static propTypes = {
    isActive: PropTypes.bool,
    children: PropTypes.node,
    handleOverlay: PropTypes.func,
    classes: PropTypes.object,
  }

  static defaultProps = {
    isActive: false,
    children: null,
    handleOverlay: null,
    classes: {},
  }

  constructor(props) {
    super(props)

    this.onResize = this.onResize.bind(this)

    this.state = {
      isActive: props.isActive,
      isDesktop: false,
    }

    this.handleClose = this.handleClose.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize)
    window.removeEventListener('keydown', this.handleKeyPress)
  }

  componentDidMount() {
    this.onResize()
    window.addEventListener('resize', this.onResize)
    window.addEventListener('keydown', this.handleKeyPress)
  }

  handleKeyPress(event) {
    if (event.key === 'Escape') {
      this.handleClose(event)    
    }
  }

  onResize() {
    this.setState({ isDesktop: window.innerWidth > 960 })
  }

  handleClose(event) {
    this.props.handleOverlay(event)
    this.props.close(event)
  }

  render() {
    const {
      background,
      children,
      classes,
      isActive,
      disableCloseButton,
    } = this.props

    return (
      <div className={classnames(modal.modal_overlay, classes.root)}>
        <div
          className={classnames(modal.modal__wrapper, classes.wrapper, {
            [modal.modal__active]: isActive,
          })}
        >
          {!disableCloseButton && (
            <CloseButton
              className={classnames(
                modal.modal__close_button__fancy,
                classes.close_button
              )}
              onClick={this.handleClose}
            />
          )}
          <Container
            className={classnames(modal.modal__container, classes.container)}
            style={{
              backgroundImage: background ? `url(${background})` : null,
            }}
          >
            {/* <div
              className={classnames(
                modal.modal__close_button,
                classes.close_button
              )}
              onClick={this.handleClose}
            ></div> */}
            {children}
          </Container>
        </div>
      </div>
    )
  }
}
