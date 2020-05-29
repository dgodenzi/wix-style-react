import React from 'react';
import PropTypes from 'prop-types';
import { skins, dataHooks } from './constants';
import { stVars as colors } from '../Foundation/stylable/colors.st.css';

import Box from '../Box';

import { st, classes } from './PreviewWidget.st.css';

/** Preview content widget*/
class PreviewWidget extends React.PureComponent {
  static displayName = 'PreviewWidget';

  static propTypes = {
    /** Preview widget data hook*/
    dataHook: PropTypes.string,

    className: PropTypes.string,

    /** Background skin. To use `custom` skin, set it to custom and use the backgroundColor prop*/
    skin: PropTypes.oneOf(['neutral', 'gradient', 'custom']),

    /** Preview widget background color. Can be set with `design system` colors*/
    backgroundColor: PropTypes.string,

    /** Content area outline*/
    contentOutline: PropTypes.oneOf(['shadow', 'border']),

    /** Sets the height of the component */
    height: PropTypes.string,

    /** Sets the width of the component */
    width: PropTypes.string,

    /** Node to preview */
    children: PropTypes.node.isRequired,
  };

  static defaultProps = {
    skin: 'neutral',
    contentOutline: 'shadow',
    height: 'auto',
    width: '100%',
    children: <Box height="50px" width="50px" />,
  };

  render() {
    const {
      dataHook,
      skin,
      contentOutline,
      backgroundColor,
      height,
      width,
      children,
      className,
    } = this.props;

    const rootStyles = {
      height: `${height}`,
      width: `${width}`,
      background:
        skin === skins.custom && (colors[backgroundColor] || backgroundColor),
    };

    return (
      <div
        className={st(classes.root, { skin, contentOutline }, className)}
        data-hook={dataHook}
        style={rootStyles}
      >
        <div data-hook={dataHooks.contentArea} className={classes.contentArea}>
          {children}
        </div>
      </div>
    );
  }
}

export default PreviewWidget;
