import fs from 'node:fs';
import path, { resolve } from 'node:path';
import { register } from 'ts-node';
import type { WirefluxConfig } from './types';

/**
 * Supported config file names in order of preference
 */
const CONFIG_FILES = ['wireflux.config.ts', 'wireflux.config.js'] as const;

/**
 * Find a config file in the current working directory
 * @param customPath - Optional custom path to config file
 * @returns Path to the config file or null if not found
 */
export function findConfigFile(customPath?: string): string | null {
  const cwd = process.cwd();

  if (customPath) {
    const resolvedPath = path.resolve(cwd, customPath);
    return fs.existsSync(resolvedPath) ? resolvedPath : null;
  }

  // Try default config files in order
  for (const configFile of CONFIG_FILES) {
    const configPath = path.resolve(cwd, configFile);
    if (fs.existsSync(configPath)) {
      return configPath;
    }
  }

  return null;
}

/**
 * Load configuration from a TypeScript or JavaScript file
 * @param configPath - Path to the config file
 * @returns The loaded configuration
 */
export function loadConfig(configPath: string): WirefluxConfig {
  const ext = path.extname(configPath);

  try {
    // For TypeScript files, register ts-node first
    if (ext === '.ts') {
      // Register ts-node for TypeScript support
      register({
        transpileOnly: true,
        compilerOptions: {
          module: 'CommonJS',
          allowSyntheticDefaultImports: true,
          esModuleInterop: true,
        },
      });
    }

    // For both TypeScript and JavaScript files, use require after clearing cache
    const resolvedPath = resolve(configPath);

    // Clear require cache to ensure fresh load
    delete require.cache[resolvedPath];

    const configModule = require(resolvedPath);
    return configModule.default || configModule;
  } catch (error) {
    throw new Error(`Failed to load config from ${configPath}: ${error}`);
  }
}
