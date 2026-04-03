# 🛡️ Serviço de Autenticação (@wc-app/auth)

Este microsserviço lida com todo o processo centralizado de segurança de contas da plataforma *World Cup Simulation*.

- **Tecnologia Principal**: Fastify, gRPC, Prisma
- **Responsabilidade**: Gerar Access Tokens, realizar autenticação via senha, guardar as sessões e dispor uma verificação de usuários (UserGrpc) para prover informações de contexto de ID para os outros microsserviços do ambiente.

## Como funciona
Ele compartilha o secret do cookie e do JWT via arquivo `.env`. Qualquer serviço dentro do Gateway pode descriptografar, mas este serviço é vital para a mutação autenticada interna.

**Porta padrão API**: Exposto ao Gateway sob requisições de login.
**Porta gRPC**: Escuta na porta `50051`.
