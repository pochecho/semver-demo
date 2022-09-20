export declare const lifeCycleOrder: string[];
export declare enum LifeCycleStages {
    attributeHomologation = "attribute-homologation",
    stateInitialization = "state-initialization",
    baseTemplateConfiguration = "base-template-configuration"
}
export declare type LifeCycleTriggers = "before-connection" | "after-connection";
export declare type LifeCycle = {
    [index in LifeCycleStages]?: {
        callback: Function;
        trigger: LifeCycleTriggers;
    };
};
