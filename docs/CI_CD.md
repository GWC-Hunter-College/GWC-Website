# CI/CD workflows

## Current system

The repository uses GitHub Actions to build the Vite application, upload `dist/` to Amazon S3, and invalidate a CloudFront distribution. Deployment is branch-driven.

```text
push to staging or production
└── GitHub Actions workflow
    ├── check out the commit
    ├── install Node.js 18
    ├── npm ci
    ├── npm run build
    ├── configure AWS credentials
    ├── aws s3 sync --delete
    └── invalidate CloudFront /*
```

There is currently no pull-request validation workflow. Linting is not run by the deployment workflows, so contributors must run `npm run lint` locally in addition to `npm run build`.

## Active workflows

GitHub discovers workflow files directly inside `.github/workflows/`. The two active definitions are:

| Workflow | Trigger | Job | S3 destination | CloudFront variable |
| --- | --- | --- | --- | --- |
| `.github/workflows/staging.yml` | Push to `staging` | `deploy-staging` | `s3://gwc-club-site/main` | `AWS_CF_DIST_ID_STAGING` |
| `.github/workflows/production.yml` | Push to `production` | `deploy-prod` | `s3://gwc-club-site/production` | `AWS_CF_DIST_ID_PROD` |

The staging path above is documented exactly as implemented. Although its branch and workflow are named staging, the active workflow currently uploads to the S3 prefix `main`.

## Workflow steps

Both active workflows perform the same sequence:

1. `actions/checkout@v3` checks out the pushed commit.
2. `actions/setup-node@v3` installs Node.js 18.
3. `npm ci` installs the exact dependency versions from `package-lock.json`.
4. `npm run build` runs the TypeScript project build followed by Vite's production build.
5. `aws-actions/configure-aws-credentials@v2` exposes AWS credentials in `us-east-1`.
6. `aws s3 sync ./dist/ <destination> --delete` makes the destination mirror the latest build. Files removed from `dist/` are deleted remotely.
7. `aws cloudfront create-invalidation --paths "/*"` clears cached files so the new deployment becomes visible.

## Required GitHub configuration

Repository or environment secrets:

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`

Repository or environment variables:

- `AWS_CF_DIST_ID_STAGING`
- `AWS_CF_DIST_ID_PROD`

The credentials need permission to synchronize the intended S3 paths and create invalidations for the corresponding CloudFront distributions. Secret values must never be committed to the repository.

## Nested workflow copies

The repository also contains:

- `.github/workflows/deploy/staging.yml`
- `.github/workflows/deploy/production.yml`

[GitHub's workflow documentation](https://docs.github.com/en/actions/how-tos/reuse-automations/reuse-workflows) states that subdirectories of `.github/workflows` are not supported. Therefore, these nested copies do not run. They also disagree with the active staging workflow: the nested staging copy targets `s3://gwc-club-site/staging`, while the active workflow targets `s3://gwc-club-site/main`.

Treat the top-level workflow files as the current source of truth. The duplicate nested files should be reconciled or removed in a separate infrastructure-approved change rather than silently changed as part of frontend documentation.

## Release flow

### Staging

1. Open a pull request targeting `staging`.
2. Review and merge the change.
3. The push created on `staging` starts the staging deployment workflow.
4. Confirm the action succeeds and verify the staging CloudFront site.

### Production

1. Promote an approved commit to the `production` branch through the repository's release process.
2. The push starts the production deployment workflow.
3. Confirm the action succeeds and verify the production CloudFront site.

## Failure points and diagnosis

| Failure | Likely area to inspect |
| --- | --- |
| `npm ci` fails | Node/npm compatibility or lockfile mismatch |
| `npm run build` fails | TypeScript errors, invalid imports, or Vite build errors |
| AWS credential setup fails | Missing, expired, or incorrectly scoped GitHub secrets |
| S3 sync is denied | IAM permissions, bucket name, or destination prefix |
| CloudFront invalidation fails | Distribution variable or IAM invalidation permission |
| Deep route returns an S3/CloudFront error | SPA fallback configuration outside this repository |

## Recommended future CI improvements

These are documentation recommendations, not implemented behavior:

- add a pull-request workflow that runs `npm ci`, `npm run lint`, and `npm run build`;
- pin or update the major versions of the GitHub Actions dependencies deliberately;
- reconcile the active staging S3 prefix and the nested duplicate workflow files;
- use GitHub environments for staging and production protection when repository policy permits;
- add a post-deployment smoke check for the public URL and client-side routes.
