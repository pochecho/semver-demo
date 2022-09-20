import { isPossibleToPerform } from '../helpers/permission/permission.helpers';

export function Identifier(identifier: string) {
  return function (constructor) {
    constructor.prototype.identifier = identifier;
    constructor.identifier = identifier;
  };
}

export function Resource(value: string, permissionsData: any) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    target.identifier = value;
    const previusFunction: Function = descriptor.value;
    descriptor.value = function (this: any, ...args: any[]) {
      const userPermissions = permissionsData['flat-permissions'];
      const isAvailable = isPossibleToPerform(value, userPermissions);
      if (isAvailable) {
        return previusFunction.apply(this, args);
      }
    };
  };
}
