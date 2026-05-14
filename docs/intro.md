---
id: intro
title: Introdução
sidebar_position: 1
---

# PatchOne

**PatchOne** é uma plataforma de gerenciamento de atualizações de software para Windows, desenvolvida para PMEs brasileiras com 10 a 500 máquinas por organização. Ela oferece aos administradores de TI um único console para detectar, implantar e auditar atualizações de software em toda a frota — sem custo por máquina e sem cadastro manual.

## Qual problema resolve

Gerenciar atualizações de software em uma frota Windows é trabalhoso sem ferramentas empresariais como WSUS ou Intune. PatchOne preenche essa lacuna: foca no mercado de PMEs brasileiras onde licenças Microsoft 365 são comuns, mas Intune não é, e onde GravityZone (Bitdefender) é a principal ferramenta de segurança de endpoints.

## Principais capacidades

| Capacidade | Detalhe |
|---|---|
| **Autodescoberta** | Agentes se registram automaticamente no primeiro check-in — sem cadastro manual |
| **Inventário em tempo real** | Software instalado por máquina, atualizado automaticamente |
| **Detecção de atualizações** | Atualizações pendentes exibidas como badges no dashboard |
| **Implantação com um clique** | Envie qualquer título do catálogo para uma máquina ou para toda a frota |
| **Instalação silenciosa** | Atualizações instaladas silenciosamente — zero interrupção ao usuário final |
| **Auditoria inviolável** | Cada implantação, login e alteração de configuração registrados de forma imutável |
| **Alerta de offline** | Notificação no dashboard quando uma máquina para de fazer check-in |
| **Resumo diário** | Snapshot da saúde da frota enviado ao dashboard todas as manhãs |
| **Atualização automática do agente** | O agente se atualiza quando o servidor publica uma nova versão |
| **Multi-tenant** | Modo cloud isola os dados de cada organização cliente |
| **Backup do banco de dados** | Backups diários agendados mais gatilho manual pelo dashboard |

## Para quem é

- **Administradores de TI** em PMEs brasileiras gerenciando 10 a 500 máquinas Windows
- **MSPs** que incluem PatchOne junto com licenças GravityZone
- **Administradores on-premises** que precisam de gerenciamento de patches sem dependência de nuvem

## Modos de implantação

| Modo | Descrição | Configuração |
|---|---|---|
| **On-premises** | Único Windows Server, sem necessidade de internet | `install_server.bat` |
| **Cloud / SaaS** | Baseado em Docker, TLS terminado, isolamento multi-tenant | `docker compose up` |

## Próximos passos

- [Início Rápido](/docs/getting-started/quickstart) — coloque em funcionamento em 5 minutos
- [Requisitos do Sistema](/docs/getting-started/requirements) — pré-requisitos de hardware e software
- [Instalação On-Premises](/docs/installation/on-premises) — guia completo de configuração on-prem
- [Instalação Cloud](/docs/installation/cloud) — configuração de produção com Docker + TLS
