#!/usr/bin/env node

import { Command } from "commander";
import path from "path";
import fs from "fs";
import { generateFromConfig } from "./generator";
import { WirefluxConfig } from "./types";

const program = new Command();

program
  .name("wireflux")
  .description("Generate fetch clients from OpenAPI schemas")
  .version("1.0.0");

program
  .command("generate")
  .description("Generate fetch client from wireflux.config.ts")
  .option("-c, --config <path>", "Path to config file", "wireflux.config.ts")
  .action(async (options) => {
    try {
      const configPath = path.resolve(process.cwd(), options.config);

      if (!fs.existsSync(configPath)) {
        console.error(`❌ Config file not found: ${configPath}`);
        console.log(
          `💡 Create a ${options.config} file using defineConfig from wireflux`
        );
        process.exit(1);
      }

      console.log(`📖 Loading config from: ${configPath}`);

      // Dynamic import to load the config
      const configModule = await import(configPath);
      const config: WirefluxConfig = configModule.default || configModule;

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
  .description("Initialize a new wireflux.config.ts file")
  .action(() => {
    const configPath = path.resolve(process.cwd(), "wireflux.config.ts");

    if (fs.existsSync(configPath)) {
      console.error(`❌ Config file already exists: ${configPath}`);
      process.exit(1);
    }

    const configTemplate = `import { defineConfig } from "wireflux";

export default defineConfig({
  input: "./openapi.json", // Path to your OpenAPI schema
  targetFolder: "./src/api", // Where to generate the client
  fetchClient: "./lib/fetch-client", // Your fetch client implementation
  apiError: "./lib/api-error", // Your API error class
  baseUrl: "http://localhost:3000/api",
  supportedMethods: ["get", "post", "put", "delete", "patch"],
});
`;

    fs.writeFileSync(configPath, configTemplate);
    console.log(`✅ Created ${configPath}`);
    console.log(
      `💡 Edit the config file and run 'wireflux generate' to get started!`
    );
  });

program.parse();
