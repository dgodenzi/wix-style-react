import React, { PureComponent } from 'react';
import { ButtonNext } from 'wix-ui-core/dist/src/components/button-next';
import { generateDataAttr } from '../utils/generateDataAttr';
import { FontUpgradeContext } from '../FontUpgrade/context';
import { st, classes } from './Button.st.css';
import PropTypes from 'prop-types';

class Button extends PureComponent {
  static displayName = 'Button';

  static propTypes = {
    /** render as some other component or DOM tag */
    as: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.object,
      PropTypes.string,
    ]),
    /** Additional classes */
    className: PropTypes.string,
    /** Skins of Button content */
    skin: PropTypes.oneOf([
      'standard',
      'inverted',
      'destructive',
      'premium',
      'dark',
      'light',
      'transparent',
      'premium-light',
    ]),
    /** Priority of Button content */
    priority: PropTypes.oneOf(['primary', 'secondary']),
    /** Size of Button content */
    size: PropTypes.oneOf(['tiny', 'small', 'medium', 'large']),
    /** Click event handler  */
    onClick: PropTypes.func,
    /** Sets button width to 100% */
    fullWidth: PropTypes.bool,
    /** Element based icon (svg, image etc.) */
    suffixIcon: PropTypes.element,
    /** Element based icon (svg, image etc.) */
    prefixIcon: PropTypes.element,
    /** Applies disabled styles */
    disabled: PropTypes.bool,
    /** String based node */
    children: PropTypes.node,
    /** String based data hook */
    dataHook: PropTypes.string,
  };

  static defaultProps = {
    skin: 'standard',
    priority: 'primary',
    size: 'medium',
  };

  render() {
    const {
      skin,
      priority,
      size,
      className,
      fullWidth,
      children,
      dataHook,
      ...rest
    } = this.props;

    return (
      <FontUpgradeContext.Consumer>
        {context => (
          <ButtonNext
            data-madefor={context.active}
            {...rest}
            {...generateDataAttr(this.props, ['skin', 'size', 'priority'])}
            className={st(
              classes.root,
              { fluid: fullWidth, skin, priority, size },
              className,
            )}
            data-hook={dataHook}
          >
            {children}
          </ButtonNext>
        )}
      </FontUpgradeContext.Consumer>
    );
  }
}

export default Button;
