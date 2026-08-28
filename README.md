# Girls Who Code at Hunter College

The Girls Who Code at Hunter College website is a responsive React single-page application for introducing the club, presenting its community, and collecting prospective member interest.

This repository contains the frontend MVP. Home and Membership are fully presented, while Events and Initiatives intentionally display Work in Progress pages. Their complete pre-MVP designs remain preserved in the source and in the documentation screenshots.

## Technology

- React 19 and TypeScript
- React Router for client-side routing
- Vite for local development and production builds
- CSS Modules for component- and page-scoped styling
- ESLint for static analysis
- GitHub Actions, Amazon S3, and CloudFront for deployment

## Local development

Requirements:

- Node.js 18 or newer
- npm

```sh
npm ci
npm run dev
```

Vite prints the local URL after startup. Changes under `src/` are reflected through hot module replacement.

Before submitting a change, run:

```sh
npm run lint
npm run build
```

The build command type-checks the project and writes the production bundle to `dist/`.

## Routes

| Route | Page | MVP status |
| --- | --- | --- |
| `/` | Home | Available |
| `/membership` | Membership | Available; the form is frontend-only |
| `/events` | Events | Work in Progress placeholder |
| `/initiatives` | Initiatives | Work in Progress placeholder |
| Any unmatched path | Not Found | Available |

## Documentation

- [Application architecture and components](docs/ARCHITECTURE.md)
- [Page gallery](docs/PAGES.md)
- [CI/CD workflows](docs/CI_CD.md)
- [Contributors and credits](docs/CONTRIBUTORS.md)

## MVP preview

[![Girls Who Code at Hunter College home page](docs/screenshots/home.png)](docs/PAGES.md#home)

## Current limitations

- The Membership form confirms submission only in the browser and does not send or store data.
- Social icons are presentational and do not yet link to club accounts.
- Events and Initiatives are hidden behind temporary placeholders while their implementations remain preserved in their page source files.
- Infrastructure configuration lives outside this repository; the repository contains deployment workflows only.

## License

No open-source license is currently declared in this repository. All site content and assets should be treated as project-owned unless separately attributed.
