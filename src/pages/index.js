import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

function CapIcon({ kind }) {
  const s = {
    width: 20, height: 20,
    stroke: 'currentColor', strokeWidth: 1.4,
    fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round',
  };
  switch (kind) {
    case 'discover':
      return <svg viewBox="0 0 24 24" {...s}><circle cx="11" cy="11" r="6"/><path d="M16 16 L21 21"/><path d="M11 8 V11 L13 13"/></svg>;
    case 'inventory':
      return <svg viewBox="0 0 24 24" {...s}><rect x="3" y="4" width="18" height="5" rx="1"/><rect x="3" y="11" width="18" height="5" rx="1"/><rect x="3" y="18" width="18" height="3" rx="1"/></svg>;
    case 'detect':
      return <svg viewBox="0 0 24 24" {...s}><path d="M12 2 L21 7 V13 C21 17.5 17 21 12 22 C7 21 3 17.5 3 13 V7 Z"/><path d="M9 12 L11 14 L15 10"/></svg>;
    case 'deploy':
      return <svg viewBox="0 0 24 24" {...s}><path d="M12 3 V16"/><path d="M7 11 L12 16 L17 11"/><path d="M4 20 H20"/></svg>;
    case 'silent':
      return <svg viewBox="0 0 24 24" {...s}><path d="M11 5 L6 9 H3 V15 H6 L11 19 Z"/><path d="M16 9 L21 14 M21 9 L16 14"/></svg>;
    case 'audit':
      return <svg viewBox="0 0 24 24" {...s}><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8 H16 M8 12 H16 M8 16 H13"/></svg>;
    case 'offline':
      return <svg viewBox="0 0 24 24" {...s}><circle cx="12" cy="12" r="9"/><path d="M5 5 L19 19"/></svg>;
    case 'briefing':
      return <svg viewBox="0 0 24 24" {...s}><circle cx="12" cy="12" r="9"/><path d="M12 7 V12 L15 14"/></svg>;
    case 'tenant':
      return <svg viewBox="0 0 24 24" {...s}><rect x="3" y="9" width="7" height="12"/><rect x="14" y="3" width="7" height="18"/><path d="M5 13 H8 M5 16 H8 M16 7 H19 M16 11 H19 M16 15 H19"/></svg>;
    default: return null;
  }
}

const CAPABILITIES = [
  { icon: 'discover', title: 'Autodescoberta',       body: 'Agentes se registram automaticamente no primeiro check-in. Sem importações CSV, sem lista manual.' },
  { icon: 'inventory', title: 'Inventário em tempo real', body: 'Software instalado por máquina, atualizado a cada check-in.' },
  { icon: 'detect',   title: 'Detecção de atualizações', body: 'Atualizações pendentes exibidas como badges no dashboard, deduplicadas na frota.' },
  { icon: 'deploy',   title: 'Implantação com um clique', body: 'Envie qualquer título do catálogo para uma máquina, um grupo ou toda a frota.' },
  { icon: 'silent',   title: 'Instalação silenciosa', body: 'Atualizações em segundo plano. Zero interrupção ao usuário final, zero prompts.' },
  { icon: 'audit',    title: 'Auditoria inviolável',  body: 'Cada deploy, login e alteração de configuração gravados em registro imutável e append-only.' },
  { icon: 'offline',  title: 'Alerta de offline',     body: 'Notificação no dashboard quando uma máquina para de fazer check-in após o timeout.' },
  { icon: 'briefing', title: 'Resumo diário',         body: 'Snapshot da saúde da frota entregue ao painel de notificações todas as manhãs.' },
  { icon: 'tenant',   title: 'Multi-tenant',          body: 'Modo cloud vincula cada requisição à sua org. Acesso entre tenants é bloqueado estruturalmente.' },
];

export default function Home() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title="Gerenciamento de Atualizações Windows"
      description="PatchOne — Gerenciamento de atualizações de software Windows para PMEs brasileiras. Autodescoberta, deploy com um clique, auditoria inviolável.">

      <main className={styles.main}>
        <div className={styles.container}>

          {/* ── HERO ─────────────────────────────────────── */}
          <section className="vo-hero">
            <div className="vo-hero-meta">
              <span className="vo-dot" />
              <span>v1.0 · Versão Estável</span>
              <span className="vo-pipe">|</span>
              <span>Um produto Securisoft</span>
              <span className="vo-pipe">|</span>
              <span>Compatível com GravityZone</span>
            </div>

            <h1 className="vo-title">
              Frota Windows atualizada e protegida.<br /><em>Um só console.</em>
            </h1>

            <p className="vo-lede">
              PatchOne é uma plataforma de gerenciamento de atualizações Windows para frotas
              de 10 a 500 máquinas — descoberta, implantação e auditoria imutável, sem taxa
              por máquina e sem cadastro manual.
            </p>

            <div className={styles.heroButtons}>
              <Link className="button button--primary button--lg" to="/docs/getting-started/quickstart">
                Início Rápido — 5 min
              </Link>
              <Link className="button button--outline button--secondary button--lg" to="/docs/intro">
                Ler a documentação
              </Link>
            </div>

            <div className="vo-hero-stats">
              <div className="vo-stat">
                <div className="vo-stat-num">500<em>máx</em></div>
                <div className="vo-stat-label">Máquinas por org</div>
              </div>
              <div className="vo-stat">
                <div className="vo-stat-num">5<em>min</em></div>
                <div className="vo-stat-label">Tempo para o 1.º deploy</div>
              </div>
              <div className="vo-stat">
                <div className="vo-stat-num">0<em>$</em></div>
                <div className="vo-stat-label">Licença por máquina</div>
              </div>
              <div className="vo-stat">
                <div className="vo-stat-num">50<em>títulos</em></div>
                <div className="vo-stat-label">Catálogo pré-carregado</div>
              </div>
            </div>
          </section>

          {/* ── INSTALL TERMINAL ─────────────────────────── */}
          <h2 className="vo-section">
            <span className="vo-section-num">§ 01 · Instalação</span>
            Em funcionamento em cinco minutos
          </h2>
          <p style={{ color: 'var(--vo-text-dim)', marginBottom: 0, maxWidth: 560 }}>
            O modo on-premises roda em um único Windows Server. Um script cuida de toda
            a configuração do início ao fim.
          </p>

          <div className="vo-term">
            <div className="vo-term-bar">
              <div className="vo-term-dots"><span /><span /><span /></div>
              <span className="vo-term-title">cmd · Administrador · install_server.bat</span>
            </div>
            <div className="vo-term-body">
              <div><span className="prompt">C:\&gt;</span>git clone &lt;repo&gt; patchone</div>
              <div><span className="prompt">C:\&gt;</span>cd patchone</div>
              <div><span className="prompt">C:\&gt;</span>copy server\.env.example server\.env</div>
              <div><span className="prompt">C:\&gt;</span>deploy\install_server.bat</div>
              <div className="cmt">  ⤷ python venv ...................... <span className="ok">ok</span></div>
              <div className="cmt">  ⤷ banco de dados ................... <span className="ok">ok</span></div>
              <div className="cmt">  ⤷ catálogo (50 títulos) ............ <span className="ok">ok</span></div>
              <div className="cmt">  ⤷ registrar Windows Service ........ <span className="ok">ok</span></div>
              <div className="cmt">  ⤷ regra de firewall ................ <span className="ok">ok</span></div>
              <div><span className="arrow">→</span>Dashboard disponível em <span className="str">http://&lt;server-ip&gt;</span></div>
            </div>
          </div>

          {/* ── CHOOSE YOUR PATH ─────────────────────────── */}
          <h2 className="vo-section">
            <span className="vo-section-num">§ 02 · Escolha seu caminho</span>
            Três opções de entrada
          </h2>
          <p style={{ color: 'var(--vo-text-dim)', marginBottom: 0, maxWidth: 560 }}>
            As três opções rodam o mesmo software. A escolha depende das restrições de rede
            e da necessidade de isolamento multi-tenant.
          </p>

          <div className="vo-cards">
            <Link className="vo-card" to="/docs/installation/on-premises">
              <div className="vo-card-eyebrow"><span>A</span><span className="vo-rule" /><span>Self-hosted</span></div>
              <div className="vo-card-title">On-premises</div>
              <div className="vo-card-body">Único Windows Server, sem internet após a configuração. Ideal para redes fechadas.</div>
              <div className="vo-card-cta">Instalar no servidor <span className="vo-arr">→</span></div>
            </Link>
            <Link className="vo-card" to="/docs/installation/cloud">
              <div className="vo-card-eyebrow"><span>B</span><span className="vo-rule" /><span>SaaS · multi-tenant</span></div>
              <div className="vo-card-title">Cloud com Docker</div>
              <div className="vo-card-body">Docker Compose, TLS e isolamento multi-tenant. Ideal para MSPs com múltiplas organizações clientes.</div>
              <div className="vo-card-cta">Rodar na nuvem <span className="vo-arr">→</span></div>
            </Link>
            <Link className="vo-card" to="/docs/installation/agent-deployment">
              <div className="vo-card-eyebrow"><span>C</span><span className="vo-rule" /><span>Endpoint</span></div>
              <div className="vo-card-title">Deploy do Agente</div>
              <div className="vo-card-body">Envie o agente via GPO, WinRM ou o script de deploy em massa. Registro automático no primeiro check-in.</div>
              <div className="vo-card-cta">Escalar para a frota <span className="vo-arr">→</span></div>
            </Link>
            <Link className="vo-card" to="/docs/dashboard/overview">
              <div className="vo-card-eyebrow"><span>D</span><span className="vo-rule" /><span>Console</span></div>
              <div className="vo-card-title">Tour pelo Dashboard</div>
              <div className="vo-card-body">Visão de frota, console de deploy, log de auditoria imutável e resumo diário — a superfície onde seu time de TI vive.</div>
              <div className="vo-card-cta">Ver o dashboard <span className="vo-arr">→</span></div>
            </Link>
          </div>

          {/* ── CAPABILITIES ─────────────────────────────── */}
          <h2 className="vo-section">
            <span className="vo-section-num">§ 03 · Capacidades</span>
            O que você obtém no primeiro dia
          </h2>

          <div className="vo-cap-grid">
            {CAPABILITIES.map(({ icon, title, body }) => (
              <div key={title} className="vo-cap">
                <div className="vo-cap-mark"><CapIcon kind={icon} /></div>
                <div className="vo-cap-title">{title}</div>
                <div className="vo-cap-body">{body}</div>
              </div>
            ))}
          </div>

          {/* ── HOW IT WORKS ─────────────────────────────── */}
          <h2 className="vo-section">
            <span className="vo-section-num">§ 04 · Arquitetura</span>
            Modelo pull, sempre
          </h2>
          <p style={{ color: 'var(--vo-text-dim)', maxWidth: 600, marginBottom: 16 }}>
            O agente sempre inicia a conexão — o servidor nunca alcança os endpoints. Sem
            regras de firewall de entrada, sem portas abertas, funciona atrás de NAT,
            proxies e VPNs.
          </p>

          <div className="vo-callout">
            <div className="vo-callout-bar" />
            <div>
              <strong>Por que pull, não push?</strong>
              O servidor é um hub confiável, não um executor de comandos remotos. Os agentes
              fazem check-in em horário definido, buscam jobs pendentes e reportam resultados.
              O servidor não pode iniciar ações arbitrárias nos endpoints.
            </div>
          </div>

          {/* ── DEPLOYMENT MODES ─────────────────────────── */}
          <h2 className="vo-section">
            <span className="vo-section-num">§ 05 · Implantação</span>
            Dois modos, um produto
          </h2>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13.5, marginBottom: 48 }}>
            <thead>
              <tr>
                {['Modo', 'Descrição', 'Configuração'].map(h => (
                  <th key={h} style={{ textAlign: 'left', fontFamily: 'var(--vo-font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--vo-text-faint)', padding: '10px 14px', borderBottom: '1px solid var(--vo-border-strong)', background: 'var(--vo-surface)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '12px 14px', color: 'var(--vo-text)', fontWeight: 500, borderBottom: '1px solid var(--vo-rule)' }}>On-premises</td>
                <td style={{ padding: '12px 14px', color: 'var(--vo-text-dim)', borderBottom: '1px solid var(--vo-rule)' }}>Único Windows Server na sua rede. Sem dependência de internet após a configuração.</td>
                <td style={{ padding: '12px 14px', color: 'var(--vo-text-dim)', borderBottom: '1px solid var(--vo-rule)', fontFamily: 'var(--vo-font-mono)', fontSize: 12 }}><code style={{ color: 'var(--vo-accent-bright)' }}>install_server.bat</code></td>
              </tr>
              <tr>
                <td style={{ padding: '12px 14px', color: 'var(--vo-text)', fontWeight: 500, borderBottom: '1px solid var(--vo-rule)' }}>Cloud / SaaS</td>
                <td style={{ padding: '12px 14px', color: 'var(--vo-text-dim)', borderBottom: '1px solid var(--vo-rule)' }}>Baseado em Docker, TLS terminado, isolamento multi-tenant.</td>
                <td style={{ padding: '12px 14px', color: 'var(--vo-text-dim)', borderBottom: '1px solid var(--vo-rule)', fontFamily: 'var(--vo-font-mono)', fontSize: 12 }}><code style={{ color: 'var(--vo-accent-bright)' }}>docker compose up</code></td>
              </tr>
            </tbody>
          </table>

          <div className="vo-page-foot">
            <span />
            <Link className="vo-next-link" to="/docs/getting-started/quickstart">
              <span className="vo-nl-label">Próximo →</span>
              <span className="vo-nl-title">Início Rápido</span>
            </Link>
          </div>

        </div>
      </main>
    </Layout>
  );
}
