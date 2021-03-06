// TODO - add tooltip classic driver in the correct place
import { tooltipDriverFactory } from 'wix-ui-core/dist/src/components/tooltip/Tooltip.driver';
import textDriverFactory from '../Text/Text.driver';
import { dataHooks } from './constants';
import * as DATA_ATTR from './DataAttr';

const checkboxDriverFactory = ({ element, eventTrigger }) => {
  const byHook = hook => element.querySelector(`[data-hook*="${hook}"]`);
  const input = () => element.querySelector('input');
  const checkbox = () => element.querySelector(dataHooks.box);
  const isChecked = () => input().checked;
  const labelText = () =>
    element.querySelector(`[data-hook="${dataHooks.children}"]`);

  const labelTextDriver = () => textDriverFactory({ element: labelText() });

  const getErrorMessage = async () => {
    const tooltipTestkit = tooltipDriverFactory({
      element: byHook(dataHooks.boxTooltip),
      eventTrigger,
    });

    try {
      tooltipTestkit.mouseEnter();
      const contentElement = tooltipTestkit.getContentElement();
      tooltipTestkit.mouseLeave();
      return await contentElement.textContent;
    } catch (e) {
      throw new Error('Failed getting checkbox error message');
    }
  };

  return {
    exists: () => !!element,
    click: () =>
      eventTrigger.change(input(), { target: { checked: !isChecked() } }),
    /** trigger focus on the element */
    focus: () => eventTrigger.focus(checkbox()),
    /** trigger blur on the element */
    blur: () => eventTrigger.blur(checkbox()),
    isChecked,
    isDisabled: () => element.getAttribute(DATA_ATTR.DATA_DISABLED) === 'true',
    isIndeterminate: () =>
      element.getAttribute(DATA_ATTR.DATA_CHECK_TYPE) ===
      DATA_ATTR.CHECK_TYPES.INDETERMINATE,
    hasError: () => element.getAttribute(DATA_ATTR.DATA_HAS_ERROR) === 'true',
    getErrorMessage,
    getLabel: () => labelTextDriver().getText(),
    getLabelSize: () => labelTextDriver().getSize(),
  };
};

export default checkboxDriverFactory;
