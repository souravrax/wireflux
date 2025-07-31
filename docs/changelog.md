---
outline: deep
---

# Changelog

All notable changes to Wireflux will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Comprehensive documentation website
- API reference documentation
- FAQ and troubleshooting guide
- Code examples and best practices
- Contributing guidelines

### Changed

- Improved error handling in CLI
- Better TypeScript type definitions
- Enhanced configuration validation

### Fixed

- Configuration file loading issues
- Type generation for complex schemas

## [0.0.1] - 2024-01-XX

### Added

- Initial release of Wireflux CLI
- OpenAPI 3.0+ schema support
- TypeScript code generation
- Result pattern for error handling
- User-provided fetch client support
- Configurable HTTP methods
- Base URL configuration
- Type-safe API client generation

### Features

- **CLI Commands**:

  - `wireflux init` - Initialize configuration file
  - `wireflux generate` - Generate fetch client from OpenAPI schema
  - Support for TypeScript and JavaScript configurations

- **Core Functionality**:

  - Parse OpenAPI 3.0+ specifications (JSON format)
  - Generate typed fetch functions for each API operation
  - Support for path parameters, query parameters, and request bodies
  - Custom fetch client integration with Result pattern
  - User-defined API error class integration

- **Configuration Options**:

  - `input` - OpenAPI schema file path or URL
  - `targetFolder` - Output directory for generated files
  - `fetchClient` - Path to user's fetch client implementation
  - `apiError` - Path to user's API error class
  - `supportedMethods` - HTTP methods to generate (optional)
  - `baseUrl` - API base URL (optional)
  - `includeTypes` - Include TypeScript types (optional)

- **Type Safety**:
  - Full TypeScript support with generated interfaces
  - Zod schema validation for runtime type checking
  - Result<T, E> pattern for explicit error handling
  - Type-safe request/response models

### Requirements

- Node.js 18 or higher
- TypeScript support (optional but recommended)
- User must provide fetch client returning Result<T, E>
- User must provide API error class extending Error

---

## Version History

### Versioning Strategy

Wireflux follows semantic versioning:

- **MAJOR** version when making incompatible API changes
- **MINOR** version when adding functionality in a backward compatible manner
- **PATCH** version when making backward compatible bug fixes

### Release Schedule

- **Patch releases**: As needed for critical bug fixes
- **Minor releases**: Monthly for new features and improvements
- **Major releases**: Quarterly or when breaking changes are necessary

### Upgrade Guide

#### From 0.0.x to 0.1.x (When Available)

Future upgrade instructions will be provided here when new versions are released.

### Breaking Changes

None yet - this is the initial release.

### Deprecations

None yet - this is the initial release.

### Security Updates

Security updates will be clearly marked in the changelog and released as patch versions immediately when identified.

---

## Release Notes Format

Each release includes:

- **Added**: New features
- **Changed**: Changes in existing functionality
- **Deprecated**: Soon-to-be removed features
- **Removed**: Removed features
- **Fixed**: Bug fixes
- **Security**: Security vulnerability fixes

### Contribution

To suggest changes for the changelog:

1. Follow the [contributing guidelines](./contributing.md)
2. Include changelog updates in your pull request
3. Use the same format as existing entries
4. Be clear and concise in descriptions

### Links

- [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
- [Semantic Versioning](https://semver.org/spec/v2.0.0.html)
- [GitHub Releases](https://github.com/ternarysearch/wireflux/releases)
- [npm Package](https://www.npmjs.com/package/wireflux)
