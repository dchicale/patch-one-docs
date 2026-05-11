/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  mainSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: 'Introduction',
    },
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'getting-started/quickstart',
        'getting-started/requirements',
      ],
    },
    {
      type: 'category',
      label: 'Installation',
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
      label: 'Agent',
      items: [
        'agent/overview',
        'agent/configuration',
        'agent/self-update',
      ],
    },
    {
      type: 'category',
      label: 'API Reference',
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
      label: 'Security',
      items: [
        'security/gravityzone',
        'security/access-control',
      ],
    },
    {
      type: 'category',
      label: 'Architecture',
      items: [
        'architecture/overview',
        'architecture/data-model',
      ],
    },
  ],
};

export default sidebars;
