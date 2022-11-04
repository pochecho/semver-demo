export interface Scope {
    [index: string]: any;
}
export interface TemplateConfiguration {
    template: string;
    scope?: Scope;
    style?: string;
}
