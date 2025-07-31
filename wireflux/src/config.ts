import { WirefluxConfig } from "./types";

/**
 * Define configuration for Wireflux
 * @param config - The wireflux configuration
 * @returns The configuration object
 */
export function defineConfig(config: WirefluxConfig): WirefluxConfig {
  return config;
}

/**
 * Default configuration values
 */
export const DEFAULT_CONFIG: Partial<WirefluxConfig> = {
  supportedMethods: [
    "get",
    "post",
    "put",
    "delete",
    "patch",
    "options",
    "head",
  ] as const,
  includeTypes: true,
};
