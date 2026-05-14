---
id: audit
title: API de Auditoria
sidebar_position: 7
---

# API de Auditoria

Leia o log de auditoria imutável. Nenhuma operação de escrita ou exclusão está disponível.

## Endpoints

### Listar entradas de auditoria

```
GET /api/audit
```

**Auth:** Obrigatória

**Parâmetros de consulta:**

| Parâmetro | Tipo | Descrição |
|---|---|---|
| `event_type` | string | Filtrar por tipo de evento (ex.: `deploy_queued`) |
| `from` | data ISO 8601 | Início do intervalo de datas (inclusivo) |
| `to` | data ISO 8601 | Fim do intervalo de datas (inclusivo) |
| `actor` | string | Filtrar por nome de usuário do administrador |
| `limit` | integer | Máximo de registros a retornar (padrão: 100, máximo: 1000) |
| `offset` | integer | Deslocamento para paginação |

**Resposta (200):**

```json
[
  {
    "id": "audit-uuid",
    "timestamp": "2026-05-11T10:05:30Z",
    "event_type": "deploy_completed",
    "actor": "admin",
    "target": "DESKTOP-ABC01",
    "detail": {
      "job_id": "job-uuid-1",
      "software": "Google Chrome",
      "result": "Successfully installed Google.Chrome"
    },
    "ip_address": "192.168.1.50"
  }
]
```

**Tipos de evento:** Consulte o [Log de Auditoria](/docs/dashboard/audit#what-is-logged) para a lista completa.

---

### Exportar log de auditoria como CSV

```
GET /api/audit/export.csv
```

**Auth:** Obrigatória

**Parâmetros de consulta:** Mesmos do endpoint de listagem (intervalo de datas, tipo de evento, ator). A exportação respeita os filtros atuais.

**Resposta:** Download de arquivo com `Content-Type: text/csv`.

Colunas do CSV:

```
timestamp,event_type,actor,target,detail,ip_address
```

A coluna `detail` é serializada como uma string JSON dentro da célula do CSV.

## Proteção contra adulteração

A API de auditoria não oferece operações `POST`, `PUT`, `PATCH` ou `DELETE`. As entradas de auditoria são append-only no nível do banco de dados. No modo on-premises, aplique permissões de arquivo no nível do sistema operacional ao diretório do banco de dados para evitar modificações diretas.
