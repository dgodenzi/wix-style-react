import React, { Children } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import CloseButton from '../CloseButton';
import TextLabel from './TextLabel';
import ActionButton from './ActionButton';
import styles from './Notification.st.css';
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
  enter: 300,
  exit: 300,
};

const themeIcon = {
  error: <StatusAlert className={styles.iconStyling} />,
  success: <StatusComplete className={styles.iconStyling} />,
  warning: <StatusWarning className={styles.iconStyling} />,
};

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

  render() {
    const { dataHook, theme, type, zIndex, children } = this.props;
    const childrenComponents = mapChildren(children);
    const show = this._shouldShowNotification();

    return (
      <div data-hook={dataHook} data-theme={theme} data-type={type}>
        <CSSTransition
          in={show}
          classNames={{
            enter: styles.notificationAnimationEnter,
            enterActive: styles.notificationAnimationEnterActive,
            exit: styles.notificationAnimationExit,
            exitActive: styles.notificationAnimationExitActive,
          }}
          timeout={animationsTimeouts}
          mountOnEnter
          unmountOnExit
        >
          <div
            {...styles('notification', { theme, type })}
            data-hook={dataHooks.notificationWrapper}
            style={{ zIndex }}
            role="alert"
            aria-labelledby="notification-label"
            aria-live="polite"
          >
            <div className={styles.notificationContent}>
              {themeIcon[theme] && <div>{themeIcon[theme]}</div>}

              <div className={styles.labelWrapper}>
                {childrenComponents.label}
                {childrenComponents.ctaButton}
              </div>

              {childrenComponents.closeButton && (
                <div
                  data-hook={dataHooks.notificationCloseButton}
                  className={styles.closeButton}
                  onClick={this._hideNotificationOnCloseClick}
                  children={childrenComponents.closeButton}
                />
              )}
            </div>
          </div>
        </CSSTransition>
      </div>
    );
  }
}

const Close = props => <CloseButton skin="lightFilled" {...props} />;
Close.displayName = 'Notification.CloseButton';

Notification.displayName = 'Notification';

Notification.propTypes = {
  /** when set to `true`, notification is shown */
  show: PropTypes.bool,
  /** Notification theme */
  theme: PropTypes.oneOf([
    'standard',
    'error',
    'success',
    'warning',
    'premium',
  ]),
  /** Sets how <Notification/> should be displayed:
   * - `type="global"` will take up space and push the content down.
   * - `type="local"` will not take up space and will be displayed on top of content
   * - `type="sticky"` will not take up space and will be displayed at the top of whole page and on top of content (position: fixed;)
   * */
  type: PropTypes.oneOf([
    GLOBAL_NOTIFICATION,
    LOCAL_NOTIFICATION,
    STICKY_NOTIFICATION,
  ]),
  /** When provided, then the Notification will be hidden after the specified timeout. */
  autoHideTimeout: PropTypes.number,
  /** Notification z-index */
  zIndex: PropTypes.number,

  onClose: PropTypes.func,
  /** Can be either:
   * - `<Notification.TextLabel/>` (required)
   * - `<Notification.CloseButton/>`
   * - `<Notification.ActionButton/>` */
  children: PropTypes.node,
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
