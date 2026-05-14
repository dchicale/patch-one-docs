---
id: catalog
title: API de Catálogo
sidebar_position: 5
---

# API de Catálogo

Gerencie o catálogo de software utilizado nas operações de deploy.

## Endpoints

### Listar itens do catálogo

```
GET /api/catalog
```

**Auth:** Obrigatória

**Parâmetros de consulta:**

| Parâmetro | Tipo | Descrição |
|---|---|---|
| `category` | string | Filtrar por categoria (correspondência exata, insensível a maiúsculas/minúsculas) |
| `search` | string | Filtrar por nome ou editor (correspondência parcial) |

**Resposta (200):**

```json
[
  {
    "id": 1,
    "name": "Google Chrome",
    "winget_id": "Google.Chrome",
    "category": "browser",
    "publisher": "Google LLC",
    "builtin": true
  },
  {
    "id": 51,
    "name": "My Custom App",
    "winget_id": "MyOrg.CustomApp",
    "category": "internal",
    "publisher": "My Organisation",
    "builtin": false
  }
]
```

---

### Criar uma entrada personalizada no catálogo

```
POST /api/catalog
```

**Auth:** Obrigatória

**Corpo da requisição:**

```json
{
  "name": "My Custom App",
  "winget_id": "MyOrg.CustomApp",
  "category": "internal",
  "publisher": "My Organisation"
}
```

**Resposta (201):** O objeto do item do catálogo criado.

**Auditoria:** Registrado como `catalog_created`.

---

### Atualizar uma entrada do catálogo

```
PATCH /api/catalog/{catalog_item_id}
```

**Auth:** Obrigatória

**Restrição:** Os administradores só podem atualizar suas próprias entradas personalizadas. Entradas nativas (`builtin: true`) não podem ser atualizadas.

**Corpo da requisição** (todos os campos são opcionais):

```json
{
  "name": "My Custom App v2",
  "category": "productivity"
}
```

**Resposta (200):** Objeto do item do catálogo atualizado.

**Auditoria:** Registrado como `catalog_updated`.

---

### Excluir uma entrada do catálogo

```
DELETE /api/catalog/{catalog_item_id}
```

**Auth:** Obrigatória

**Restrição:** Apenas entradas personalizadas. Entradas nativas não podem ser excluídas.

**Resposta (204):** Sem conteúdo. A entrada é excluída logicamente (ocultada das listas, mantida no histórico de jobs).

**Respostas de erro:**

| Código | Causa |
|---|---|
| 403 | Tentativa de excluir uma entrada nativa |
| 404 | Item do catálogo não encontrado |

**Auditoria:** Registrado como `catalog_deleted`.
