import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Wireflux',
  description: 'CLI tool to generate fetch clients from OpenAPI schemas',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' },
    ],

    sidebar: [
      {
        text: 'Docs',
        items: [
          { text: 'Getting Started', link: '/getting-started' },
          { text: 'CLI', link: '/cli' },
          { text: 'API', link: '/api' },
          { text: 'FAQ', link: '/faq' },
          { text: 'Contributing', link: '/contributing' },
          { text: 'Changelog', link: '/changelog' },
          { text: 'License', link: '/license' },
          { text: 'Security', link: '/security' },
          { text: 'Privacy', link: '/privacy' },
        ],
      },
      {
        text: 'Guide',
        items: [
          { text: 'Getting Started', link: '/getting-started' },
          { text: 'Configuration', link: '/configuration' },
          { text: 'CLI', link: '/cli' },
        ],
      },
      {
        text: 'Examples',
        items: [{ text: 'API Examples', link: '/api-examples' }],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ternarysearch/wireflux' },
    ],
  },
});
