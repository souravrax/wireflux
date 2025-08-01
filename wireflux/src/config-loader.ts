import { existsSync, unlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { build } from 'esbuild';
import { z } from 'zod';

export interface WirefluxConfig {
  input: string;
  targetFolder: string;
  fetchClient: string;
  apiError: string;
  supportedMethods?: readonly string[];
  baseUrl?: string;
  includeTypes?: boolean;
}

const configSchema = z.object({
  input: z.string(),
  targetFolder: z.string(),
  fetchClient: z.string(),
  apiError: z.string(),
  supportedMethods: z.array(z.string()).optional(),
  baseUrl: z.string().optional(),
  includeTypes: z.boolean().optional(),
});

type ConfigExport =
  | WirefluxConfig
  | { config: WirefluxConfig }
  | { default: WirefluxConfig };

export async function loadConfig(configPath?: string): Promise<WirefluxConfig> {
  const file = resolveConfigPath(configPath);
  const ext = path.extname(file);

  let configModule: ConfigExport;

  if (ext === '.ts') {
    configModule = await loadTSConfig(file);
  } else {
    const exists = existsSync(file);
    if (!exists) {
      // eslint-disable-next-line no-console
      console.error(`❌ Config file not found: ${file}`);
      process.exit(1);
    }
    // Use dynamic import for all file types to support ES modules
    const fileUrl = pathToFileURL(file).href;
    configModule = await import(fileUrl);
  }

  const config: WirefluxConfig =
    (configModule as { default?: WirefluxConfig }).default ??
    (configModule as { config?: WirefluxConfig }).config ??
    (configModule as WirefluxConfig);

  const result = configSchema.safeParse(config);
  if (!result.success) {
    // eslint-disable-next-line no-console
    console.error('Invalid config format:', result.error.format());
    process.exit(1);
  }

  console.info('✅ Config loaded successfully');

  return result.data;
}

function resolveConfigPath(provided?: string): string {
  const candidates = [
    provided,
    'wireflux.config.ts',
    'wireflux.config.js',
  ].filter(Boolean) as string[];

  for (const candidate of candidates) {
    const full = path.resolve(candidate);
    if (existsSync(full)) {
      return full;
    }
  }

  // eslint-disable-next-line no-console
  console.error(`❌ Config file not found in: ${candidates.join(', ')}`);
  process.exit(1);
}

async function loadTSConfig(tsFile: string): Promise<ConfigExport> {
  const result = await build({
    entryPoints: [tsFile],
    format: 'esm',
    target: 'node18',
    bundle: true,
    write: false,
    platform: 'node',
  });

  if (result.errors.length > 0) {
    console.error('❌ TypeScript compilation failed:', result.errors);
    process.exit(1);
  }

  // Create a temporary JS file in system temp directory
  const configName = path.basename(tsFile, '.ts');
  const tempJsFile = path.join(
    tmpdir(),
    `wireflux-${configName}-${Date.now()}.mjs`
  );
  const jsCode = result.outputFiles[0].text;

  try {
    writeFileSync(tempJsFile, jsCode);
    const fileUrl = pathToFileURL(tempJsFile).href;
    const mod = await import(fileUrl);
    return mod;
  } finally {
    // Clean up the temporary file
    if (existsSync(tempJsFile)) {
      unlinkSync(tempJsFile);
    }
  }
}
