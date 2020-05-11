import React from 'react';
import IconButton from '../../IconButton';
import Tooltip from '../../Tooltip';
import Text from '../../Text';
import ChevronLeft from 'wix-ui-icons-common/ChevronLeft';
import ChevronRight from 'wix-ui-icons-common/ChevronRight';
import { arrowsDirection, dataHooks } from '../constants';
import { st, classes } from '../ModalPreviewLayout.st.css';

const iconButtonArrow = {
  [arrowsDirection.rightArrow]: <ChevronRight />,
  [arrowsDirection.leftArrow]: <ChevronLeft />,
};

const tooltipProps = {
  [arrowsDirection.rightArrow]: {
    dataHook: dataHooks.nextNavigationButtonTooltip,
    className: classes.modalTooltip,
    appendTo: 'scrollParent',
    placement: 'right',
  },
  [arrowsDirection.leftArrow]: {
    dataHook: dataHooks.prevNavigationButtonTooltip,
    className: classes.modalTooltip,
    appendTo: 'scrollParent',
    placement: 'left',
  },
};

const NavigationButton = ({ direction, dataHook, tooltipText, onClick }) => (
  <div className={st(classes.navigationButton, classes[direction])}>
    {tooltipText ? (
      <Tooltip
        content={<Text children={tooltipText} />}
        {...tooltipProps[direction]}
      >
        <IconButton
          as="button"
          skin="transparent"
          dataHook={dataHook}
          onClick={onClick}
        >
          {iconButtonArrow[direction]}
        </IconButton>
      </Tooltip>
    ) : (
      <IconButton
        as="button"
        skin="transparent"
        dataHook={dataHook}
        onClick={onClick}
      >
        {iconButtonArrow[direction]}
      </IconButton>
    )}
  </div>
);

export default NavigationButton;
