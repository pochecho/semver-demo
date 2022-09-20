import { BaseConfiguration } from '@bancolombia/sadala';
export interface BaseAccordionConfiguration extends BaseConfiguration {
  kind: "super basic" | "basic" | "informative" | "columns" | "advanced";
  mainIcon: string;
}
export interface SuperBasicAccordionConfiguration
  extends BaseAccordionConfiguration {}

export interface BasicAccordionConfiguration
  extends BaseAccordionConfiguration {
  title: string;
}

export interface InformativeAccordionConfiguration
  extends BaseAccordionConfiguration {
  complementaryText: string;
  informativeText: string;
}

export interface ColumnsAccordionConfiguration
  extends BaseAccordionConfiguration {}

export interface AdvancedAccordionConfiguration
  extends BasicAccordionConfiguration {
  subtitle: string;
  extraIcons: Array<string>
}

export type AccordionConfiguration =
  | SuperBasicAccordionConfiguration
  | BasicAccordionConfiguration
  | InformativeAccordionConfiguration
  | ColumnsAccordionConfiguration
  | AdvancedAccordionConfiguration;

