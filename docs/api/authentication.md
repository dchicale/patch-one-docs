---
id: authentication
title: Autenticação
sidebar_position: 2
---

# Autenticação

O PatchOne utiliza autenticação de sessão baseada em cookie para a API de administração. Após o login, o cookie de sessão é incluído automaticamente nas requisições subsequentes pelo navegador ou pelo seu cliente HTTP.

## Login

**`POST /api/admin/login`**

**Corpo da requisição:**

```json
{
  "username": "your-username",
  "password": "your-password"
}
```

**Sucesso (200):** Define um cookie de sessão e retorna seu perfil de administrador:

```json
{
  "id": 1,
  "username": "admin",
  "tenant_id": "your-org"
}
```

**Respostas de erro:**

| Código | Causa |
|---|---|
| 401 | Credenciais inválidas |
| 429 | Muitas tentativas falhas — aguarde antes de tentar novamente |

---

## Logout

**`POST /api/admin/logout`**

Limpa o cookie de sessão. O evento de logout é gravado no log de auditoria.

---

## Sessão atual

**`GET /api/admin/me`**

Retorna o perfil de administrador da sessão atual. Retorna 401 se a sessão tiver expirado.

## Expiração de sessão

As sessões expiram após um período de inatividade. Após a expiração, as chamadas à API protegida retornam 401 e o navegador redireciona para a página de login.

## Usando a API a partir de scripts

Use um cliente HTTP que suporte cookies. Faça login uma vez para obter o cookie de sessão e, em seguida, inclua-o nas requisições subsequentes:

```python
import requests

session = requests.Session()
session.post("https://your-server/api/admin/login", json={
    "username": "admin",
    "password": "your-password"
})

# Session cookie is now stored — subsequent requests include it automatically
machines = session.get("https://your-server/api/machines").json()
```
