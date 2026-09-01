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
│   ├── hooks/               Shared viewport and motion-preference hooks
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
| `/` | `Home` | Redesigned hero, club introduction, interactive community gallery, team directory, and FAQ |
| `/membership` | `Membership` | Work in Progress placeholder; the prior frontend-only form is retained in comments |
| `/events` | `Events` | Work in Progress placeholder; the prior event hero is retained in comments |
| `/initiatives` | `Initiatives` | Direct-only Work in Progress route; the prior initiative directory is retained in comments |
| `*` | `NotFound` | Friendly fallback for every unmatched route |

Because the application uses `BrowserRouter`, the hosting layer must return `index.html` for client-side routes that do not correspond to physical files. That fallback must be configured in the S3/CloudFront infrastructure outside this repository.

## Shared components

| Component | Location | Purpose |
| --- | --- | --- |
| `SiteLayout` | `src/components/layouts/SiteLayout.tsx` | Wraps every route with the shared header, main landmark, and footer |
| `Header` | `src/components/header/Header.tsx` | Provides the semantic site header and owns the navbar placement |
| `Navbar` | `src/components/navbar/Navbar.tsx` | Renders the centered Home, Events, and Membership links, active states, and responsive mobile menu |
| `Footer` | `src/components/footer/Footer.tsx` | Renders club identity, copyright text, and social platform icons |
| `Button` | `src/components/button/Button.tsx` | Typed shared button with primary and light variants; accepts native button props |
| `PageHero` | `src/components/page-hero/PageHero.tsx` | Provides shared hero structure while allowing Home and placeholder pages to supply their own presentation |
| `HeroBrand` | `src/components/hero/HeroBrand.tsx` | Resolves static or animated brand variants and passes reduced-motion-aware presentation options |
| `RetroSkyBackground` | `src/components/retro-sky-background/RetroSkyBackground.tsx` | Renders the fixed, decorative retro-sky SVG behind the redesigned Home page |
| `PolaroidFrame` | `src/components/polaroid-frame/PolaroidFrame.tsx` | Provides the reusable framed-photo presentation used by the Home gallery and team section |
| `DecorativeArrow` | `src/components/decorative-arrow/DecorativeArrow.tsx` | Retains the decorative arrow used by the preserved Membership and Initiatives designs |

The shared components focus on repeated UI and semantic structure. Route-specific composition remains under `src/pages/`.

## Page organization

### Home

`Home.tsx` composes a fixed retro-sky background, the versioned `HomeHero`, Who Are We panel, interactive community gallery, team section, and controlled FAQ accordion. The current `version-2-motion` hero uses the typographic brand treatment with CSS entrance and line motion, a Join Us action that navigates to Membership, and a reduced-motion-aware scroll cue into the introduction. A static hero configuration remains available in `HomeHero.tsx`.

The retro-sky SVG supplies the grid, stars, glowing sun, and looping CRT scanlines. `usePrefersReducedMotion` disables nonessential movement when requested by the operating system.

The Polaroid gallery uses `useInViewPair` to observe its two divider bars. It opens when both boundaries are visible or when a photo receives pointer hover or keyboard focus, and it cancels delayed state changes when visibility changes. Selecting a photo opens `GalleryModal`, a native dialog that locks background scrolling, supports backdrop and Escape dismissal, and restores focus to the opener.

`TeamSection.tsx` owns local selection state for the team directory. The member records live in `teamMembers.ts`; only the first entry currently has complete metadata and the remaining profiles are placeholders. FAQ content lives in `homeData.ts`, and `FutureThreeDPlaceholder.tsx` reserves the three-dimensional section for a later implementation.

### Membership

The active component renders a Work in Progress message. The prior semantic membership form remains commented in `Membership.tsx` so it can be restored or connected to a real membership flow later.

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
- The header is positioned over page content, and hero layouts reserve enough top space for the centered navigation.
- Home layers its content above a fixed responsive SVG background; other active routes continue to use the shared textured page-hero treatment.
- Imported files under `src/assets/` are fingerprinted by Vite. Files under `public/` retain root-relative names such as `/logo.png`.

## State and data

The application uses only local React state:

- mobile navigation open/closed state in `Navbar`;
- open FAQ, selected gallery photo, and Polaroid interaction state in `Home`;
- selected team member state in `TeamSection`;
- paired divider visibility from `useInViewPair`;
- the system motion preference exposed by `usePrefersReducedMotion`.

Static page content is stored in typed local modules. There is no remote fetching or shared application store.

## Accessibility conventions

- Semantic landmarks include `header`, `nav`, `main`, `section`, and `footer`.
- Route and action controls use native links and buttons.
- Decorative images use empty alternative text and `aria-hidden` where appropriate.
- Interactive team selections expose `aria-pressed`, and dynamic messages use live regions.
- Community photos are keyboard-accessible dialog triggers, and the dialog restores focus after closing.
- FAQ controls expose their expanded state and connect each question to its answer panel.
- Reduced-motion preferences suppress or shorten nonessential animation and smooth scrolling.
- Heading relationships use IDs and `aria-labelledby` on major sections.

## Adding a page

1. Create a route folder under `src/pages/<page-name>/`.
2. Add the route-level `.tsx` file and an adjacent CSS Module.
3. Put route-only data beside the page and reusable UI under `src/components/`.
4. Register the route in `src/App.tsx`.
5. Add navigation only when the page should be directly discoverable.
6. Test desktop and mobile layouts, then run `npm run lint` and `npm run build`.
