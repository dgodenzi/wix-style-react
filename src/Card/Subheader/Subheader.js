import React from 'react';
import PropTypes from 'prop-types';
import Text from '../../Text';
import Box from '../../Box';
import { classes } from './Subheader.st.css';
import classNames from 'classnames';

const isString = a => typeof a === 'string';

class Subheader extends React.PureComponent {
  static displayName = 'Card.Subheader';

  static defaultProps = {
    skin: 'standard',
  };

  static propTypes = {
    /** Applied as data-hook HTML attribute that can be used in the tests */
    dataHook: PropTypes.string,

    /** card title */
    title: PropTypes.node.isRequired,

    /** suffix node that will be rendered on the right side */
    suffix: PropTypes.node,

    /** skin  */
    skin: PropTypes.oneOf(['standard', 'neutral']),
  };

  render() {
    const { dataHook, title, suffix, skin } = this.props;

    return (
      <div
        data-hook={dataHook}
        className={classNames(classes.container, {
          [classes.standard]: skin === 'standard',
          [classes.neutral]: skin === 'neutral',
        })}
      >
        <Box verticalAlign="middle" flexGrow={1} overflow="hidden">
          {isString(title) ? (
            <Text ellipsis weight="normal" size="medium" dataHook="title">
              {title}
            </Text>
          ) : (
            <div data-hook="title-node">{title}</div>
          )}
        </Box>

        {suffix && (
          <div className={classes.suffix} data-hook="suffix-node">
            {suffix}
          </div>
        )}
      </div>
    );
  }
}

export default Subheader;
