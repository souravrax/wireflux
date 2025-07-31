---
outline: deep
---

# Security Policy

This document outlines the security policy for Wireflux and provides guidance on reporting security vulnerabilities.

## Supported Versions

We provide security updates for the following versions:

| Version | Supported |
| ------- | --------- |
| 0.0.x   | ✅ Yes    |

As new major versions are released, we will update this table to reflect our support policy.

## Reporting a Vulnerability

If you discover a security vulnerability in Wireflux, please report it responsibly:

### 🔒 **Private Disclosure**

**DO NOT** create a public GitHub issue for security vulnerabilities.

Instead, please email us at: **security@ternarysearch.com**

### 📧 **What to Include**

Please include the following information in your report:

1. **Description**: A clear description of the vulnerability
2. **Impact**: How the vulnerability could be exploited
3. **Steps to Reproduce**: Detailed steps to reproduce the issue
4. **Environment**: Version of Wireflux, Node.js, and OS
5. **Proof of Concept**: Code or commands that demonstrate the issue (if safe to share)

### ⏱️ **Response Timeline**

- **Acknowledgment**: Within 48 hours
- **Initial Assessment**: Within 1 week
- **Fix Timeline**: Depends on severity (see below)
- **Public Disclosure**: After fix is released and users have time to update

### 🚨 **Severity Levels**

#### Critical (Score: 9.0-10.0)

- **Timeline**: Fix within 1-2 days
- **Examples**: Remote code execution, arbitrary file access
- **Response**: Immediate patch release

#### High (Score: 7.0-8.9)

- **Timeline**: Fix within 1 week
- **Examples**: Authentication bypass, privilege escalation
- **Response**: Patch release within days

#### Medium (Score: 4.0-6.9)

- **Timeline**: Fix within 2-4 weeks
- **Examples**: Information disclosure, denial of service
- **Response**: Include in next scheduled release or patch

#### Low (Score: 0.1-3.9)

- **Timeline**: Fix within 1-3 months
- **Examples**: Minor information leaks
- **Response**: Include in next minor release

## Security Considerations

### Generated Code Security

When using Wireflux, consider these security aspects:

#### 🔐 **Authentication & Authorization**

```typescript
// Implement secure authentication in your fetch client
export async function fetchClient<T>(
  url: string,
  init?: RequestInit
): Promise<Result<T, ApiError>> {
  // Get token securely (not from localStorage in production)
  const token = await getSecureToken();

  return fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });
}
```

#### 🌐 **CORS and Origins**

- Configure CORS properly on your API server
- Don't include sensitive data in generated clients for browser use
- Use environment variables for API URLs

```typescript
// Good: Use environment variables
export default defineConfig({
  baseUrl: process.env.API_BASE_URL,
  // ...
});

// Avoid: Hardcoded URLs with sensitive info
export default defineConfig({
  baseUrl: "https://internal-api.company.com/secret",
  // ...
});
```

#### 🔍 **Input Validation**

While Wireflux generates type-safe clients, always validate on the server:

```typescript
// Your API should validate all inputs
app.post("/users", (req, res) => {
  const result = userSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: "Invalid input" });
  }
  // Process validated data
});
```

#### 🗝️ **Secrets Management**

- Never commit API keys or secrets to version control
- Use environment variables or secret management services
- Don't include secrets in generated code

### CLI Security

#### 📁 **File System Access**

Wireflux needs to read configuration files and write generated code:

- Only runs with user permissions
- Reads from specified configuration files
- Writes only to specified target directories
- Does not access files outside project scope

#### 🌍 **Network Access**

When using remote OpenAPI schemas:

- Only makes HTTP/HTTPS requests to specified URLs
- Does not send data to external services
- Recommend downloading schemas locally for production use

#### 📦 **Dependencies**

We regularly audit our dependencies:

- Use `npm audit` to check for known vulnerabilities
- Update dependencies promptly when security updates are available
- Minimize dependency footprint

## Best Practices

### For Users

1. **Keep Wireflux Updated**

   ```bash
   npm update wireflux
   ```

2. **Secure Your Fetch Client**

   - Implement proper authentication
   - Use HTTPS for all API calls
   - Handle errors securely (don't expose sensitive info)

3. **Environment Configuration**

   ```typescript
   // Use environment-specific configs
   export default defineConfig({
     input: "./openapi.json",
     targetFolder: "./src/api",
     fetchClient: "./lib/fetch-client",
     apiError: "./lib/api-error",
     baseUrl:
       process.env.NODE_ENV === "production"
         ? "https://api.example.com"
         : "http://localhost:3000",
   });
   ```

4. **Generated Code Security**
   - Review generated code before committing
   - Don't include sensitive data in type definitions
   - Use proper error handling

### For Contributors

1. **Secure Development**

   - Use dependency scanning tools
   - Follow secure coding practices
   - Validate all inputs in CLI commands

2. **Code Review**

   - Security review for all PRs
   - Check for potential vulnerabilities
   - Validate error handling

3. **Testing**
   - Include security test cases
   - Test with malicious inputs
   - Verify file system boundaries

## Security Audits

### Internal Audits

We conduct regular security reviews:

- **Code Review**: All changes reviewed for security implications
- **Dependency Audit**: Monthly dependency vulnerability checks
- **Static Analysis**: Automated security scanning

### External Audits

We welcome external security research:

- **Bug Bounty**: Currently considering a bug bounty program
- **Third-party Audits**: Open to independent security assessments
- **Community Review**: Encourage community security review

## Incident Response

In case of a confirmed security vulnerability:

1. **Immediate Response**

   - Assess impact and severity
   - Develop and test fix
   - Prepare security advisory

2. **Communication**

   - Notify users through GitHub Security Advisories
   - Update documentation with mitigation steps
   - Provide clear upgrade instructions

3. **Post-Incident**
   - Conduct post-mortem analysis
   - Improve security processes
   - Update security policies

## Contact

- **Security Issues**: security@ternarysearch.com
- **General Questions**: Open an issue on GitHub
- **Maintainers**: Listed in [CONTRIBUTORS.md](./contributing.md)

## Acknowledgments

We thank the security research community for helping keep Wireflux secure. Contributors who responsibly disclose vulnerabilities will be acknowledged (with their permission) in:

- Security advisories
- Release notes
- SECURITY.md file

---

_This security policy is reviewed and updated regularly. Last updated: [Current Date]_
