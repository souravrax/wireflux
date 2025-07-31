// Main exports for Wireflux

export { defineConfig } from "./config";
export type {
  WirefluxConfig,
  Result,
  UserFetchClient,
  UserApiError,
} from "./types";
export { generateFromConfig } from "./generator";
