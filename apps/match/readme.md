# ⚽ Serviço de Partidas / Match (@wc-app/match)

Microsserviço de gestão estrutural interativa das simulações de jogos.

## Funções-Chave
- **Criação de Line-ups**: Elabora e aloca estratégias (táticas 4-3-3, 4-4-2, etc) e define quem entra em campo.
- **Associações**: Conversa via **gRPC** com o serviço `auth` (para confirmar o autor no banco de dados) e o serviço `team` (para verificar os times escolhidos).
- **Controle de Partidas**: Retém relatórios iniciais de partidas para consumo futuro pelo serviço de simulação IA.

**Porta HTTP padrão**: `3332`
