---
id: backup
title: Backup e Restauração
sidebar_position: 7
---

# Backup e Restauração

A página **Backup** gerencia os backups do banco de dados do servidor PatchOne.

## Tipos de backup

| Tipo | Gatilho | Agendamento |
|---|---|---|
| **Agendado** | Automático | Diariamente às 2h00 (configurável) |
| **Manual** | Administrador clica em "Disparar Backup" | Sob demanda |

## Lista de backups

Cada linha exibe:

| Coluna | Descrição |
|---|---|
| **Nome do arquivo** | Nome do arquivo de backup com timestamp (ex.: `patchone_backup_2026-05-11_02-00.db`) |
| **Tamanho** | Tamanho do arquivo de backup |
| **Tipo** | `scheduled` ou `manual` |
| **Criado** | Timestamp de quando o backup foi criado |
| **Ações** | Botões de download ou exclusão |

## Disparando um backup manual

Clique em **Disparar Backup** para criar um backup imediato. O backup aparece na lista em alguns segundos.

## Baixando um backup

Clique em **Download** ao lado de qualquer backup para baixar o arquivo do banco de dados para sua máquina local. No modo on-premises, este é um arquivo SQLite `.db`. No modo cloud, é um dump do PostgreSQL.

Armazene os backups baixados em um local separado do servidor (ex.: um compartilhamento de rede ou armazenamento em nuvem) para recuperação de desastres.

## Política de retenção

O servidor exclui automaticamente backups mais antigos que `BACKUP_RETENTION_DAYS` (padrão: 7 dias). Ajuste isso em `server/.env`:

```ini
BACKUP_RETENTION_DAYS=14
```

Reinicie o servidor após alterar este valor. Backups manuais também estão sujeitos à política de retenção.

## Restauração (on-premises)

Para restaurar a partir de um backup em um servidor on-premises:

1. Pare o serviço PatchOne:
   ```bat
   sc stop PatchOneServer
   ```
2. Substitua o arquivo do banco de dados:
   ```bat
   copy patchone_backup_<timestamp>.db server\patchone.db
   ```
3. Reinicie o serviço:
   ```bat
   sc start PatchOneServer
   ```

## Restauração (cloud / Docker)

1. Pare o container do servidor:
   ```bash
   docker compose stop patchone-server
   ```
2. Restaure o dump do PostgreSQL:
   ```bash
   docker compose exec patchone-postgres pg_restore \
     -U patchone -d patchone /backups/patchone_backup_<timestamp>.dump
   ```
3. Reinicie:
   ```bash
   docker compose start patchone-server
   ```

## Local de armazenamento dos backups

| Modo | Diretório de backup |
|---|---|
| On-premises | `server\backups\` |
| Cloud | Volume Docker `patchone-backups` |

## API de backup

Os backups também podem ser gerenciados via a [API de Backup](/docs/api/backup) para automação (ex.: download automatizado para armazenamento externo).
