import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {useThemeConfig} from '@docusaurus/theme-common';
import {useColorMode} from '@docusaurus/theme-common';

export default function Logo({className, ...props}) {
  const {navbar: {logo}} = useThemeConfig();
  const {colorMode} = useColorMode();
  const dark = colorMode === 'dark';
  const logoLink = useBaseUrl(logo?.href || '/');

  return (
    <Link to={logoLink} className={className} {...props}>
      {/* Two-tone wordmark: Patch (regular) + One (bold accent) */}
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
        <span style={{fontWeight: 400, color: dark ? '#ECE9E2' : '#1A1812'}}>Patch</span>
        <span style={{fontWeight: 700, color: dark ? '#9FB3D2' : '#3F4B62'}}>One</span>
      </span>

      {/* Securisoft endorsement badge */}
      <span style={{
        fontFamily: "'Geist Mono', ui-monospace, 'SF Mono', Menlo, Consolas, monospace",
        fontSize: 10,
        letterSpacing: '0.10em',
        textTransform: 'uppercase',
        border: `1px solid ${dark ? '#2A323F' : '#DDD4BE'}`,
        borderRadius: 999,
        padding: '3px 9px',
        whiteSpace: 'nowrap',
        background: dark ? '#10131A' : '#FBF8F1',
        lineHeight: 1,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
      }}>
        <span style={{color: dark ? '#5E6573' : '#8A8472'}}>By</span>
        <span style={{
          color: dark ? '#ECE9E2' : '#1A1812',
          fontWeight: 600,
          letterSpacing: '0.04em',
        }}>Securisoft</span>
      </span>
    </Link>
  );
}
