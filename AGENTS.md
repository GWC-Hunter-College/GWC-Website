# Repository Guidance

## Project scope

This repository is a frontend-first website for the Girls Who Code club at Hunter College. It is a React 19 single-page application built with TypeScript and Vite, with client-side routing provided by React Router.

Implement and refine the frontend unless the user explicitly requests otherwise. Do not create, implement, connect, or modify backend functionality, APIs, databases, authentication services, server code, or infrastructure without explicit user instruction. Frontend-only mocks and static placeholder data are acceptable when they are clearly appropriate to the requested work and do not imply a working backend.

Codex should handle routine implementation and verification. Leave product choices and material architectural decisions to the user: identify and clearly flag decisions that significantly affect application structure, dependencies, data ownership, routing, deployment, or future backend integration rather than silently choosing a direction.

## Repository structure and conventions

- `src/main.tsx` is the browser entry point.
- `src/App.tsx` owns the React Router route tree.
- `src/pages/` contains route-level page components, grouped by page.
- `src/components/` contains reusable UI and route layout components.
- Component and page styles currently live in adjacent `.css` files.
- `public/` contains static image assets referenced from root-relative paths.
- Use TypeScript consistently for application code. New React components should be `.tsx`; non-JSX utilities should be `.ts`.
- Follow the existing project tooling and configuration in `package.json`, `tsconfig*.json`, and `eslint.config.js`.

## Before making changes

- Inspect the relevant existing code, styles, route structure, configuration, and nearby components before editing.
- Check the working tree and treat pre-existing changes as user-owned. Do not overwrite or revert them.
- Understand the current behavior before replacing it. Preserve working functionality unless the request explicitly calls for its removal or replacement.
- Keep changes tightly scoped to the request. Never modify unrelated areas merely to clean up, reformat, reorganize, or modernize them.
- If a request requires a material product or architectural decision that has not been made, surface the decision and its tradeoffs to the user.

## Implementation guidelines

- Prefer the simplest architecture that cleanly satisfies the request. Avoid speculative layers, generic frameworks, premature state management, and unnecessary abstractions.
- Create reusable React components when UI or behavior is genuinely shared, repeated, or independently meaningful. Do not extract one-off markup solely for abstraction's sake.
- Keep route-level composition in `src/pages/` and reusable UI in `src/components/` unless the existing structure or explicit request calls for something else.
- Use React Router for internal navigation and preserve the nested layout approach unless intentionally changing the routing architecture.
- Use TypeScript types at component and data boundaries. Avoid `any`; narrow unknown data where required.
- Do not add dependencies when React, browser APIs, existing packages, or a small local implementation are sufficient. Any new dependency should have a clear, request-relevant benefit.
- Do not implement backend functionality unless explicitly instructed.

## CSS and responsive design

- Make new and changed layouts responsive across narrow mobile screens, tablets, and desktop widths.
- Avoid globally scoped CSS collisions. Scope selectors beneath a component/page root class, use distinctive class names, or adopt CSS Modules only as part of an intentional, appropriately scoped change.
- Do not introduce broad element selectors such as `li`, `img`, or `nav ul` in component styles, and do not add page-level universal resets such as `* { ... }`. Keep true global defaults in `src/index.css`.
- Be aware that the existing plain CSS imports are global. Check for duplicate class names and unintended cascade effects before adding or changing selectors.
- Prefer flexible sizing, wrapping, and media queries over layouts that depend on fixed viewport heights, hard-coded offsets, or manual line breaks.
- Preserve accessibility: use semantic elements, meaningful labels, keyboard-accessible interactions, visible focus states, and empty alternative text for purely decorative images.

## Validation

After implementation changes, run both:

```sh
npm run lint
npm run build
```

The production build runs TypeScript project compilation followed by the Vite build. Fix lint, type, and build errors caused by your changes. If validation cannot run or an unrelated pre-existing failure remains, report that clearly and distinguish it from failures introduced by the task.

Use `npm run dev` for local development and `npm run preview` to inspect a completed production build when visual or runtime verification is useful. Do not claim visual verification unless it was actually performed.

## Completion and handoff

- Review the final diff and confirm that only request-relevant files changed.
- Clearly summarize what changed and where.
- Report the results of lint and production-build validation.
- Mention remaining limitations or assumptions that matter to the requested feature.
- Explicitly flag architectural decisions that materially affect the project so the user can approve or redirect them.
