import { Icon } from "../icon/icon.component";
import { resolveComponentName } from "../../framework/component-name-resolver";
export const ACCORDION_SELECTORS = {
  "toggle-button": `header > section:nth-child(2n) > ${resolveComponentName(
    Icon
  )}`,
};
