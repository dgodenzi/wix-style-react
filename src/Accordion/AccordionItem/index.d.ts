import * as React from 'react';

export interface AccordionItemProps {
  title?: React.ReactNode;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  expandLabel?: React.ReactNode;
  collapseLabel?: React.ReactNode;
  buttonType?: AccordionItemButtonType;
  skin?: 'light' | 'standard';
  className?: string;
}

export default class AccordionItem extends React.Component<
  AccordionItemProps
> {}
