import { Icon } from "../icon/icon.component";
import { resolveComponentName } from "@bancolombia/sadala";
import { DESIGN_SYSTEM_CONFIGURATION } from "../../desing-system.configuration";
export const ACCORDION_SELECTORS = {
  "toggle-button": `header > section:nth-child(2n) > ${resolveComponentName(
    DESIGN_SYSTEM_CONFIGURATION.prefix,
    Icon
  )}`,
};
