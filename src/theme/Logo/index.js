import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {useThemeConfig} from '@docusaurus/theme-common';

export default function Logo({className, ...props}) {
  const {navbar: {logo}} = useThemeConfig();
  const logoLink = useBaseUrl(logo?.href || '/');

  return (
    <Link to={logoLink} className={className} {...props}>
      {/* Two-tone wordmark — CSS vars switch automatically with theme */}
      <span style={{
        fontFamily: "'Geist', ui-sans-serif, -apple-system, system-ui, sans-serif",
        fontSize: 18,
        fontWeight: 700,
        letterSpacing: '-0.025em',
        lineHeight: 1,
        display: 'inline-flex',
        alignItems: 'baseline',
        userSelect: 'none',
        marginRight: 10,
      }}>
        <span style={{fontWeight: 400, color: 'var(--vo-text)'}}>Patch</span>
        <span style={{fontWeight: 700, color: 'var(--vo-accent-bright)'}}>One</span>
      </span>

      {/* Securisoft endorsement badge */}
      <span style={{
        fontFamily: "'Geist Mono', ui-monospace, 'SF Mono', Menlo, Consolas, monospace",
        fontSize: 10,
        letterSpacing: '0.10em',
        textTransform: 'uppercase',
        border: '1px solid var(--vo-border-strong)',
        borderRadius: 999,
        padding: '3px 9px',
        whiteSpace: 'nowrap',
        background: 'var(--vo-surface)',
        lineHeight: 1,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
      }}>
        <span style={{color: 'var(--vo-text-faint)'}}>By</span>
        <span style={{color: 'var(--vo-text)', fontWeight: 600, letterSpacing: '0.04em'}}>Securisoft</span>
      </span>
    </Link>
  );
}
