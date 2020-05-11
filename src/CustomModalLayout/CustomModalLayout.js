import React from 'react';
import PropTypes from 'prop-types';

import { st, classes } from './CustomModalLayout.st.css';

import BaseModalLayout from '../BaseModalLayout';
import Button from '../Button';

/** CustomModalLayout */
const CustomModalLayout = ({
  children,
  removeContentPadding,
  width,
  className,
  ...restProps
}) => {
  const style = width ? { width } : {};
  return (
    <BaseModalLayout
      style={style}
      data-contentpadding={!removeContentPadding}
      {...restProps}
      className={st(classes.root, { removeContentPadding }, className)}
    >
      <BaseModalLayout.Header />
      <BaseModalLayout.Content contentHideDividers>
        {children}
      </BaseModalLayout.Content>
      <BaseModalLayout.Footer />
      <BaseModalLayout.Footnote />
    </BaseModalLayout>
  );
};

CustomModalLayout.displayName = 'CustomModalLayout';

CustomModalLayout.propTypes = {
  /** ...BaseModalLayout.propTypes, */
  /** additional css classes */
  className: PropTypes.string,
  /** data hook for testing */
  dataHook: PropTypes.string,
  /** callback for when the close button is clicked */
  onCloseButtonClick: PropTypes.func,
  /** a global theme for the modal, will be applied as stylable state and will affect footer buttons skin */
  theme: PropTypes.oneOf(['standard', 'premium', 'destructive']),

  /** ...Header.propTypes, */
  /** The modal's title */
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  /** The modal's subtitle */
  subtitle: PropTypes.string,

  /** ...Content.propTypes, */
  /** the content you want to render in the modal, children passed directly will be treated as `content` as well */
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),

  /** ...Footer.propTypes, */
  /** will determine the action buttons size*/
  actionsSize: Button.propTypes.size,
  /** a text for the primary action button */
  primaryButtonText: PropTypes.string,
  /** a callback for when the primary action button is clicked */
  primaryButtonOnClick: PropTypes.func,
  /** Passed to the primary action button as props without any filter / mutation */
  primaryButtonProps: (() => {
    const { dataHook, ...buttonProps } = Button.propTypes;
    return PropTypes.shape(buttonProps);
  })(),
  /** a text for the secondary action button */
  secondaryButtonText: PropTypes.string,
  /** callback for when the secondary action button is clicked */
  secondaryButtonOnClick: PropTypes.func,
  /** Passed to the secondary button as props without any filter / mutation */
  secondaryButtonProps: (() => {
    const { dataHook, ...buttonProps } = Button.propTypes;
    return PropTypes.shape(buttonProps);
  })(),
  /** side actions node, to be rendered as the first element on the same row as the action buttons */
  sideActions: PropTypes.node,

  /** ...Footnote.propTypes, */
  /** a footnote node, to be rendered at the very bottom of the modal */
  footnote: PropTypes.node,

  /** CustomModalLayout */
  /** When set to true, there will be no content padding */
  removeContentPadding: PropTypes.bool,
  /** The modal desired width */
  width: PropTypes.string,
};

CustomModalLayout.defaultProps = {
  theme: 'standard',
  actionsSize: 'small',
  removeContentPadding: false,
};

export default CustomModalLayout;
