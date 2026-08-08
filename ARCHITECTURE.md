# Architecture

## What this is

An AI Channel Co-Pilot: an agent that can look at a real YouTube channel's
videos and analytics and answer questions / take actions on it, plus a
dashboard to talk to it and see what it sees. Built for real use on this
channel, not a toy demo.

## Components

- **`backend/`** — Python, FastAPI. Owns the agent loop and every real tool
  the agent can call (YouTube Data/Analytics API, title/thumbnail scoring,
  etc. — added incrementally, episode by episode). Exposes a small HTTP API
  the frontend talks to.
- **`frontend/`** — Vite + React + TypeScript. A dashboard: video list,
  analytics, and a chat panel to ask the agent things. Talks to the backend
  over plain JSON HTTP — no framework coupling in either direction, so
  either side can be swapped later without touching the other.

## Why this split

- FastAPI: same language/ecosystem as the rest of this build, minimal
  ceremony, real async support for calling external APIs (YouTube) without
  blocking.
- Vite + React: fast real dev loop, and this environment already has the
  tooling proven out (Node 24, npm 11 confirmed working) — nothing new to
  fight with.
- Plain HTTP JSON between them instead of a shared framework: keeps the
  agent's tool-calling loop (backend) fully decoupled from how it's
  displayed (frontend) — matters once MCP servers get added (Episode 4),
  since those are backend-only and shouldn't need any frontend awareness.

## Episode-to-component map (subject to change as real work reveals better ideas)

| Episode | Touches |
|---|---|
| 2 — Architecture | Both skeletons, health check, first real connection |
| 3 — Agent | `backend/agent/` — the actual reasoning/tool-calling loop |
| 4 — MCP | `backend/tools/` — real YouTube API tools exposed to the agent |
| 5 — RAG | Search over real video transcripts/comments |
| 6 — Memory | Persisting past agent decisions/conversations |
| 7 — Multi-agent | Splitting into title-agent / thumbnail-agent / analytics-agent |
| 8 — Code execution | A sandboxed way for the agent to run its own checks |
| 9 — Security | Auth, input handling, secrets |
| 10 — Deployment | Getting it running somewhere real, not just localhost |
| 11-12 — Breaking/fixing it | Whatever actually breaks, fixed for real |
| 13 — Real-world test | Run it against this channel's real data |
| 14 — Final product | Wrap-up, what's next |
