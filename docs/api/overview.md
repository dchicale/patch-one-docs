---
id: overview
title: Visão Geral da API
sidebar_position: 1
---

# Visão Geral da API

O PatchOne expõe uma API REST na mesma URL base do painel. Você pode utilizá-la para automatizar tarefas de gerenciamento de frota, integrar com sistemas de monitoramento ou desenvolver ferramentas personalizadas.

## URL base

| Implantação | URL base |
|---|---|
| On-premises | `http://<server-address>` |
| Nuvem | `https://<your-domain>` |

## Autenticação

Todas as requisições à API exigem uma sessão de administrador válida. Autentique-se primeiro pelo endpoint de login e, em seguida, inclua o cookie de sessão nas requisições subsequentes.

Consulte [Autenticação](/docs/api/authentication) para mais detalhes.

## Formato de resposta

Todos os endpoints retornam JSON. Os erros utilizam um formato consistente:

```json
{
  "detail": "Description of the problem"
}
```

## Códigos de status HTTP

| Código | Significado |
|---|---|
| 200 | Sucesso |
| 201 | Criado |
| 204 | Sem conteúdo |
| 400 | Requisição inválida |
| 401 | Não autenticado |
| 403 | Proibido |
| 404 | Não encontrado |
| 409 | Conflito |
| 422 | Erro de validação |
| 429 | Limite de requisições atingido |
| 500 | Erro no servidor |

## Seções disponíveis da API

| Seção | Finalidade |
|---|---|
| [Autenticação](/docs/api/authentication) | Login, logout, gerenciamento de sessão |
| [Máquinas](/docs/api/machines) | Inventário de frota e gerenciamento de máquinas |
| [Deploy](/docs/api/deploy) | Enfileirar e monitorar implantações de atualizações |
| [Catálogo](/docs/api/catalog) | Gerenciar o catálogo de software |
| [Notificações](/docs/api/notifications) | Ler e dispensar notificações |
| [Auditoria](/docs/api/audit) | Consultar o log de auditoria imutável |
| [Backup](/docs/api/backup) | Acionar e baixar backups do banco de dados |

## Limitação de requisições

Tentativas de login são limitadas por taxa. Falhas repetidas a partir da mesma origem resultam em bloqueio temporário.

## Multi-tenancy

No modo nuvem, cada requisição é automaticamente vinculada à sua organização. Não é possível acessar dados de outra organização, independentemente do conteúdo da requisição.
