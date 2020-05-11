import React from 'react';
import PropTypes from 'prop-types';
import ellipsisHOC from '../common/EllipsisHOC';
import { st, classes } from './Heading.st.css';

export const APPEARANCES = {
  H1: 'H1',
  H2: 'H2',
  H3: 'H3',
  H4: 'H4',
  H5: 'H5',
  H6: 'H6',
};

const Heading = ({
  light,
  appearance,
  children,
  dataHook,
  ...headingProps
}) => {
  return React.createElement(
    appearance.toLowerCase(),
    {
      ...headingProps,
      'data-hook': dataHook,
      className: st(classes.root, { light, appearance }),
      'data-appearance': appearance,
      'data-light': light,
    },
    children,
  );
};

Heading.displayName = 'Heading';

Heading.propTypes = {
  dataHook: PropTypes.string,
  /** any nodes to be rendered (usually text nodes) */
  children: PropTypes.any,

  /** is the text has dark or light skin */
  light: PropTypes.bool,

  /** typography of the heading */
  appearance: PropTypes.oneOf(Object.keys(APPEARANCES)),

  ...ellipsisHOC.propTypes,
};

Heading.defaultProps = {
  appearance: APPEARANCES.H1,
  light: false,
};

export default ellipsisHOC(Heading);
