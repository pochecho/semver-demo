import { BaseConfiguration } from "@bancolombia/sadala";

export interface InputSelectItems {
  display: string;
  value: any;
}

export interface InputSelectConfiguration extends BaseConfiguration {
  items: Array<InputSelectItems>;
  label: string;
}
