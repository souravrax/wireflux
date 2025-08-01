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

export const tryCatchAsync = async <T>(
	fn: () => Promise<T>,
): Promise<{ error: Error; value: null } | { error: null; value: T }> => {
	try {
		return { error: null, value: await fn() };
	} catch (error) {
		return { error: error as Error, value: null };
	}
};

export const tryCatch = <T>(
	fn: () => T,
): { error: Error; value: null } | { error: null; value: T } => {
	try {
		return { error: null, value: fn() };
	} catch (error) {
		return { error: error as Error, value: null };
	}
};
