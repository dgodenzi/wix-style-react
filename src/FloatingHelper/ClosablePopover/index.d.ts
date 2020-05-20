import * as React from 'react';
import { ClosablePopover } from './ClosablePopover';

export default class FloatingHelper extends React.PureComponent<
  ClosablePopoverProps
> {
  open: () => void;
  close: () => void;
}

export interface ClosablePopoverProps {
  opened?: boolean;
  initiallyOpened?: boolean;
  target: React.ReactNode;
  onOpen?: Function;
  onClose?: Function;
  closeOnMouseLeave?: boolean;
  content: Function;
  className?: string;
}
