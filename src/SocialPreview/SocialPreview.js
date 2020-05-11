import React from 'react';
import PropTypes from 'prop-types';
import { st, classes } from './SocialPreview.st.css';

import Text from '../Text';

/**
 * A displayer for a social post
 */
class SocialPreview extends React.Component {
  static displayName = 'SocialPreview';

  static propTypes = {
    dataHook: PropTypes.string,
    /** A social post link title */
    title: PropTypes.string,
    /** A social post link description */
    description: PropTypes.string,
    /** A url representation of the social post link */
    previewUrl: PropTypes.string,
    /** A slot to render a media item, most common will be the ImageViewer component */
    media: PropTypes.node,
  };

  render() {
    const { title, description, previewUrl, media } = this.props;

    return (
      <div className={st(classes.root)} data-hook={this.props.dataHook}>
        {media}
        <div className={classes.container}>
          <Text
            weight="normal"
            size="tiny"
            light={false}
            dataHook="socialPreview-url"
            className={classes.socialPreviewUrl}
            ellipsis
          >
            {previewUrl && previewUrl.toUpperCase()}
          </Text>
          <Text
            weight="bold"
            size="small"
            light={false}
            dataHook="socialPreview-title"
            className={classes.socialPreviewTitle}
            ellipsis
          >
            {title}
          </Text>
          <Text
            weight="thin"
            size="tiny"
            light={false}
            dataHook="socialPreview-description"
            className={classes.socialPreviewDescription}
            ellipsis
          >
            {description}
          </Text>
        </div>
      </div>
    );
  }
}

export default SocialPreview;
