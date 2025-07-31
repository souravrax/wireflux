import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Wireflux',
  description: 'CLI tool to generate fetch clients from OpenAPI schemas',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/getting-started' },
      { text: 'API Reference', link: '/api' },
      { text: 'Examples', link: '/api-examples' },
    ],

    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'Introduction', link: '/getting-started' },
          { text: 'Configuration', link: '/configuration' },
          { text: 'CLI Usage', link: '/cli' },
        ],
      },
      {
        text: 'Reference',
        items: [
          { text: 'API Reference', link: '/api' },
          { text: 'Code Examples', link: '/api-examples' },
          { text: 'FAQ', link: '/faq' },
        ],
      },
      {
        text: 'Community',
        items: [
          { text: 'Contributing', link: '/contributing' },
          { text: 'Changelog', link: '/changelog' },
        ],
      },
      {
        text: 'Legal',
        items: [
          { text: 'License', link: '/license' },
          { text: 'Security Policy', link: '/security' },
          { text: 'Privacy Policy', link: '/privacy' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ternarysearch/wireflux' },
    ],

    footer: {
      message: 'Released under the ISC License.',
      copyright: 'Copyright © 2024 Wireflux Contributors',
    },

    editLink: {
      pattern: 'https://github.com/ternarysearch/wireflux/edit/main/docs/:path',
      text: 'Edit this page on GitHub',
    },

    search: {
      provider: 'local',
    },
  },
});
