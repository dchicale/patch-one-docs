// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'PatchOne',
  tagline: 'Windows software update management for Brazilian SMEs',
  favicon: 'img/favicon.svg',

  url: 'https://docs.patch-one.com',
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
        title: 'PatchOne',
        logo: {
          alt: 'PatchOne Logo',
          src: 'img/logo.svg',
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
        copyright: `Copyright © ${new Date().getFullYear()} PatchOne. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['bash', 'powershell', 'ini', 'python', 'docker', 'json'],
      },
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
    }),
};

export default config;
