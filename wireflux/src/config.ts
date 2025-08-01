import type { WirefluxConfig } from './types.js';

/**
 * Define configuration for Wireflux
 * @param config - The wireflux configuration
 * @returns The configuration object
 */
export function defineConfig(config: WirefluxConfig): WirefluxConfig {
  return config;
}

export const DEFAULT_ACCEPT_METHODS = [
  'get',
  'post',
  'put',
  'patch',
  'delete',
  'options',
  'head',
];
