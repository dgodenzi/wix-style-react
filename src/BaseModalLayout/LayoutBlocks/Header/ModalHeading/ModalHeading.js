import React from 'react';
import PropTypes from 'prop-types';
import Heading from '../../../../Heading';
import { st, classes } from './ModalHeading.st.css';

const ModalHeading = ({ className, headingAppearance, ...restProps }) => {
  const appearance = headingAppearance === 'custom' ? 'H3' : headingAppearance;
  return (
    <Heading
      {...restProps}
      className={st(
        classes.root,
        { custom: headingAppearance === 'custom' },
        className,
      )}
      appearance={appearance}
    />
  );
};

ModalHeading.propTypes = {
  ...Heading.propTypes,
  headingAppearance: PropTypes.oneOf(['H2', 'custom']),
};

ModalHeading.defaultProps = {
  headingAppearance: 'custom',
};

export default ModalHeading;
