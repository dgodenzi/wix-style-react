import { modalsSymbols } from '../symbols';
import { modalsComponentsNames as componentsNames } from '../components';

/**
 * Symbol => Component 9
 */
export const modalsSymbolsToComponents = {
  [modalsSymbols.alert]: [
    componentsNames.MessageBoxFunctionalLayout,
    componentsNames.Modal,
  ],
  [modalsSymbols.announcement]: [
    componentsNames.AnnouncementModalLayout,
    componentsNames.Modal,
  ],
  [modalsSymbols.custom]: [
    componentsNames.CustomModalLayout,
    componentsNames.Modal,
  ],
  [modalsSymbols.preview]: [
    componentsNames.ModalPreviewLayout,
    componentsNames.Modal,
  ],
  [modalsSymbols.mobile]: [
    componentsNames.ModalMobileLayout,
    componentsNames.Modal,
  ],
};
