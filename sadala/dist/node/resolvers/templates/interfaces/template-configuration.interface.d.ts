export interface TemplateConfiguration {
    template: string;
    scope?: {
        [index: string]: any;
    };
    style?: string;
}
