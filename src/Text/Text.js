import React from 'react';
import PropTypes from 'prop-types';
import ellipsisHOC from '../common/EllipsisHOC';
import { st, classes } from './Text.st.css';

/*
 * Temporary fix: SIZES, SKINS, WEIGHTS constants are copied here from constants.js
 * in order to have AutoDocs able to parse them.
 * See this issue: https://github.com/wix/wix-ui/issues/784
 */
export const SIZES = {
  tiny: 'tiny',
  small: 'small',
  medium: 'medium',
};

export const SKINS = {
  standard: 'standard',
  error: 'error',
  success: 'success',
  premium: 'premium',
  disabled: 'disabled',
};

export const WEIGHTS = {
  thin: 'thin',
  normal: 'normal',
  bold: 'bold',
};

const getStyleDataAttributes = styleAttributes =>
  Object.keys(styleAttributes).reduce((acc, styleKey) => {
    acc[`data-${styleKey}`] = styleAttributes[styleKey];
    return acc;
  }, {});

const Text = ({
  size,
  secondary,
  skin,
  light,
  weight,
  tagName,
  children,
  className,
  ...rest
}) => {
  /* eslint-disable no-unused-vars */
  const { dataHook, ...textProps } = rest;

  const styleAttributes = {
    size,
    secondary,
    skin,
    light,
    weight,
  };
  const styleDataAttributes = getStyleDataAttributes(styleAttributes);

  return React.createElement(
    tagName,
    {
      ...textProps,
      'data-hook': dataHook,
      className: st(classes.root, styleAttributes, className),
      ...styleDataAttributes,
    },
    children,
  );
};

Text.displayName = 'Text';

Text.propTypes = {
  /** Applied as data-hook HTML attribute that can be used in the tests */
  dataHook: PropTypes.string,
  /** tag name that will be rendered */
  tagName: PropTypes.string,

  /** class to be applied to the root element */
  className: PropTypes.string,

  /** font size of the text */
  size: PropTypes.oneOf(Object.keys(SIZES)),

  /** any nodes to be rendered (usually text nodes) */
  children: PropTypes.any,

  /** is the text type is secondary. Affects the font color */
  secondary: PropTypes.bool,

  /** skin color of the text */
  skin: PropTypes.oneOf(Object.keys(SKINS)),

  /** make the text color lighter */
  light: PropTypes.bool,

  /** font weight of the text */
  weight: PropTypes.oneOf(Object.keys(WEIGHTS)),

  ...ellipsisHOC.propTypes,
};

Text.defaultProps = {
  size: SIZES.medium,
  secondary: false,
  skin: SKINS.standard,
  light: false,
  weight: WEIGHTS.thin,
  tagName: 'span',
};

export default ellipsisHOC(Text);
