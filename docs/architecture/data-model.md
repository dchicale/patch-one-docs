---
id: data-model
title: Armazenamento de Dados
sidebar_position: 2
---

# Armazenamento de Dados

O PatchOne armazena dados em um banco de dados relacional. A implantação on-premises utiliza um arquivo SQLite local; a implantação em nuvem utiliza PostgreSQL com volumes persistentes.

## O que o PatchOne armazena

| Categoria | Descrição |
|---|---|
| **Inventário de máquinas** | Hostname, versão do SO, versão do agente, status online/offline, lista de software instalado |
| **Histórico de software** | Log append-only de instalações, atualizações e remoções de software por máquina |
| **Catálogo de atualizações** | Lista curada de títulos de software disponíveis para implantação |
| **Jobs de deploy** | Registros de implantação enfileirados, em andamento e concluídos por máquina |
| **Log de auditoria** | Registro imutável de cada ação administrativa (login, deploy, alteração de configuração) |
| **Notificações** | Alertas de saúde da frota e atualizações de status de implantação |
| **Backups** | Metadados de arquivos de backup do banco de dados agendados e manuais |

## Retenção e backup

- **Log de auditoria**: nunca modificado ou excluído após a criação
- **Histórico de software**: append-only; os estados anteriores são sempre preservados
- **Backups**: retidos por um número configurável de dias (padrão: 7); arquivos mais antigos são removidos automaticamente

Consulte [Backup](/docs/dashboard/backup) para saber como baixar ou acionar backups pelo painel.
