// Utility functions for string manipulation

export function toPascalCase(name: string): string {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export function toCamelCase(name: string): string {
  return name.charAt(0).toLowerCase() + name.slice(1);
}

export function getFunctionName(operationId: string): string {
  return toPascalCase(operationId);
}

export function getClientFunctionName(operationId: string): string {
  return toCamelCase(operationId);
}
