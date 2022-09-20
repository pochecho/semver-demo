export function curry(fn: Function) {
  return function curried(this: any, ...args: any[]) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function (this: any, ...args2: any[]) {
        return curried.apply(this, args.concat(args2));
      };
    }
  };
}

export function clone(message: any) {
  if (Array.isArray(message)) {
    return [...message];
  }
  if (typeof message === "object") {
    return { ...message };
  }
  return message;
}
