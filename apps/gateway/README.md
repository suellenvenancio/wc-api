# 🌉 API Gateway (@wc-app/gateway)

Como a porta de entrada pública para a aplicação, o **API Gateway** unifica e roteia as sub-chamadas da nossa rede fragmentada.

- **Tecnologia Principal**: Fastify (Proxy Provider)
- **Porta padrão**: `3000`

## Rotas Mapeadas
Abaixo os mapeamentos automáticos repassados pela infraestrutura via Proxy:
- `/matches/*` -> Redirecionado para o serviço Match
- `/teams/*` / `/players/*` / `/coaches/*` -> Redirecionado para o serviço Team
- `/tournaments/*` -> Redirecionado para o serviço Tournament
- `/auth/*` -> Redirecionado para Autenticação.

Para executar este serviço isolado:
```bash
yarn dev
```
