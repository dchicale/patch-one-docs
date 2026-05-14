/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  mainSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: 'Introdução',
    },
    {
      type: 'category',
      label: 'Primeiros Passos',
      collapsed: false,
      items: [
        'getting-started/quickstart',
        'getting-started/requirements',
      ],
    },
    {
      type: 'category',
      label: 'Instalação',
      items: [
        'installation/on-premises',
        'installation/cloud',
        'installation/agent-deployment',
      ],
    },
    {
      type: 'category',
      label: 'Dashboard',
      items: [
        'dashboard/overview',
        'dashboard/machines',
        'dashboard/deploy',
        'dashboard/jobs',
        'dashboard/catalog',
        'dashboard/audit',
        'dashboard/backup',
        'dashboard/notifications',
      ],
    },
    {
      type: 'category',
      label: 'Agente',
      items: [
        'agent/overview',
        'agent/configuration',
        'agent/self-update',
      ],
    },
    {
      type: 'category',
      label: 'Referência da API',
      items: [
        'api/overview',
        'api/authentication',
        'api/machines',
        'api/deploy',
        'api/catalog',
        'api/notifications',
        'api/audit',
        'api/backup',
      ],
    },
    {
      type: 'category',
      label: 'Segurança',
      items: [
        'security/gravityzone',
        'security/access-control',
      ],
    },
    {
      type: 'category',
      label: 'Arquitetura',
      items: [
        'architecture/overview',
        'architecture/data-model',
      ],
    },
  ],
};

export default sidebars;
