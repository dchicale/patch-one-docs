import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

const features = [
  {
    title: 'Zero-touch fleet discovery',
    icon: '🔍',
    description:
      'Agents register on first heartbeat — no manual enrollment, no roster to maintain. New machines appear in the dashboard within 5 minutes.',
  },
  {
    title: 'One-click software deployment',
    icon: '🚀',
    description:
      'Push any update from the 50-title curated catalog to one machine or the entire fleet. Silent install via winget — no end-user interruption.',
  },
  {
    title: 'Tamper-proof audit trail',
    icon: '🔒',
    description:
      'Every login, deploy, and configuration change is logged immutably. Export as CSV for compliance reporting.',
  },
  {
    title: 'Works offline',
    icon: '🏢',
    description:
      'On-premises mode uses SQLite on a Windows Server — no internet connection required, no cloud subscription, no per-machine cost.',
  },
  {
    title: 'Pull-model agent',
    icon: '📡',
    description:
      'Agents poll the server every 5 minutes. No inbound firewall rules needed on client machines — works through NAT and corporate proxies.',
  },
  {
    title: 'GravityZone-safe',
    icon: '🛡️',
    description:
      'Designed to coexist with Bitdefender GravityZone. Includes AV exclusion scripts and documented code-signing guidance.',
  },
];

function Feature({icon, title, description}) {
  return (
    <div className={clsx('col col--4', styles.feature)}>
      <div className="text--center" style={{fontSize: '2.5rem', marginBottom: '0.5rem'}}>
        {icon}
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/getting-started/quickstart">
            Quick Start — 5 min ⏱️
          </Link>
          <Link
            className="button button--outline button--secondary button--lg"
            to="/docs/intro"
            style={{marginLeft: '1rem'}}>
            Read the Docs
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  return (
    <Layout
      title="Windows Update Management"
      description="PatchOne — Windows software update management for Brazilian SMEs. Auto-discovery, one-click deploy, tamper-proof audit, offline-capable.">
      <HomepageHeader />
      <main>
        <section className={styles.features}>
          <div className="container">
            <div className="row">
              {features.map((props, idx) => (
                <Feature key={idx} {...props} />
              ))}
            </div>
          </div>
        </section>

        <section style={{padding: '3rem 0', background: 'var(--ifm-color-emphasis-100)'}}>
          <div className="container">
            <div className="row">
              <div className="col col--6">
                <h2>Two deployment modes</h2>
                <p>
                  <strong>On-premises:</strong> single Windows Server, SQLite database, no internet
                  dependency. Install in 10 minutes with <code>install_server.bat</code>.
                </p>
                <p>
                  <strong>Cloud / SaaS:</strong> Docker Compose with PostgreSQL, nginx TLS
                  termination, and multi-tenant isolation. Each client organisation's data is
                  isolated by <code>tenant_id</code>.
                </p>
                <Link className="button button--primary" to="/docs/installation/on-premises">
                  Installation Guide →
                </Link>
              </div>
              <div className="col col--6">
                <h2>How it works</h2>
                <p>
                  A lightweight agent runs as a Windows Service on each managed machine. It checks
                  in with the PatchOne server on a regular schedule — picking up pending update
                  jobs, reporting installed software, and sending results. No inbound ports needed
                  on client machines.
                </p>
                <p>
                  The IT admin manages everything from the dashboard: approve updates, review the
                  audit log, download backups, and monitor the fleet in real time.
                </p>
                <Link className="button button--outline button--primary" to="/docs/architecture/overview">
                  How PatchOne works →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
