---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Wireflux"
  text: "CLI tool to generate fetch clients from OpenAPI schemas"
  tagline: A CLI tool for generating type-safe fetch clients from OpenAPI specifications.
  actions:
    - theme: brand
      text: Get Started
      link: /getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/souravrax/wireflux

features:
  - title: "Type-Safe API"
    details: "Generate fully typed fetch clients from your OpenAPI specification with TypeScript support and Zod schema validation."
  - title: "Result Pattern"
    details: "Built-in error handling using the Result pattern - no more uncaught exceptions. Every API call returns Result<T, E>."
  - title: "Configurable & Flexible"
    details: "Bring your own fetch client and error handling. Customize the generated client with a simple configuration file."
---
