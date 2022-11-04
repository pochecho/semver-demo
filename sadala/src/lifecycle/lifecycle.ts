export const lifeCycleOrder = [
  "attribute-homologation",
  "state-initialization",
  "template-configuration",
];
export enum LifeCycleStages {
  attributeHomologation = "attribute-homologation",
  stateInitialization = "state-initialization",
  TemplateConfiguration = "template-configuration",
}

export type LifeCycleTriggers = "before-connection" | "after-connection";
export type LifeCycle = {
  [index in LifeCycleStages]?: {
    callback: Function;
    trigger: LifeCycleTriggers;
  };
};
