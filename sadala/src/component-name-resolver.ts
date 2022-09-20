export function resolveComponentName(prefix: string, componentClass: any) {
  return `${prefix}-${componentClass.identifierName}`;
}
