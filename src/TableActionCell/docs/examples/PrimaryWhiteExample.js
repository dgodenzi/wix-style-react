import React from 'react';
import TableActionCell from 'wix-style-react/TableActionCell';

import { classes } from '../TableActionCell.story.st.css';

const Example = () => (
  <div className={classes.exampleRow}>
    <TableActionCell
      dataHook="story-primary-white"
      primaryAction={{
        text: 'Edit',
        skin: 'inverted',
        onClick: () => window.alert('Primary action was triggered!'),
      }}
    />
  </div>
);

export default Example;
