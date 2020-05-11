import React, { PureComponent } from 'react';
import { ButtonNext } from 'wix-ui-core/dist/src/components/button-next';
import PropTypes from 'prop-types';
import { generateDataAttr } from '../utils/generateDataAttr';

import { st, classes } from './TextButton.st.css';

class TextButton extends PureComponent {
  static displayName = 'TextButton';

  static propTypes = {
    /** render as some other component or DOM tag */
    as: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.object,
      PropTypes.string,
    ]),
    /** Additional classes */
    className: PropTypes.string,
    /** Skins of TextButton content */
    skin: PropTypes.oneOf(['standard', 'light', 'premium', 'dark']),
    /** Underline of TextButton content */
    underline: PropTypes.oneOf(['none', 'onHover', 'always']),
    /** Weight of TextButton content */
    weight: PropTypes.oneOf(['thin', 'normal']),
    /** Size of TextButton content */
    size: PropTypes.oneOf(['tiny', 'small', 'medium']),
    /** Click event handler  */
    onClick: PropTypes.func,
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
    /** Stretches text button to its container width */
    fluid: PropTypes.bool,
  };

  static defaultProps = {
    skin: 'standard',
    underline: 'none',
    weight: 'thin',
    size: 'medium',
    disabled: false,
    fluid: false,
  };

  render() {
    const {
      skin,
      underline,
      weight,
      size,
      children,
      className,
      dataHook,
      fluid,
      ...rest
    } = this.props;

    return (
      <ButtonNext
        {...rest}
        {...generateDataAttr(this.props, [
          'skin',
          'size',
          'weight',
          'underline',
        ])}
        className={st(
          classes.root,
          { skin, underline, weight, size, fluid },
          className,
        )}
        data-hook={dataHook}
      >
        {children}
      </ButtonNext>
    );
  }
}

export default TextButton;
