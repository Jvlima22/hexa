# Hexa Backend

Este é o servidor backend dedicado para o projeto **Hexa Rose**.

## Estrutura
- `src/config`: Configurações de SDKs (Mercado Pago, Supabase).
- `src/controllers`: Lógica de recebimento de requisições.
- `src/services`: Lógica de negócio e integrações externas.
- `src/routes`: Definição de rotas Express.
- `src/server.ts`: Ponto de entrada do servidor.

## Scripts
- `npm run dev`: Executa o servidor com hot-reload (tsx).
- `npm run build`: Compila o TypeScript para JavaScript.
- `npm run start`: Executa a versão compilada.

## Como usar
Para rodar tanto o frontend (Next.js) quanto este backend simultaneamente, use o comando na raiz do projeto:
```bash
npm run dev:all
```
