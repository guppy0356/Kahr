# Kahr

A TODO app monorepo with a Hono API backend and React SPA frontend.

## Tech Stack

**Backend**
- [Hono](https://hono.dev/) - Web framework
- [Cloudflare Workers](https://workers.cloudflare.com/) - Edge runtime

**Frontend**
- [React](https://react.dev/) - UI library
- [Vite](https://vitejs.dev/) - Build tool
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Hono RPC](https://hono.dev/docs/guides/rpc) - Type-safe API client

## Project Structure

```
Kahr/
├── backend/                    # Hono API (Cloudflare Workers)
│   └── src/
│       ├── index.tsx           # Entry point
│       └── api.ts              # TODO CRUD API
├── frontend/                   # React SPA (Vite)
│   └── src/
│       ├── features/todo/
│       │   ├── hooks/useTodoFacade.ts    # Server communication
│       │   ├── hooks/useTodoPresenter.ts # UI logic
│       │   ├── TodoContainer.tsx         # Dependency injection
│       │   └── components/TodoList.tsx   # View component
│       └── lib/client.ts       # Hono RPC client
└── package.json                # npm workspaces config
```

## Getting Started

```sh
npm install
```

## Development

```sh
# Backend only (port 5173)
npm run dev

# Frontend only (port 5174)
npm run dev:frontend

# Both concurrently
npm run dev:all
```

## Deployment

```sh
npm run deploy
```

Deployment to Cloudflare Workers is also configured via GitHub Actions on push to `main`.

## Architecture

The frontend uses a **Facade + Presenter** pattern: the Facade handles server communication and data fetching, while the Presenter manages UI state and user interactions.
