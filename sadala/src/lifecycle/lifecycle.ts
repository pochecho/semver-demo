export const lifeCycleOrder = [
  "attribute-homologation",
  "state-initialization",
  "base-template-configuration",
];
export enum LifeCycleStages {
  attributeHomologation = "attribute-homologation",
  stateInitialization = "state-initialization",
  baseTemplateConfiguration = "base-template-configuration",
}

export type LifeCycleTriggers = "before-connection" | "after-connection";
export type LifeCycle = {
  [index in LifeCycleStages]?: {
    callback: Function;
    trigger: LifeCycleTriggers;
  };
};
