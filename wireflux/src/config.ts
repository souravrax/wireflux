import type { WirefluxConfig } from './config-loader.js';

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
export const DEFAULT_CONFIG: WirefluxConfig = [
  {
    input: 'default/fetch-client.ts',
  }
]
