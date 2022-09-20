import { clone, curry } from "./GeneralHelpers";

export interface LogMessage {
  date: Date;
  message: string;
}

export interface GroupMessage {
  name: string;
  messages: Array<LogMessage>;
}

export class LoggingHelper {
  private _historical: Array<LogMessage | GroupMessage>;
  isActive: boolean;
  private _group: GroupMessage | null;
  constructor() {
    this._historical = [];
    this.isActive = false;
    this._group = null;
  }
  group(name: string) {
    this._group = {
      name,
      messages: [],
    };
  }
  groupEnd() {
    const clonedGroup = clone(this._group);
    this._group = null;
    this._historical.push(clonedGroup);
  }
  log = curry((message: any) => {
    if (this.isActive) {
      let persist = this._historical;
      if (!!this._group) {
        persist = this._group.messages;
      }
      persist.push({
        date: new Date(),
        message: clone(message),
      });
    }
  });
  get historical() {
    return this._historical;
  }

  get historicalReport() {
    return JSON.stringify(this.historical, null, 2);
  }
}
