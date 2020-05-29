import * as React from 'react';
import { EllipsisHOCProps } from '../common/EllipsisHOC';

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    EllipsisHOCProps {
  dataHook?: string;
  className?: string;
  light?: boolean;
  appearance?: HeadingAppearance;
}

export const Heading: React.SFC<HeadingProps>;
export default Heading;
export type HeadingAppearance = 'H1' | 'H2' | 'H3' | 'H4' | 'H5' | 'H6';
