import * as React from 'react';

export type PreviewWidgetSkin = 'neutral' | 'gradient' | 'custom';
export type PreviewWidgetContentOutline = 'shadow' | 'border';

export interface PreviewWidgetProps {
  dataHook?: string;
  className?: string;
  skin?: PreviewWidgetSkin;
  contentOutline?: PreviewWidgetContentOutline;
  backgroundColor?: string;
  height?: string;
  width?: string;
  children: React.ReactNode;
}

declare const PreviewWidget: React.ComponentClass<PreviewWidgetProps>;

export default PreviewWidget;
