import { prefix } from "../configuration";

export function resolveComponentName(componentClass: any) {
    return `${prefix}-${componentClass.identifierName}`;
  }