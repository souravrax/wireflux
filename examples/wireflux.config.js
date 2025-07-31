const { defineConfig } = require("wireflux");

module.exports = defineConfig({
  input: "./openapi.json", // Path to your OpenAPI schema
  targetFolder: "./generated", // Where to generate the client
  fetchClient: "./super-fetch", // Your fetch client implementation
  apiError: "./api-error", // Your API error class
  baseUrl: "http://localhost:3000/api",
  supportedMethods: ["get", "post", "put", "delete", "patch"],
});
