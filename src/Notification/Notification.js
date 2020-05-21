import React, { Children } from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import * as Composite from '../Composite';
import CloseButton from '../CloseButton';
import TextLabel from './TextLabel';
import ActionButton from './ActionButton';
import { st, classes } from './Notification.st.css';
import StatusComplete from 'wix-ui-icons-common/StatusComplete';
import StatusWarning from 'wix-ui-icons-common/StatusWarning';
import StatusAlert from 'wix-ui-icons-common/StatusAlert';
import { dataHooks } from './constants';

export const LOCAL_NOTIFICATION = 'local';
export const GLOBAL_NOTIFICATION = 'global';
export const STICKY_NOTIFICATION = 'sticky';
export const DEFAULT_AUTO_HIDE_TIMEOUT = 6000;
export const DEFAULT_TIMEOUT = DEFAULT_AUTO_HIDE_TIMEOUT;

const animationsTimeouts = {
  enter: 500,
  exit: 350,
};

const themeIcon = {
  error: <StatusAlert className={classes.iconStyling} />,
  success: <StatusComplete className={classes.iconStyling} />,
  warning: <StatusWarning className={classes.iconStyling} />,
};

function FirstChild(props) {
  const childrenArray = Children.toArray(props.children);
  return childrenArray[0] || null;
}

function mapChildren(children) {
  const childrenArray = Children.toArray(children);
  return childrenArray.reduce((childrenAsMap, child) => {
    switch (child.type.displayName) {
      case 'Notification.TextLabel':
        childrenAsMap.label = child;
        break;
      case 'Notification.ActionButton':
        childrenAsMap.ctaButton = child;
        break;
      case 'Notification.CloseButton':
        childrenAsMap.closeButton = React.cloneElement(child, {
          size: 'small',
        });
        break;
    }
    return childrenAsMap;
  }, {});
}

class Notification extends React.PureComponent {
  closeTimeout;

  constructor(props) {
    super(props);
    this.state = {
      hideByCloseClick: false,
      hideByTimer: false,
    };

    this._startCloseTimer(props);
  }

  _startCloseTimer({ autoHideTimeout }) {
    if (autoHideTimeout) {
      this.closeTimeout = setTimeout(
        () => this._hideNotificationOnTimeout(),
        autoHideTimeout || DEFAULT_AUTO_HIDE_TIMEOUT,
      );
    }
  }

  _clearCloseTimeout() {
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
      this.closeTimeout = null;
    }
  }

  _hideNotificationOnCloseClick = () => {
    this.setState({ hideByCloseClick: true });

    setTimeout(
      () => this.props.onClose && this.props.onClose('hide-by-close-click'),
      animationsTimeouts.exit + 100,
    );
  };

  _hideNotificationOnTimeout = () => {
    this.setState({ hideByTimer: true });

    setTimeout(
      () => this.props.onClose && this.props.onClose('hide-by-timer'),
      animationsTimeouts.exit + 100,
    );
  };

  _bypassCloseFlags() {
    this.setState({
      hideByCloseClick: false,
      hideByTimer: false,
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.show) {
      this._bypassCloseFlags();
      this._clearCloseTimeout();
      this._startCloseTimer(nextProps);
    }
  }

  componentWillUnmount() {
    this._clearCloseTimeout();
  }

  _shouldShowNotification() {
    return (
      this.props.show && !this.state.hideByCloseClick && !this.state.hideByTimer
    );
  }

  _renderNotification() {
    const { zIndex, children, theme } = this.props;
    const childrenComponents = mapChildren(children);

    return (
      <CSSTransition
        classNames={{
          enter: classes.notificationAnimationEnter,
          enterActive: classes.notificationAnimationEnterActive,
          exit: classes.notificationAnimationExit,
          exitActive: classes.notificationAnimationExitActive,
        }}
        timeout={animationsTimeouts}
      >
        <div
          data-hook={dataHooks.notificationWrapper}
          style={{ zIndex }}
          className={classes.notification}
          role="alert"
          aria-labelledby="notification-label"
          aria-live="polite"
        >
          {themeIcon[theme]}
          <div
            id="notification-label"
            className={classes.label}
            children={childrenComponents.label}
          />

          {childrenComponents.ctaButton && (
            <div
              className={classes.button}
              children={childrenComponents.ctaButton}
            />
          )}

          {childrenComponents.closeButton && (
            <div
              data-hook={dataHooks.notificationCloseButton}
              className={classes.closeButton}
              onClick={this._hideNotificationOnCloseClick}
              children={childrenComponents.closeButton}
            />
          )}
        </div>
      </CSSTransition>
    );
  }

  render() {
    const { dataHook, theme, type } = this.props;
    return (
      <div
        className={st(classes.root, { theme, type })}
        data-hook={dataHook}
        data-theme={theme}
        data-type={type}
      >
        <TransitionGroup component={FirstChild}>
          {this._shouldShowNotification() ? this._renderNotification() : null}
        </TransitionGroup>
      </div>
    );
  }
}

const Close = props => <CloseButton skin="lightFilled" {...props} />;
Close.displayName = 'Notification.CloseButton';

Notification.displayName = 'Notification';

Notification.propTypes = {
  show: PropTypes.bool,
  theme: PropTypes.oneOf([
    'standard',
    'error',
    'success',
    'warning',
    'premium',
  ]),
  type: PropTypes.oneOf([
    GLOBAL_NOTIFICATION,
    LOCAL_NOTIFICATION,
    STICKY_NOTIFICATION,
  ]),
  /** When provided, then the Notification will be hidden after the specified timeout. */
  autoHideTimeout: PropTypes.number,
  zIndex: PropTypes.number,
  onClose: PropTypes.func,
  children: Composite.children(
    Composite.once(TextLabel),
    Composite.optional(ActionButton),
    Composite.optional(Close),
  ),
};

Notification.defaultProps = {
  theme: 'standard',
  type: GLOBAL_NOTIFICATION,
  onClose: null,
};

Notification.CloseButton = Close;
Notification.TextLabel = TextLabel;
Notification.ActionButton = ActionButton;

export default Notification;
