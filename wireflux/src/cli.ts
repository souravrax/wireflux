#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Command } from 'commander';
import { loadConfig } from './config-loader.js';
import { generateFromConfig } from './generator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageJson = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../package.json'), 'utf8')
);

const program = new Command();

program
  .name('wireflux')
  .description(packageJson.description)
  .version(packageJson.version);

program
  .command('generate')
  .description('Generate fetch client from wireflux config file')
  .option('-c, --config <path>', 'Path to config file')
  .action(async (options) => {
    try {
      const config = await loadConfig(options.config);

      console.log('✅ Config loaded successfully');
      console.log('🚀 Generating API client...');
      await generateFromConfig(config);
      console.log('✅ API client generated successfully');
    } catch (error) {
      console.error(
        '❌ Generation failed:',
        error instanceof Error ? error.message : String(error)
      );
      if (process.env.DEBUG) {
        console.error(error);
      }
      process.exit(1);
    }
  });

program
  .command('init')
  .description('Initialize a new wireflux config file')
  .option('--js', 'Create JavaScript config file instead of TypeScript')
  .action((options) => {
    const isJs = options.js;
    const configFileName = isJs ? 'wireflux.config.js' : 'wireflux.config.ts';
    const configPath = path.resolve(process.cwd(), configFileName);

    if (fs.existsSync(configPath)) {
      process.exit(1);
    }

    let configTemplate: string;

    if (isJs) {
      configTemplate = `const { defineConfig } = require("wireflux");

module.exports = defineConfig({
  input: "./openapi.json", // Path to your OpenAPI schema
  targetFolder: "./src/api", // Where to generate the client
  fetchClient: "./lib/fetch-client", // Your fetch client implementation
  apiError: "./lib/api-error", // Your API error class
  baseUrl: "http://localhost:3000/api",
  supportedMethods: ["get", "post", "put", "delete", "patch"],
});
`;
    } else {
      configTemplate = `import { defineConfig } from "wireflux";

export default defineConfig({
  input: "./openapi.json", // Path to your OpenAPI schema
  targetFolder: "./src/api", // Where to generate the client
  fetchClient: "./lib/fetch-client", // Your fetch client implementation
  apiError: "./lib/api-error", // Your API error class
  baseUrl: "http://localhost:3000/api",
  supportedMethods: ["get", "post", "put", "delete", "patch"],
});
`;
    }

    fs.writeFileSync(configPath, configTemplate);
  });

program.parse();
