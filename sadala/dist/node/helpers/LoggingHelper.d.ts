export interface LogMessage {
    date: Date;
    message: string;
}
export interface GroupMessage {
    name: string;
    messages: Array<LogMessage>;
}
export declare class LoggingHelper {
    private _historical;
    isActive: boolean;
    private _group;
    constructor();
    group(name: string): void;
    groupEnd(): void;
    log: (this: any, ...args: any[]) => any;
    get historical(): (LogMessage | GroupMessage)[];
    get historicalReport(): string;
}
