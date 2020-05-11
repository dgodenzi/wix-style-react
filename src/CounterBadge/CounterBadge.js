import React from 'react';
import PropTypes from 'prop-types';
import { st, classes } from './CounterBadge.st.css';

const MAX_NUMBER = 100;

/** CounterBadge */
class CounterBadge extends React.PureComponent {
  _renderNumberContent = n => (n < MAX_NUMBER ? n : `${MAX_NUMBER - 1}+`);

  render() {
    const { dataHook, skin, children, className } = this.props;
    const custom = isNaN(children);

    return (
      <div
        className={st(classes.root, { skin, custom }, className)}
        data-hook={dataHook}
      >
        {custom ? children : this._renderNumberContent(Number(children))}
      </div>
    );
  }
}

CounterBadge.displayName = 'CounterBadge';

CounterBadge.propTypes = {
  /** Applied as data-hook HTML attribute that can be used in the tests */
  dataHook: PropTypes.string,

  /** A css class to be applied to the component's root element */
  className: PropTypes.string,

  /** Any element to be rendered inside */
  children: PropTypes.node,

  /** The component's look and feel */
  skin: PropTypes.oneOf([
    'general',
    'standard',
    'danger',
    'warning',
    'urgent',
    'success',
  ]),
};

CounterBadge.defaultProps = {
  skin: 'general',
};

export default CounterBadge;
