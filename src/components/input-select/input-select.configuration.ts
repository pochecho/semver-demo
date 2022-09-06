export interface InputSelectItems {
  display: string;
  value: any;
}

export interface InputSelectConfiguration {
  items: Array<InputSelectItems> | Promise<Array<InputSelectItems>>;
  label: string;
}
