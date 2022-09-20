import { BaseComponent } from "../../base.component";
import { StageHandler } from "./stageHandler";

export class AttributeChangedEvent {
  static identifier = "attribute-changed";
  static create(attribute: string, previousValue: any, value: string) {
    return new CustomEvent(AttributeChangedEvent.identifier, {
      cancelable: false,
      detail: {
        attribute,
        previousValue,
        value,
      },
    });
  }
}

export class AttributeHomologationStage implements StageHandler {
  component: BaseComponent<any, any>;
  attributeHomologationCalls: Array<{
    attributeName: string;
    origin: "programatic" | "inline";
    value: any;
  }>;
  constructor(component: BaseComponent<any, any>) {
    this.component = component;
    this.attributeHomologationCalls = [];
  }
  init() {
    const emptyConfiguration = this.createDefaultConfiguration(
      this.component.attributesNames
    );

    this.setConfiguration(emptyConfiguration);
    // (this.component as any).attributeChangedCallback = (
    //   name: string,
    //   oldValue: any,
    //   newValue: any
    // ) => {
    //   this.attributeChangedCallback(name, oldValue, newValue);
    // };
  }

  private createDefaultConfiguration(attributeList: Array<string>) {
    return attributeList.reduce((previousValue: any, currentValue: string) => {
      previousValue[currentValue] = null;
      return previousValue;
    }, {});
  }
  private homologate(
    name: string,
    oldValue: any,
    newValue: any,
    previusCallKind: "programatic" | "inline",
    callKind: "programatic" | "inline",
    transformDataFunction: Function,
    homologationFunction: Function
  ) {
    const isInAttributeHomologationCallsIndex =
      this.attributeHomologationCalls.findIndex((x: any) => {
        return x.attributeName === name;
      });
    const parsedValue = transformDataFunction(newValue);

    if (isInAttributeHomologationCallsIndex >= 0) {
      const previusCall =
        this.attributeHomologationCalls[isInAttributeHomologationCallsIndex];

      if (previusCall?.origin !== previusCallKind) {
        this.component.configurationRef[name as string] = parsedValue;
        this.component.dispatchEvent(
          AttributeChangedEvent.create(name, oldValue, newValue)
        );
      } else {
        this.attributeHomologationCalls.splice(
          isInAttributeHomologationCallsIndex,
          1
        );
      }
    } else {
      this.attributeHomologationCalls.push({
        attributeName: name,
        origin: callKind,
        value: parsedValue,
      });
      homologationFunction(name, oldValue, newValue, parsedValue);
    }
  }

  attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    this.homologate(
      name,
      oldValue,
      newValue,
      "programatic",
      "inline",
      (data: any) => this.fromString(data),
      (name: string, oldValue: any, originValue: any, parsedValue: any) => {
        this.component.dispatchEvent(
          AttributeChangedEvent.create(name, oldValue, parsedValue)
        );
        this.component.state[name] = parsedValue;
        this.component.configurationRef[name] = parsedValue;
      }
    );
  }

  toString(data: any) {
    if (typeof data !== "string") {
      return JSON.stringify(data);
    }
    return data;
  }

  fromString(data: string): any {
    try {
      const result = JSON.parse(data);
      if (typeof result !== "object") {
        return data;
      }
      return result;
    } catch (error) {
      return data;
    }
  }

  private setConfiguration(configuration: any): any {
    this.component.configurationRef = new Proxy(
      { ...configuration },
      {
        set: (target, property, value) => {
          this.component.loggingHelper.group(
            `Configuration Changed (Proxy) ${this.component.constructor.name}`
          );
          const loggingObject: any = {
            Target: target,
            Property: property,
            OldValue: target[property],
          };

          if (value instanceof Promise) {
            value.then((x) => {
              loggingObject["value"] = x;
              this.component.loggingHelper.log(loggingObject);
              this.component.loggingHelper.groupEnd();
              target[property] = x;
              this.perfomAction(x, property, target);
            });
          } else {
            loggingObject["value"] = value;
            this.component.loggingHelper.log(loggingObject);
            this.component.loggingHelper.groupEnd();
            target[property] = value;
            this.perfomAction(value, property, target);
          }
          return true;
        },
      }
    );
    return this.component.configurationRef;
  }

  private perfomAction(value: any, property: string | symbol, target: any) {
    this.homologate(
      property as string,
      { ...target }[property],
      value,
      "inline",
      "programatic",
      (data: any) => this.toString(data),
      (name: string, oldValue: any, originValue: any, parsedValue: any) => {
        this.component.dispatchEvent(
          AttributeChangedEvent.create(name, oldValue, originValue)
        );
        this.component.state[property] = value;
        this.component.setAttribute(name, parsedValue);
      }
    );
  }
}
