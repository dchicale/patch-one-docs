---
id: jobs
title: Monitoramento de Jobs
sidebar_position: 4
---

# Monitoramento de Jobs

A página **Jobs** exibe todos os jobs de implantação e seus status atuais.

## Ciclo de vida do job

```
queued → in_progress → completed
                    → failed
```

| Estado | Significado |
|---|---|
| `queued` | Job criado, aguardando o agente buscar no próximo heartbeat |
| `in_progress` | O agente iniciou a instalação via winget |
| `completed` | winget encerrou com código 0; software instalado com sucesso |
| `failed` | winget encerrou com código diferente de zero; veja a mensagem de resultado |

## Lista de jobs

Cada linha exibe:

| Coluna | Descrição |
|---|---|
| **Máquina** | Hostname da máquina alvo |
| **Software** | Nome de exibição do catálogo |
| **Status** | Estado atual do job com badge colorido |
| **Resultado** | Resumo da saída do winget (preenchido ao concluir ou falhar) |
| **Criado** | Timestamp quando o job foi enfileirado |
| **Atualizado** | Timestamp da mudança de estado mais recente |

## Agrupamento por lote

Jobs implantados na mesma operação compartilham um `batch_id`. As linhas de lote são agrupadas na lista com um cabeçalho expansível mostrando o progresso geral (ex.: *8 / 10 concluídos*).

## Filtros

Filtrar por:
- **Status** — exibir apenas jobs `queued`, `in_progress`, `completed` ou `failed`
- **Máquina** — filtrar para uma máquina específica

## Cancelar um job enfileirado

Você pode cancelar um job que ainda está no estado `queued` clicando no ícone de cancelamento. Jobs já em `in_progress` não podem ser cancelados — eles são concluídos no lado do agente.

## Jobs com falha

Quando um job falha, a mensagem de resultado contém o código de saída do winget e a saída stderr. Motivos comuns de falha:

| Causa | Mensagem de resultado típica |
|---|---|
| Pacote winget não encontrado | `No applicable upgrade found` |
| Rede indisponível no cliente | `Failed to connect to the source` |
| Instalador bloqueado pelo AV | `The process was terminated` |
| Já está atualizado | `No applicable upgrade found` |

Para falhas relacionadas ao AV, consulte [Coexistência com GravityZone](/docs/security/gravityzone).

## Atualização automática

A página Jobs atualiza automaticamente a cada 10 segundos enquanto estiver aberta, para que você possa acompanhar o progresso em tempo real sem atualizar manualmente.
