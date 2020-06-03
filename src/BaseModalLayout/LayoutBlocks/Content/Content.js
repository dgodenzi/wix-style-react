import { st, classes } from './Content.st.css';
import React from 'react';
import Divider from '../../../Divider';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useBaseModalLayoutContext } from '../../BaseModalLayoutContext';

export const Content = ({
  dataHook,
  className,
  children,
  contentHideDividers,
}) => {
  const { contentClassName, content = children } = useBaseModalLayoutContext();
  className = classNames(contentClassName, className);
  return (
    (content && (
      <div
        data-hook={dataHook}
        data-hidedividers={contentHideDividers}
        className={st(
          classes.root,
          {
            hideTopDivider: contentHideDividers,
            hideBottomDivider: contentHideDividers,
          },
          className,
        )}
      >
        {!contentHideDividers && <Divider className={classes.topDivider} />}
        <div className={classes.innerContentWrapper}>
          <div className={classes.innerContent}>{content}</div>
        </div>
        {!contentHideDividers && <Divider className={classes.bottomDivider} />}
      </div>
    )) ||
    null
  );
};

Content.displayName = 'BaseModalLayout.Content';

Content.propTypes = {
  /** additional css classes */
  className: PropTypes.string,
  /** data hook for testing */
  dataHook: PropTypes.string,
  /** the content you want to render in the modal, children passed directly will be treated as `content` as well */
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  /** hides the content scrolling dividers  */
  contentHideDividers: PropTypes.bool,
};

Content.defaultProps = {
  contentHideDividers: true,
};
