import React from 'react';
import PropTypes from 'prop-types';
import { ToggleSwitch as CoreToggleSwitch } from 'wix-ui-core/dist/src/components/toggle-switch';
import ToggleOff from 'wix-ui-icons-common/system/ToggleOff';
import ToggleOn from 'wix-ui-icons-common/system/ToggleOn';
import ToggleOffSmall from 'wix-ui-icons-common/system/ToggleOffSmall';
import ToggleOnSmall from 'wix-ui-icons-common/system/ToggleOnSmall';
import { generateDataAttr } from '../utils/generateDataAttr';
import { SIZES } from './constants';
import { st, classes } from './ToggleSwitch.st.css';

const checkedIconMap = {
  [SIZES.small]: undefined,
  [SIZES.medium]: <ToggleOnSmall />,
  [SIZES.large]: <ToggleOn />,
};

const uncheckedIconMap = {
  [SIZES.small]: undefined,
  [SIZES.medium]: <ToggleOffSmall />,
  [SIZES.large]: <ToggleOff />,
};

/** toggle switch */
class ToggleSwitch extends React.PureComponent {
  static displayName = 'ToggleSwitch';

  static propTypes = {
    /** Applied as data-hook HTML attribute that can be used in the tests*/
    dataHook: PropTypes.string,

    /** ToggleSwitch skin */
    skin: PropTypes.oneOf(['standard', 'success', 'error']),

    /** Toggle Switch size*/
    size: PropTypes.oneOf(['small', 'medium', 'large']),

    /** is Toggle Switch checked */
    checked: PropTypes.bool,

    /** is Toggle Switch disabled */
    disabled: PropTypes.bool,

    /** Toggle Switch id */
    id: PropTypes.string,

    /** onChange event */
    onChange: PropTypes.func,

    /** Standard component tabIndex */
    tabIndex: PropTypes.number,
  };

  static defaultProps = {
    skin: 'standard',
    size: 'large',
  };

  render() {
    // Should not allow inline styles
    const { size, skin, styles: stylesProp, dataHook, ...rest } = this.props;

    return (
      <CoreToggleSwitch
        className={st(classes.root, { skin, size })}
        {...generateDataAttr(this.props, ['skin', 'size'])}
        data-hook={dataHook}
        checkedIcon={checkedIconMap[size]}
        uncheckedIcon={uncheckedIconMap[size]}
        {...rest}
      />
    );
  }
}

export default ToggleSwitch;
