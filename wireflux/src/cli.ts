#!/usr/bin/env node

import { Command } from "commander";
import path from "path";
import fs from "fs";
import { generateFromConfig } from "./generator";
import { WirefluxConfig } from "./types";
import { findConfigFile, loadConfig } from "./config-loader";

const packageJson = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../package.json"), "utf8")
);

const program = new Command();

program
  .name("wireflux")
  .description(packageJson.description)
  .version(packageJson.version);

program
  .command("generate")
  .description("Generate fetch client from wireflux config file")
  .option("-c, --config <path>", "Path to config file")
  .action(async (options) => {
    try {
      const configPath = await findConfigFile(options.config);

      if (!configPath) {
        console.error(`❌ Config file not found. Tried:`);
        const possibleConfigs = options.config
          ? [options.config]
          : ["wireflux.config.ts", "wireflux.config.js"];
        possibleConfigs.forEach((name) => console.log(`   - ${name}`));
        console.log(`💡 Create a config file using defineConfig from wireflux`);
        process.exit(1);
      }

      console.log(`📖 Loading config from: ${configPath}`);

      // Load the config with TypeScript support
      const config = await loadConfig(configPath);

      if (!config) {
        console.error(`❌ No default export found in config file`);
        process.exit(1);
      }

      console.log(`🚀 Starting generation...`);
      await generateFromConfig(config);
      console.log(`✅ Generation completed successfully!`);
    } catch (error) {
      console.error(`❌ Error during generation:`, error);
      process.exit(1);
    }
  });

program
  .command("init")
  .description("Initialize a new wireflux config file")
  .option("--js", "Create JavaScript config file instead of TypeScript")
  .action((options) => {
    const isJs = options.js;
    const configFileName = isJs ? "wireflux.config.js" : "wireflux.config.ts";
    const configPath = path.resolve(process.cwd(), configFileName);

    if (fs.existsSync(configPath)) {
      console.error(`❌ Config file already exists: ${configPath}`);
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
    console.log(`✅ Created ${configFileName}`);
    console.log(
      `💡 Edit the config file and run 'wireflux generate' to get started!`
    );
  });

program.parse();
