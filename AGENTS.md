# Repository Agent Instructions

This repository uses local agent definitions under `.agents/`. When a user prompt is related to agents, skills, implementation guidance, architecture, frontend work, backend work, or repository-specific AI instructions, use the local `.agents/` files as the primary source of truth.

## Priority Order

1. Read the relevant files in `.agents/` first.
2. Use repository files outside `.agents/` only when the local agent files do not cover the task.
3. Use broader global or fallback guidance only after checking the local `.agents/` files.

## Local Agent Structure

The local agent directory for this repository is:

```txt
.agents/
  skills/
    backend-agent/
      SKILL.md
      agents/
        openai.yaml
    frontend-agent/
      SKILL.md
      agents/
        openai.yaml
```

## What To Inspect

Do not stop at the `.agents/` folder itself. Inspect the relevant files inside it.

Read these files when they apply:

- `.agents/skills/backend-agent/SKILL.md`
- `.agents/skills/backend-agent/agents/openai.yaml`
- `.agents/skills/frontend-agent/SKILL.md`
- `.agents/skills/frontend-agent/agents/openai.yaml`

## Skill Routing

Use `.agents/skills/frontend-agent/` for:

- frontend design
- frontend implementation
- Next.js UI work
- React component work
- Tailwind styling
- layout and responsive behavior
- accessibility improvements
- UI critique
- landing pages
- dashboards
- product presentation quality

Use `.agents/skills/backend-agent/` for:

- backend architecture
- API design
- authentication
- authorization
- validation
- database design
- schema changes
- migrations
- server-side logic
- security hardening
- performance optimization
- code organization for backend systems

If a task spans both frontend and backend, inspect both local agent folders and use the smallest set of instructions that covers the work.

## How To Use The Local Agent Files

When a relevant local agent exists:

1. Read its `SKILL.md` before making changes.
2. Read its `agents/openai.yaml` when the task is about prompt routing, display names, agent usage, or assistant-facing metadata.
3. Follow the local skill guidance before using general engineering defaults.
4. Preserve repository-specific conventions from the local skill unless the user explicitly asks to change them.

## Local Agent Summaries

### Frontend Agent

Source files:

- `.agents/skills/frontend-agent/SKILL.md`
- `.agents/skills/frontend-agent/agents/openai.yaml`

Purpose:

- deliberate frontend design and implementation
- product-aware UI decisions
- strong typography, layout, and hierarchy
- responsive behavior
- accessibility
- production-quality React and Next.js frontend code

OpenAI agent metadata:

- display name: `Frontend Agent`
- short description: `Deliberate frontend design and implementation`
- default prompt: `Use $frontend-agent to design, critique, or build a polished frontend experience.`

### Backend Agent

Source files:

- `.agents/skills/backend-agent/SKILL.md`
- `.agents/skills/backend-agent/agents/openai.yaml`

Purpose:

- production backend architecture
- secure API design
- database modeling
- validation and authorization
- scalable file structure
- maintainable backend code
- performance and security review

OpenAI agent metadata:

- display name: `Backend Agent`
- short description: `Production backend architecture and APIs`
- default prompt: `Use $backend-agent to design, critique, or build a production-quality backend.`

## Repository Rule

If the user prompt mentions `.agents`, agents, skills, prompts, agent behavior, agent configuration, local AI instructions, or repository guidance, treat `.agents/` as mandatory context and inspect the relevant files inside it first.

## Next.js Note

This project may use a newer Next.js version with breaking changes. Before editing Next.js code, read the relevant guide in `node_modules/next/dist/docs/`.
