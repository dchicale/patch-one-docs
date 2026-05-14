import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from '@site/src/pages/index.module.css';

function CapIcon({ kind }) {
  const s = {
    width: 20, height: 20,
    stroke: 'currentColor', strokeWidth: 1.4,
    fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round',
  };
  switch (kind) {
    case 'discover':  return <svg viewBox="0 0 24 24" {...s}><circle cx="11" cy="11" r="6"/><path d="M16 16 L21 21"/><path d="M11 8 V11 L13 13"/></svg>;
    case 'inventory': return <svg viewBox="0 0 24 24" {...s}><rect x="3" y="4" width="18" height="5" rx="1"/><rect x="3" y="11" width="18" height="5" rx="1"/><rect x="3" y="18" width="18" height="3" rx="1"/></svg>;
    case 'detect':    return <svg viewBox="0 0 24 24" {...s}><path d="M12 2 L21 7 V13 C21 17.5 17 21 12 22 C7 21 3 17.5 3 13 V7 Z"/><path d="M9 12 L11 14 L15 10"/></svg>;
    case 'deploy':    return <svg viewBox="0 0 24 24" {...s}><path d="M12 3 V16"/><path d="M7 11 L12 16 L17 11"/><path d="M4 20 H20"/></svg>;
    case 'silent':    return <svg viewBox="0 0 24 24" {...s}><path d="M11 5 L6 9 H3 V15 H6 L11 19 Z"/><path d="M16 9 L21 14 M21 9 L16 14"/></svg>;
    case 'audit':     return <svg viewBox="0 0 24 24" {...s}><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8 H16 M8 12 H16 M8 16 H13"/></svg>;
    case 'offline':   return <svg viewBox="0 0 24 24" {...s}><circle cx="12" cy="12" r="9"/><path d="M5 5 L19 19"/></svg>;
    case 'briefing':  return <svg viewBox="0 0 24 24" {...s}><circle cx="12" cy="12" r="9"/><path d="M12 7 V12 L15 14"/></svg>;
    case 'tenant':    return <svg viewBox="0 0 24 24" {...s}><rect x="3" y="9" width="7" height="12"/><rect x="14" y="3" width="7" height="18"/><path d="M5 13 H8 M5 16 H8 M16 7 H19 M16 11 H19 M16 15 H19"/></svg>;
    default: return null;
  }
}

const CAPABILITIES = [
  { icon: 'discover',  title: 'Auto-discovery',      body: 'Agents self-register on first check-in. No CSV imports, no roster to maintain.' },
  { icon: 'inventory', title: 'Live inventory',       body: 'Installed software per machine, refreshed on every check-in.' },
  { icon: 'detect',    title: 'Update detection',     body: 'Pending updates surfaced as dashboard badges, deduplicated across the fleet.' },
  { icon: 'deploy',    title: 'One-click deploy',     body: 'Push any catalog title to one machine, a group, or the whole fleet.' },
  { icon: 'silent',    title: 'Silent install',       body: 'Updates install in the background. Zero end-user interruption, zero prompts.' },
  { icon: 'audit',     title: 'Tamper-proof audit',   body: 'Every deploy, login, and config change logged to an immutable, append-only record.' },
  { icon: 'offline',   title: 'Offline alerting',     body: 'Dashboard notification when a machine stops checking in past the timeout.' },
  { icon: 'briefing',  title: 'Daily briefing',       body: 'Fleet-health snapshot delivered to the notification panel each morning.' },
  { icon: 'tenant',    title: 'Multi-tenant',         body: 'Cloud mode scopes every request to your org. Cross-tenant access is structurally blocked.' },
];

export default function Home() {
  return (
    <Layout
      title="Windows Update Management"
      description="PatchOne — Windows software update management for Brazilian SMEs. Auto-discovery, one-click deploy, tamper-proof audit.">

      <main className={styles.main}>
        <div className={styles.container}>

          <section className="vo-hero">
            <div className="vo-hero-meta">
              <span className="vo-dot" />
              <span>v1.0 · Stable release</span>
              <span className="vo-pipe">|</span>
              <span>A Securisoft product</span>
              <span className="vo-pipe">|</span>
              <span>GravityZone-compatible</span>
            </div>
            <h1 className="vo-title">
              Patch every Windows endpoint.<br /><em>In one place.</em>
            </h1>
            <p className="vo-lede">
              PatchOne is a Windows update management platform for fleets of 10–500 machines —
              discovery, deployment, and an immutable audit trail, with no per-seat fee and no
              manual enrollment.
            </p>
            <div className={styles.heroButtons}>
              <Link className="button button--primary button--lg" to="/en/docs/getting-started/quickstart">
                Quick Start — 5 min
              </Link>
              <Link className="button button--outline button--secondary button--lg" to="/en/docs/intro">
                Read the docs
              </Link>
            </div>
            <div className="vo-hero-stats">
              <div className="vo-stat"><div className="vo-stat-num">500<em>max</em></div><div className="vo-stat-label">Machines per org</div></div>
              <div className="vo-stat"><div className="vo-stat-num">5<em>min</em></div><div className="vo-stat-label">Time to first deploy</div></div>
              <div className="vo-stat"><div className="vo-stat-num">0<em>$</em></div><div className="vo-stat-label">Per-seat licensing</div></div>
              <div className="vo-stat"><div className="vo-stat-num">50<em>titles</em></div><div className="vo-stat-label">Catalog seeded</div></div>
            </div>
          </section>

          <h2 className="vo-section"><span className="vo-section-num">§ 01 · Install</span>Get running in five minutes</h2>
          <p style={{ color: 'var(--vo-text-dim)', marginBottom: 0, maxWidth: 560 }}>
            On-premises mode runs on a single Windows Server. One script handles the setup from start to finish.
          </p>
          <div className="vo-term">
            <div className="vo-term-bar">
              <div className="vo-term-dots"><span /><span /><span /></div>
              <span className="vo-term-title">cmd · Administrator · install_server.bat</span>
            </div>
            <div className="vo-term-body">
              <div><span className="prompt">C:\&gt;</span>git clone &lt;repo&gt; patchone</div>
              <div><span className="prompt">C:\&gt;</span>cd patchone</div>
              <div><span className="prompt">C:\&gt;</span>copy server\.env.example server\.env</div>
              <div><span className="prompt">C:\&gt;</span>deploy\install_server.bat</div>
              <div className="cmt">  ⤷ python venv ...................... <span className="ok">ok</span></div>
              <div className="cmt">  ⤷ database init .................... <span className="ok">ok</span></div>
              <div className="cmt">  ⤷ seed catalog (50 titles) ......... <span className="ok">ok</span></div>
              <div className="cmt">  ⤷ register Windows Service ......... <span className="ok">ok</span></div>
              <div className="cmt">  ⤷ open firewall rule ............... <span className="ok">ok</span></div>
              <div><span className="arrow">→</span>Dashboard ready at <span className="str">http://&lt;server-ip&gt;</span></div>
            </div>
          </div>

          <h2 className="vo-section"><span className="vo-section-num">§ 02 · Choose your path</span>Three ways in</h2>
          <p style={{ color: 'var(--vo-text-dim)', marginBottom: 0, maxWidth: 560 }}>
            All three options run the same software. Your choice depends on network constraints and whether you need multi-tenant isolation.
          </p>
          <div className="vo-cards">
            <Link className="vo-card" to="/en/docs/installation/on-premises">
              <div className="vo-card-eyebrow"><span>A</span><span className="vo-rule" /><span>Self-hosted</span></div>
              <div className="vo-card-title">On-premises</div>
              <div className="vo-card-body">Single Windows Server, no internet required after setup. Best for closed networks.</div>
              <div className="vo-card-cta">Install on a server <span className="vo-arr">→</span></div>
            </Link>
            <Link className="vo-card" to="/en/docs/installation/cloud">
              <div className="vo-card-eyebrow"><span>B</span><span className="vo-rule" /><span>SaaS · multi-tenant</span></div>
              <div className="vo-card-title">Cloud, with Docker</div>
              <div className="vo-card-body">Docker Compose, TLS termination, and multi-tenant isolation. Best for MSPs managing many client orgs.</div>
              <div className="vo-card-cta">Run in the cloud <span className="vo-arr">→</span></div>
            </Link>
            <Link className="vo-card" to="/en/docs/installation/agent-deployment">
              <div className="vo-card-eyebrow"><span>C</span><span className="vo-rule" /><span>Endpoint</span></div>
              <div className="vo-card-title">Agent deployment</div>
              <div className="vo-card-body">Push the agent via GPO, WinRM, or the included bulk-deploy script. Self-registers on first check-in.</div>
              <div className="vo-card-cta">Roll out at scale <span className="vo-arr">→</span></div>
            </Link>
            <Link className="vo-card" to="/en/docs/dashboard/overview">
              <div className="vo-card-eyebrow"><span>D</span><span className="vo-rule" /><span>Console</span></div>
              <div className="vo-card-title">Tour the dashboard</div>
              <div className="vo-card-body">Fleet view, deploy console, immutable audit log, daily briefing — the surface your IT team lives in.</div>
              <div className="vo-card-cta">See the dashboard <span className="vo-arr">→</span></div>
            </Link>
          </div>

          <h2 className="vo-section"><span className="vo-section-num">§ 03 · Capabilities</span>What you get on day one</h2>
          <div className="vo-cap-grid">
            {CAPABILITIES.map(({ icon, title, body }) => (
              <div key={title} className="vo-cap">
                <div className="vo-cap-mark"><CapIcon kind={icon} /></div>
                <div className="vo-cap-title">{title}</div>
                <div className="vo-cap-body">{body}</div>
              </div>
            ))}
          </div>

          <h2 className="vo-section"><span className="vo-section-num">§ 04 · Architecture</span>Pull-model, always</h2>
          <p style={{ color: 'var(--vo-text-dim)', maxWidth: 600, marginBottom: 16 }}>
            The agent always initiates the connection — the server never reaches inward.
            No inbound firewall rules on endpoints, no listening ports, works behind NAT, proxies, and VPNs.
          </p>
          <div className="vo-callout">
            <div className="vo-callout-bar" />
            <div>
              <strong>Why pull, not push?</strong>
              The server is a trusted hub, not a remote-command executor. Agents check in on a schedule,
              pick up pending jobs, and report results. The server cannot initiate arbitrary actions on endpoints.
            </div>
          </div>

          <h2 className="vo-section"><span className="vo-section-num">§ 05 · Deployment</span>Two modes, one product</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13.5, marginBottom: 48 }}>
            <thead>
              <tr>
                {['Mode', 'Description', 'Setup'].map(h => (
                  <th key={h} style={{ textAlign: 'left', fontFamily: 'var(--vo-font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--vo-text-faint)', padding: '10px 14px', borderBottom: '1px solid var(--vo-border-strong)', background: 'var(--vo-surface)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '12px 14px', color: 'var(--vo-text)', fontWeight: 500, borderBottom: '1px solid var(--vo-rule)' }}>On-premises</td>
                <td style={{ padding: '12px 14px', color: 'var(--vo-text-dim)', borderBottom: '1px solid var(--vo-rule)' }}>Single Windows Server on your LAN. No internet dependency after setup.</td>
                <td style={{ padding: '12px 14px', color: 'var(--vo-text-dim)', borderBottom: '1px solid var(--vo-rule)', fontFamily: 'var(--vo-font-mono)', fontSize: 12 }}><code style={{ color: 'var(--vo-accent-bright)' }}>install_server.bat</code></td>
              </tr>
              <tr>
                <td style={{ padding: '12px 14px', color: 'var(--vo-text)', fontWeight: 500, borderBottom: '1px solid var(--vo-rule)' }}>Cloud / SaaS</td>
                <td style={{ padding: '12px 14px', color: 'var(--vo-text-dim)', borderBottom: '1px solid var(--vo-rule)' }}>Docker-based, TLS-terminated, multi-tenant isolation.</td>
                <td style={{ padding: '12px 14px', color: 'var(--vo-text-dim)', borderBottom: '1px solid var(--vo-rule)', fontFamily: 'var(--vo-font-mono)', fontSize: 12 }}><code style={{ color: 'var(--vo-accent-bright)' }}>docker compose up</code></td>
              </tr>
            </tbody>
          </table>

          <div className="vo-page-foot">
            <span />
            <Link className="vo-next-link" to="/en/docs/getting-started/quickstart">
              <span className="vo-nl-label">Next →</span>
              <span className="vo-nl-title">Quick Start</span>
            </Link>
          </div>

        </div>
      </main>
    </Layout>
  );
}
