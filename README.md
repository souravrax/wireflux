# Wireflux Workspace

This is a pnpm workspace containing the Wireflux CLI tool and examples.

## Structure

```
wireflux-workspace/
├── packages/
│   └── wireflux/          # The main CLI package
├── examples/              # Example configurations and implementations
└── pnpm-workspace.yaml    # Workspace configuration
```

## Development

### Setup

```bash
pnpm install
```

### Build the CLI

```bash
pnpm build
```

### Use the CLI locally (as if installed via npm)

```bash
# Initialize a new config
pnpm wireflux init

# Generate from config
pnpm wireflux generate

# Generate with custom config
pnpm wireflux generate -c examples/wireflux.config.js
```

### Development with watch mode

```bash
pnpm dev
```

### Working with specific packages

```bash
# Install deps for wireflux package only
pnpm --filter wireflux install

# Build wireflux package only
pnpm --filter wireflux build

# Run scripts for wireflux package
pnpm --filter wireflux dev
```

## Package Commands

The workspace root provides these convenience commands:

- `pnpm build` - Build all packages
- `pnpm dev` - Start all packages in watch mode
- `pnpm wireflux <args>` - Run the CLI as if installed via npm
- `pnpm cli <args>` - Alias for working with the wireflux package

## Examples

The `examples/` directory contains:

- Sample OpenAPI schema (`openapi.json`)
- Example configurations (`wireflux.config.js`)
- Reference implementations (`super-fetch.ts`, `api-error.ts`)
- Generated output (`generated/`)

## Publishing

To publish the CLI package:

```bash
cd packages/wireflux
pnpm publish
```
