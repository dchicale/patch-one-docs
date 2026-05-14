// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  headTags: [
    {
      tagName: 'link',
      attributes: {rel: 'preconnect', href: 'https://fonts.googleapis.com'},
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: 'anonymous',
      },
    },
  ],

  title: 'PatchOne',
  tagline: 'Windows software update management for Brazilian SMEs',
  favicon: 'img/favicon.svg',

  url: 'https://patch-one.com',
  baseUrl: '/',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          routeBasePath: 'docs',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/patchone-social.png',
      navbar: {
        title: '',
        logo: {
          alt: 'PatchOne',
          src: 'img/logo.svg',
          srcDark: 'img/logo-dark.svg',
          style: {display: 'none', width: 0},
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'mainSidebar',
            position: 'left',
            label: 'Documentation',
          },
          {
            to: '/docs/api/overview',
            label: 'API',
            position: 'left',
          },
          {
            to: '/docs/architecture/overview',
            label: 'Architecture',
            position: 'left',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {label: 'Quick Start', to: '/docs/getting-started/quickstart'},
              {label: 'On-Premises Install', to: '/docs/installation/on-premises'},
              {label: 'Cloud Install', to: '/docs/installation/cloud'},
              {label: 'Agent Deployment', to: '/docs/installation/agent-deployment'},
            ],
          },
          {
            title: 'Reference',
            items: [
              {label: 'API Reference', to: '/docs/api/overview'},
              {label: 'Agent Configuration', to: '/docs/agent/configuration'},
              {label: 'Data Model', to: '/docs/architecture/data-model'},
            ],
          },
          {
            title: 'Security',
            items: [
              {label: 'GravityZone / AV', to: '/docs/security/gravityzone'},
              {label: 'Access Control', to: '/docs/security/access-control'},
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} <a href="https://www.securisoft.com.br" target="_blank" rel="noopener noreferrer" style="color:inherit;text-decoration:underline;text-underline-offset:3px">Securisoft</a>. PatchOne is a Securisoft product.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.vsDark,
        additionalLanguages: ['bash', 'powershell', 'ini', 'python', 'docker', 'json'],
      },
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
    }),
};

export default config;
