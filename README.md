# Girls Who Code at Hunter College

The Girls Who Code at Hunter College website is a responsive React single-page application for introducing the club, presenting its community, and guiding prospective members toward future participation.

This repository contains the frontend application. The redesigned Home page is fully presented, while Membership, Events, and Initiatives intentionally display Work in Progress pages. Their previous implementations remain preserved in comments in their page source files for future use.

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

| Route | Page | Status |
| --- | --- | --- |
| `/` | Home | Available; redesigned landing experience |
| `/membership` | Membership | Work in Progress placeholder; the prior frontend form is retained in source comments |
| `/events` | Events | Work in Progress placeholder; the prior featured-event design is retained in source comments |
| `/initiatives` | Initiatives | Work in Progress placeholder; directly routable but omitted from primary navigation |
| Any unmatched path | Not Found | Available |

## Documentation

- [Application architecture and components](docs/ARCHITECTURE.md)
- [Page gallery](docs/PAGES.md)
- [CI/CD workflows](docs/CI_CD.md)
- [Contributors and credits](docs/CONTRIBUTORS.md)

## Preview

[![Girls Who Code at Hunter College home page](docs/screenshots/home.png)](docs/PAGES.md#home)

## Current limitations

- The Join Us action currently opens the Work in Progress Membership route; no active membership form or submission flow is connected.
- Events, Membership, and Initiatives are hidden behind temporary placeholders while their prior implementations remain preserved in their page source files.
- The team directory still needs the current member list and complete profile data; only the first profile currently has final metadata.
- The Home introduction contains a placeholder for planned interactive three-dimensional artwork.
- Social icons are presentational and do not yet link to club accounts.
- Infrastructure configuration lives outside this repository; the repository contains deployment workflows only.

## License

The original source code in this repository is licensed under the MIT License. See the [LICENSE](LICENSE) file for full details.

Third-party names, trademarks, logos, branding, images, and other assets — including Girls Who Code and Hunter College intellectual property — remain the property of their respective owners and may be subject to separate usage restrictions.
