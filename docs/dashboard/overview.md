---
id: overview
title: Visão Geral do Dashboard
sidebar_position: 1
---

# Visão Geral do Dashboard

O dashboard do PatchOne é uma SPA React servida na URL raiz do servidor. Ele oferece gerenciamento completo da frota sem a necessidade de ferramentas adicionais.

## Navegação

A barra lateral esquerda contém as seções principais:

| Seção | Finalidade |
|---|---|
| **Máquinas** | Visualização da frota — todas as máquinas registradas e seus status |
| **Implantar** | Enviar atualizações de software para uma ou mais máquinas |
| **Jobs** | Monitorar o status e os resultados dos jobs de implantação |
| **Catálogo** | Navegar e gerenciar o catálogo de software |
| **Auditoria** | Log imutável de todas as ações do administrador |
| **Backup** | Gerenciamento de backup do banco de dados |

## Barra superior

A barra de navegação superior contém:

- **Logo do PatchOne** — link para a página de Máquinas
- **Sino de notificações** — exibe a contagem de notificações não lidas; clique para expandir
- **Nome do administrador** — clique para sair

## Resumo diário

Às 8h00 de cada dia, uma notificação automática de **Resumo Diário** aparece no painel de notificações. Ela inclui:

- Total de máquinas online / offline
- Número de máquinas com atualizações pendentes
- Número de jobs concluídos / com falha nas últimas 24 horas

## Badges de status

As máquinas exibem um badge de status:

| Badge | Significado |
|---|---|
| **Online** | Último heartbeat dentro do tempo limite configurado (padrão: 30 min) |
| **Offline** | Nenhum heartbeat por mais tempo do que o limite |

## Autenticação

O dashboard usa autenticação JWT baseada em cookie. As sessões expiram após 8 horas (configurável via `SESSION_TIMEOUT_HOURS` no `.env`). Após a expiração, o navegador redireciona para a página de Login.

## Atalhos de teclado

O dashboard é otimizado para navegação com mouse. Nenhum atalho de teclado personalizado está definido na v1.0.

## Compatibilidade com navegadores

Qualquer navegador moderno (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+) é suportado. JavaScript deve estar habilitado.
