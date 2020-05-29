import * as React from 'react';

import { AccordionItemProps } from './AccordionItem';

export interface AccordionProps {
  dataHook?: string;
  multiple?: boolean;
  items?: AccordionItem[];
  skin?: 'light' | 'standard';
}

export type AccordionItemButtonType = 'textButton' | 'button';

export default class Accordion extends React.Component<AccordionProps> {}
