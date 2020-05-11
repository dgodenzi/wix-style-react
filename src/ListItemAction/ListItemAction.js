import React from 'react';
import PropTypes from 'prop-types';
import { withFocusable } from 'wix-ui-core/dist/src/hocs/Focusable/FocusableHOC';
import { st, classes } from './ListItemAction.st.css';
import Text from '../Text';

/** ListItemAction */
class ListItemActionComponent extends React.PureComponent {
  static displayName = 'ListItemAction';

  static propTypes = {
    /** render as some other element */
    as: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.object,
      PropTypes.string,
    ]),

    /** Data attribute for testing purposes */
    dataHook: PropTypes.string,

    /** Item theme (standard, dark, destructive) */
    skin: PropTypes.oneOf(['standard', 'dark', 'destructive']),

    /** Text Size (small, medium) */
    size: PropTypes.oneOf(['small', 'medium']),

    /** Prefix Icon */
    prefixIcon: PropTypes.node,

    /** When present, it specifies that a button should automatically get focus when the page loads. */
    autoFocus: PropTypes.bool,

    /** should the text get ellipsed with tooltip, or should it get broken into lines when it reaches the end of its container */
    ellipsis: PropTypes.bool,

    /** Title */
    title: PropTypes.string.isRequired,

    /** If true, the item is highlighted */
    highlighted: PropTypes.bool,

    /** Disabled */
    disabled: PropTypes.bool,

    /** Tooltip floating modifiers */
    tooltipModifiers: PropTypes.object,

    /** On Click */
    onClick: PropTypes.func,
  };

  focus() {
    if (this.innerComponentRef) {
      this.innerComponentRef.focus();
    }
  }

  _renderText = () => {
    const { title, size, ellipsis, tooltipModifiers } = this.props;
    return (
      <Text
        className={classes.text}
        weight="normal"
        size={size}
        dataHook="list-item-action-title"
        ellipsis={ellipsis}
        placement="right"
        {...tooltipModifiers}
      >
        {title}
      </Text>
    );
  };

  _renderPrefix = () => {
    const { prefixIcon, size } = this.props;
    return React.cloneElement(prefixIcon, {
      size: size === 'medium' ? 24 : 18,
      className: classes.prefixIcon,
      'data-hook': 'list-item-action-prefix-icon',
    });
  };

  static defaultProps = {
    as: 'button',
    skin: 'standard',
    size: 'medium',
    highlighted: false,
  };

  render() {
    const {
      dataHook,
      disabled,
      skin,
      prefixIcon,
      onClick,
      focusableOnFocus,
      focusableOnBlur,
      as: Component,
      tabIndex,
      onKeyDown,
      autoFocus,
      highlighted,
      className,
    } = this.props;

    return (
      <Component
        className={st(classes.root, { skin, disabled, highlighted }, className)}
        data-skin={skin}
        data-disabled={disabled}
        tabIndex={tabIndex}
        ref={ref => (this.innerComponentRef = ref)}
        autoFocus={autoFocus}
        onFocus={focusableOnFocus}
        onBlur={focusableOnBlur}
        type={Component === 'button' ? 'button' : undefined}
        data-hook={dataHook}
        onKeyDown={!disabled ? onKeyDown : undefined}
        onClick={!disabled ? onClick : undefined}
      >
        {prefixIcon && this._renderPrefix()}
        {this._renderText()}
      </Component>
    );
  }
}

export const ListItemAction = withFocusable(ListItemActionComponent);

export const listItemActionBuilder = ({
  title,
  prefixIcon,
  onClick,
  id,
  disabled,
  skin,
  size,
  dataHook,
  as,
  tabIndex,
  autoFocus,
  className,
  ellipsis,
}) => ({
  id,
  disabled,
  overrideStyle: true,
  value: props => (
    <ListItemAction
      {...props}
      ellipsis={ellipsis}
      className={className}
      autoFocus={autoFocus}
      tabIndex={tabIndex}
      as={as}
      onClick={onClick}
      dataHook={dataHook}
      title={title}
      prefixIcon={prefixIcon}
      skin={skin}
      size={size}
      highlighted={props.hovered}
    />
  ),
});
