---
id: notifications
title: Notificações
sidebar_position: 8
---

# Notificações

O sino de notificações no canto superior direito do dashboard exibe alertas em tempo real sobre eventos da frota.

## Tipos de notificação

| Tipo | Gatilho | Gravidade |
|---|---|---|
| `machine_registered` | Nova máquina faz check-in pela primeira vez | Informação |
| `machine_offline` | Máquina deixa de enviar heartbeats por mais de `HEARTBEAT_TIMEOUT_MINUTES` | Aviso |
| `job_completed` | Um job de implantação é concluído com sucesso | Informação |
| `job_failed` | Um job de implantação falha | Erro |
| `updates_available` | Máquina reporta atualizações winget pendentes | Informação |
| `daily_summary` | Resumo automatizado da saúde da frota às 8h00 | Informação |

## Sino de notificações

O ícone do sino exibe um badge com a contagem de notificações não lidas. Clicar no sino expande um painel dropdown com as notificações mais recentes.

Cada notificação no painel exibe:

- **Ícone** — colorido por tipo (verde para informação, amarelo para aviso, vermelho para erro)
- **Mensagem** — texto resumido (ex.: *"Máquina DESKTOP-ABC01 ficou online"*)
- **Timestamp** — tempo relativo (ex.: *"3 minutos atrás"*)
- **Botão de dispensar** — marca como lida e oculta

## Marcar todas como lidas

Clique em **Marcar todas como lidas** no cabeçalho do painel de notificações para zerar a contagem de não lidas.

## Resumo diário

A notificação de resumo diário (gerada às 8h00) inclui:

- **Máquinas online** — contagem das que estão fazendo check-in atualmente
- **Máquinas offline** — contagem das que perderam sua janela de heartbeat
- **Atualizações pendentes** — total de máquinas com pelo menos uma atualização winget disponível
- **Jobs concluídos** — jobs de implantação que tiveram sucesso nas últimas 24 horas
- **Jobs com falha** — jobs de implantação que falharam nas últimas 24 horas

## API de notificações

As notificações podem ser lidas e marcadas como lidas via a [API de Notificações](/docs/api/notifications). Isso é útil para integrar alertas do PatchOne em sistemas de monitoramento externos (ex.: webhooks do Slack, ferramentas ITSM).

## Configuração

O limiar de alerta de offline é definido por `HEARTBEAT_TIMEOUT_MINUTES` em `server/.env` (padrão: 30 minutos). O horário do resumo diário está fixo às 8h00 no horário local do servidor na v1.0.
