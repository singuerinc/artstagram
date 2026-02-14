# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Artstagram is an unofficial ArtStation client with an Instagram-inspired feed. It's a React SPA with Vercel Serverless Functions as a backend proxy to the ArtStation API.

## Commands

- **Dev server:** `pnpm start` (runs `vercel dev`)
- **Build:** `pnpm build` (builds the client with Vite)
- **Tests:** `pnpm test` (Vitest)
- **Watch tests:** `pnpm test:watch`
- **Single test:** `pnpm test -- --testPathPattern=<pattern>` (e.g., `pnpm test -- --testPathPattern=api.test`)

## Architecture

### Client (`src/`)
- **Bundler:** Vite
- **Stack:** React 18, TypeScript 5, styled-components 6, TanStack Router
- **Entry:** `index.html` (project root) → `src/index.tsx` → `App.tsx`
- **Routing:** Four feed views (picks, latest, trending, randomize) and a user profile route (`/user/:id`)
- **Data types:** `IArtImage.ts` defines the core ArtStation data interfaces (`IArtImage`, `IUser`, `ICover`, `Icons`)
- **Feed sorting:** `Sorting.ts` enum maps to ArtStation API sorting parameters
- **API layer:** `src/services/api.ts` makes requests to the lambda proxy endpoints

### Serverless Functions (`api/`)
- `projects.js` — proxies requests to `artstation.com/projects.json`
- `user-projects.js` — proxies requests to `artstation.com/users/{user}/projects.json`
- Served at `/api/projects` and `/api/user-projects` by Vercel

### Testing
- Vitest + React Testing Library
- Tests live in `__tests__/` directories adjacent to their source files
- Test files must match `**/__tests__/*.(test|spec).(ts|tsx|js)`
- Vitest config is in `vite.config.ts` (globals, jsdom environment)

### Deployment
- Hosted on Vercel; config in `vercel.json`
- Client builds to `dist/client`
- SPA fallback: all routes redirect to `/index.html`
