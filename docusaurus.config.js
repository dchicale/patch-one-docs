// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  markdown: {mermaid: true},
  themes: ['@docusaurus/theme-mermaid'],
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
  tagline: 'Gerenciamento de atualizações de software Windows para PMEs brasileiras',
  favicon: 'img/favicon.svg',

  url: 'https://patch-one.com',
  baseUrl: '/',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'pt-BR',
    locales: ['pt-BR', 'en'],
    localeConfigs: {
      'pt-BR': {label: 'Português (BR)', direction: 'ltr'},
      en: {label: 'English', direction: 'ltr'},
    },
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
            label: 'Documentação',
          },
          {
            to: '/docs/api/overview',
            label: 'API',
            position: 'left',
          },
          {
            to: '/docs/architecture/overview',
            label: 'Arquitetura',
            position: 'left',
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentação',
            items: [
              {label: 'Início Rápido', to: '/docs/getting-started/quickstart'},
              {label: 'Instalação On-Premises', to: '/docs/installation/on-premises'},
              {label: 'Instalação Cloud', to: '/docs/installation/cloud'},
              {label: 'Deploy do Agente', to: '/docs/installation/agent-deployment'},
            ],
          },
          {
            title: 'Referência',
            items: [
              {label: 'Referência da API', to: '/docs/api/overview'},
              {label: 'Configuração do Agente', to: '/docs/agent/configuration'},
              {label: 'Armazenamento de Dados', to: '/docs/architecture/data-model'},
            ],
          },
          {
            title: 'Segurança',
            items: [
              {label: 'GravityZone / AV', to: '/docs/security/gravityzone'},
              {label: 'Controle de Acesso', to: '/docs/security/access-control'},
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} <a href="https://www.securisoft.com.br" target="_blank" rel="noopener noreferrer" style="color:inherit;text-decoration:underline;text-underline-offset:3px">Securisoft</a>. PatchOne é um produto Securisoft.`,
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
