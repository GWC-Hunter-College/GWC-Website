# Application architecture

## Overview

The site is a frontend-only React 19 single-page application. Vite loads `src/main.tsx`, React renders `App`, and React Router selects the route-level page. Every route is nested beneath `SiteLayout`:

```text
index.html
└── src/main.tsx
    └── App.tsx (BrowserRouter and route table)
        └── SiteLayout
            ├── Header
            │   └── Navbar
            ├── active route through <Outlet />
            │   ├── Home
            │   ├── Membership
            │   ├── Events
            │   ├── Initiatives
            │   └── NotFound
            └── Footer
```

There is no application server, API layer, database, authentication system, or global state library.

## Repository layout

```text
.
├── .github/workflows/       GitHub Actions deployment definitions
├── docs/                    Architecture, page, deployment, and credit documentation
├── public/                  Root-relative static assets copied by Vite
├── src/
│   ├── assets/              Images imported by React components
│   ├── components/          Reusable site-wide UI
│   ├── pages/               Route-level features and their local data
│   ├── App.tsx              Route tree
│   ├── index.css            Global variables and base styles
│   └── main.tsx             Browser entry point
├── index.html               Vite HTML entry
├── package.json             Scripts and dependencies
└── vite.config.ts           Vite React plugin configuration
```

## Runtime flow

1. The browser requests `index.html`.
2. Vite's generated module script loads `src/main.tsx`.
3. `createRoot` renders the app inside React `StrictMode`.
4. `App.tsx` creates a `BrowserRouter` and matches the current URL.
5. `SiteLayout` renders the persistent header, the matched page through React Router's `Outlet`, and the footer.
6. Page components import their local CSS Module, data, shared components, and image assets.

## Route table

The route tree is owned by `src/App.tsx`.

| Path | Component | Responsibility |
| --- | --- | --- |
| `/` | `Home` | Hero, club introduction, community collage, interactive team directory, and FAQ |
| `/membership` | `Membership` | Membership hero and frontend-only interest form |
| `/events` | `Events` | Work in Progress placeholder; the prior event hero is retained in comments |
| `/initiatives` | `Initiatives` | Work in Progress placeholder; the prior initiative directory is retained in comments |
| `*` | `NotFound` | Friendly fallback for every unmatched route |

Because the application uses `BrowserRouter`, the hosting layer must return `index.html` for client-side routes that do not correspond to physical files. That S3/CloudFront fallback behavior is implemented outside this repository.

## Shared components

| Component | Location | Purpose |
| --- | --- | --- |
| `SiteLayout` | `src/components/layouts/SiteLayout.tsx` | Wraps every route with the shared header, main landmark, and footer |
| `Header` | `src/components/header/Header.tsx` | Provides the semantic site header and owns the navbar placement |
| `Navbar` | `src/components/navbar/Navbar.tsx` | Renders route links, active states, logo navigation, and the responsive mobile menu |
| `Footer` | `src/components/footer/Footer.tsx` | Renders club identity, copyright text, and social platform icons |
| `Button` | `src/components/button/Button.tsx` | Typed shared button with primary and light variants; accepts native button props |
| `PageHero` | `src/components/page-hero/PageHero.tsx` | Provides the shared background hero section while allowing page-specific layout classes |
| `DecorativeArrow` | `src/components/decorative-arrow/DecorativeArrow.tsx` | Reuses the decorative arrow asset with intentionally empty alternative text |

The shared components focus on repeated UI and semantic structure. Route-specific composition remains under `src/pages/`.

## Page organization

### Home

`Home.tsx` composes the hero, Who Are We panel, community collage, team section, and FAQ. It uses a React ref to smoothly scroll from Learn More to the introduction and React Router's `useNavigate` hook for the Join Us action.

`TeamSection.tsx` owns local selection state for the team directory. The member records live in `teamMembers.ts`, while FAQ content lives in `homeData.ts`. `FutureThreeDPlaceholder.tsx` reserves the three-dimensional section for a later implementation.

### Membership

`Membership.tsx` renders a semantic HTML form with labeled required fields, a year selector, interest checkboxes, and comments. Submission is intercepted in the browser and produces an accessible toast-style confirmation message.

### Events

The active component renders a Work in Progress message. The previous event hero, RSVP behavior, and `eventsData.ts` integration remain commented in `Events.tsx` so the design can be restored after real event data becomes available.

### Initiatives

The active component renders a Work in Progress message. The previous directory implementation remains commented in `Initiatives.tsx`; its reusable `InitiativeCard` and typed data in `initiativesData.ts` are ready for future use.

### Not Found

`NotFound.tsx` handles every unmatched path and provides a React Router link back to Home.

## Styling and responsive design

- `src/index.css` defines global defaults, shared color variables, content widths, and page gutters.
- Component and page styles use adjacent `.module.css` files to avoid global class-name collisions.
- Layouts use flexible widths, `clamp()`, grid, flexbox, and scoped media queries.
- The header is positioned over page content, and page heroes reserve enough top space for navigation.
- Imported files under `src/assets/` are fingerprinted by Vite. Files under `public/` retain root-relative names such as `/logo.png`.

## State and data

The application uses only local React state:

- mobile navigation open/closed state in `Navbar`;
- selected team member state in `TeamSection`;
- membership confirmation text in `Membership`.

Static page content is stored in typed local modules. There is no remote fetching or shared application store.

## Accessibility conventions

- Semantic landmarks include `header`, `nav`, `main`, `section`, and `footer`.
- Route and action controls use native links and buttons.
- Form controls have explicit labels and required states.
- Decorative images use empty alternative text and `aria-hidden` where appropriate.
- Interactive team selections expose `aria-pressed`, and dynamic messages use live regions.
- Heading relationships use IDs and `aria-labelledby` on major sections.

## Adding a page

1. Create a route folder under `src/pages/<page-name>/`.
2. Add the route-level `.tsx` file and an adjacent CSS Module.
3. Put route-only data beside the page and reusable UI under `src/components/`.
4. Register the route in `src/App.tsx`.
5. Add navigation only when the page should be directly discoverable.
6. Test desktop and mobile layouts, then run `npm run lint` and `npm run build`.
