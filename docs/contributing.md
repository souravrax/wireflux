---
outline: deep
---

# Contributing to Wireflux

Thank you for your interest in contributing to Wireflux! This guide will help you get started with contributing to the project.

## Development Setup

### Prerequisites

- Node.js 18 or higher
- pnpm (recommended) or npm
- Git

### Getting Started

1. **Fork and Clone**

```bash
git clone https://github.com/your-username/wireflux.git
cd wireflux
```

2. **Install Dependencies**

```bash
pnpm install
# or
npm install
```

3. **Build the Project**

```bash
pnpm build
# or
npm run build
```

4. **Run Tests**

```bash
pnpm test
# or
npm test
```

## Project Structure

```
wireflux/
├── wireflux/                 # Main package
│   ├── src/
│   │   ├── cli.ts           # CLI implementation
│   │   ├── config.ts        # Configuration utilities
│   │   ├── generator.ts     # Code generation logic
│   │   ├── types.ts         # TypeScript types
│   │   └── utils.ts         # Utility functions
│   └── package.json
├── example/                  # Example implementation
│   ├── openapi.json         # Sample OpenAPI schema
│   ├── wireflux.config.ts   # Example configuration
│   ├── super-fetch.ts       # Example fetch client
│   └── api-error.ts         # Example error class
├── docs/                    # Documentation
└── package.json             # Workspace configuration
```

## How to Contribute

### 1. Reporting Issues

Before creating an issue, please:

- Search existing issues to avoid duplicates
- Provide a clear, descriptive title
- Include steps to reproduce the issue
- Share your environment details (Node.js version, OS, etc.)
- Include relevant code samples and error messages

**Issue Template:**

```markdown
## Description

Brief description of the issue

## Steps to Reproduce

1. Step one
2. Step two
3. Step three

## Expected Behavior

What you expected to happen

## Actual Behavior

What actually happened

## Environment

- Node.js version:
- OS:
- Wireflux version:

## Additional Context

Any other relevant information
```

### 2. Feature Requests

When requesting a feature:

- Explain the use case and problem it solves
- Provide examples of how the feature would be used
- Consider backward compatibility implications
- Be open to alternative solutions

### 3. Code Contributions

#### Pull Request Process

1. **Create a Feature Branch**

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/issue-description
```

2. **Make Your Changes**

- Follow the coding standards (see below)
- Add tests for new functionality
- Update documentation as needed
- Ensure all tests pass

3. **Commit Your Changes**

Use conventional commit messages:

```bash
git commit -m "feat: add support for custom headers in fetch client"
git commit -m "fix: handle empty OpenAPI schemas gracefully"
git commit -m "docs: update configuration examples"
```

4. **Push and Create PR**

```bash
git push origin feature/your-feature-name
```

Then create a pull request on GitHub.

#### Commit Message Format

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**

```
feat(cli): add support for JavaScript config files
fix(generator): handle optional parameters correctly
docs(api): update Result type documentation
```

## Coding Standards

### TypeScript Guidelines

- Use TypeScript strict mode
- Provide explicit types for function parameters and return values
- Use meaningful variable and function names
- Prefer `const` over `let` when possible
- Use async/await over Promises where appropriate

```typescript
// Good
async function generateClientCode(
  schema: OpenAPIV3.Document,
  config: WirefluxConfig
): Promise<string> {
  // Implementation
}

// Avoid
function generateClientCode(schema: any, config: any) {
  return new Promise((resolve) => {
    // Implementation
  });
}
```

### Code Organization

- Keep functions focused and single-purpose
- Use barrel exports (`index.ts`) for clean imports
- Group related functionality in modules
- Write descriptive comments for complex logic

```typescript
// Good - focused function
function validateOpenApiSchema(schema: unknown): OpenAPIV3.Document {
  // Validation logic
}

function generateTypeDefinitions(schema: OpenAPIV3.Document): string {
  // Type generation logic
}

// Avoid - doing too much in one function
function processSchema(schema: unknown): string {
  // Validation + type generation + file writing
}
```

### Error Handling

- Use the Result pattern consistently
- Provide meaningful error messages
- Handle edge cases gracefully

```typescript
// Good
function parseConfig(configPath: string): Result<WirefluxConfig, ConfigError> {
  try {
    const config = loadConfigFile(configPath);
    return { data: config, error: null };
  } catch (error) {
    return {
      data: null,
      error: new ConfigError(`Failed to parse config: ${error.message}`),
    };
  }
}
```

## Testing

### Writing Tests

- Write tests for all new functionality
- Include edge cases and error scenarios
- Use descriptive test names
- Group related tests using `describe` blocks

```typescript
describe("generateClientCode", () => {
  it("should generate valid TypeScript code for simple schema", () => {
    // Test implementation
  });

  it("should handle schemas with no operations", () => {
    // Test implementation
  });

  it("should throw error for invalid schema", () => {
    // Test implementation
  });
});
```

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

## Documentation

### Documentation Standards

- Keep documentation up-to-date with code changes
- Use clear, concise language
- Provide practical examples
- Include code samples that actually work

### Building Documentation

```bash
# Install documentation dependencies
cd docs
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
```

### Documentation Structure

- **Getting Started**: Basic usage and setup
- **Configuration**: All configuration options
- **CLI**: Command-line interface documentation
- **API**: Type definitions and interfaces
- **Examples**: Practical usage examples
- **FAQ**: Common questions and troubleshooting

## Release Process

### Versioning

We follow [Semantic Versioning](https://semver.org/):

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Release Checklist

1. Update version in `package.json`
2. Update `CHANGELOG.md`
3. Ensure all tests pass
4. Update documentation if needed
5. Create git tag and push
6. Publish to npm

## Getting Help

### Community

- **GitHub Discussions**: For questions and general discussion
- **Issues**: For bug reports and feature requests
- **Discord/Slack**: [Coming soon]

### Maintainers

Current maintainers:

- [@maintainer1](https://github.com/maintainer1)
- [@maintainer2](https://github.com/maintainer2)

## Code of Conduct

### Our Pledge

We pledge to make participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards

**Positive behavior includes:**

- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

**Unacceptable behavior includes:**

- The use of sexualized language or imagery
- Trolling, insulting/derogatory comments, and personal or political attacks
- Public or private harassment
- Publishing others' private information without explicit permission
- Other conduct which could reasonably be considered inappropriate

### Enforcement

Project maintainers are responsible for clarifying standards and are expected to take appropriate and fair corrective action in response to any instances of unacceptable behavior.

## Recognition

Contributors will be recognized in:

- `CONTRIBUTORS.md` file
- Release notes
- Project README
- Annual contributor appreciation posts

## Thank You

Your contributions help make Wireflux better for everyone. Whether you're fixing bugs, adding features, improving documentation, or helping other users, every contribution is valuable and appreciated!
