import React from 'react';
import { st, classes } from './BadgeSelectItem.st.css';
import PropTypes from 'prop-types';
import Text from '../Text/Text';

const BadgeOption = props => {
  const { skin, text } = props;

  return (
    <div className={st(classes.root, { skin })}>
      <div className={classes.marker} />
      <span className={classes.label}>
        <Text size="small" skin="standard" tagName="span" weight="normal">
          {text}
        </Text>
      </span>
    </div>
  );
};

BadgeOption.propTypes = {
  text: PropTypes.node.isRequired,
  skin: PropTypes.string.isRequired,
};

export const badgeSelectItemBuilder = ({ id, text, skin }) => ({
  id,
  value: <BadgeOption skin={skin} text={text} />,
});
