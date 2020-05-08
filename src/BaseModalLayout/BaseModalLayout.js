import React from 'react';
import PropTypes from 'prop-types';

import { st, classes } from './BaseModalLayout.st.css';
import { dataHooks } from './constants';
import CloseButton from '../CloseButton';
import { BaseModalLayoutContext } from './BaseModalLayoutContext';
import {
  Header,
  Content,
  Footer,
  Footnote,
  Illustration,
} from './LayoutBlocks';

const classNames = {
  headerClassName: classes.header,
  contentClassName: classes.content,
  footerClassName: classes.footer,
  footnoteClassName: classes.footnote,
  illustrationClassName: classes.illustration,
};

/** Private component to be used by all public modals. Represents the common internals of all modals */
class BaseModalLayout extends React.PureComponent {
  static Header = Header;
  static Content = Content;
  static Footer = Footer;
  static Footnote = Footnote;
  static Illustration = Illustration;
  render() {
    const {
      dataHook,
      className,
      children,
      style,
      onCloseButtonClick,
      ...restProps
    } = this.props;
    const { theme } = restProps;
    return (
      <div
        data-hook={dataHook}
        data-theme={theme}
        style={style}
        className={st(classes.root, { theme }, className)}
      >
        <BaseModalLayoutContext.Provider
          value={{ ...restProps, ...classNames }}
        >
          {children}
        </BaseModalLayoutContext.Provider>
        {onCloseButtonClick && (
          <CloseButton
            dataHook={dataHooks.closeButton}
            className={classes.closeButton}
            onClick={onCloseButtonClick}
            size="large"
            skin="dark"
          />
        )}
      </div>
    );
  }
}

BaseModalLayout.propTypes = {
  /** additional css classes */
  className: PropTypes.string,
  /** data hook for testing */
  dataHook: PropTypes.string,
  /** callback for when the close button is clicked */
  onCloseButtonClick: PropTypes.func,
  /** a global theme for the modal, will be applied as stylable state and will affect footer buttons skin */
  theme: PropTypes.oneOf(['standard', 'premium', 'destructive']),
};

BaseModalLayout.defaultProps = {
  theme: 'standard',
};

BaseModalLayout.displayName = 'BaseModalLayout';
export default BaseModalLayout;
