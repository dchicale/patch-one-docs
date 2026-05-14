---
id: access-control
title: Controle de Acesso
sidebar_position: 2
---

# Controle de Acesso

## Autenticação

O PatchOne utiliza dois mecanismos de autenticação distintos:

| Ator | Mecanismo |
|---|---|
| Administrador (painel) | Cookie de sessão, definido no login e limpo no logout |
| Agente (Windows Service) | Chave de API compartilhada configurada durante a implantação |

As sessões de administrador expiram automaticamente após um período de inatividade (padrão: 8 horas). Após a expiração, o navegador redireciona para a página de login.

## Armazenamento de senhas

As senhas de administrador são armazenadas usando um hash unidirecional forte. Senhas em texto simples nunca são armazenadas. A senha inicial de administrador é definida durante a instalação do servidor.

## Proteção contra força bruta

As tentativas de login são limitadas por taxa por endereço IP. Falhas repetidas resultam em bloqueio temporário para evitar ataques automatizados.

## Segurança da chave de API

A chave de API compartilhada entre o servidor e os agentes deve ser tratada como um segredo:

- Armazene-a apenas no arquivo de configuração do agente e na configuração do servidor
- Restrinja as permissões do arquivo para que apenas a conta de serviço possa lê-lo
- Faça a rotação da chave se uma máquina agente for descomissionada ou se houver suspeita de comprometimento

## Isolamento de locatários (modo nuvem)

No modo nuvem, a sessão de cada administrador está vinculada à sua organização. Não é possível acessar dados de outra organização com suas credenciais, independentemente do conteúdo da requisição.

## Trilha de auditoria

Cada evento de autenticação é registrado de forma imutável:

| Evento | Quando |
|---|---|
| Login bem-sucedido | Administrador faz login |
| Tentativa de login falha | Credenciais incorretas (IP de origem registrado) |
| Logout | Administrador faz logout |

## Recomendações para produção

- Use uma chave secreta longa e gerada aleatoriamente para assinar as sessões
- Use HTTPS/TLS — obrigatório para nuvem, fortemente recomendado para on-premises
- Faça a rotação da chave de API do agente ao descomissionar máquinas
- Restrinja o acesso de rede ao servidor PatchOne a sub-redes confiáveis
- Aplique permissões de arquivo com privilégio mínimo nos arquivos de configuração do servidor e do agente
