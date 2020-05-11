import React from 'react';
import MoveLarge from 'wix-ui-icons-common/system/MoveLarge';
import { vars } from '../../Foundation/stylable/colors.st.css';

const DragHandle = () => <MoveLarge style={{ color: vars.D80 }} />;

DragHandle.displayName = 'MediaOverlay.DragHandle';

export default DragHandle;
