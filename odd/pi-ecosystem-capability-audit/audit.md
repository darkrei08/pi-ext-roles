# Pi ecosystem capability audit

Date: 2026-10-24
Repository under change: `darkrei08/pi-ext-roles` fork of `vekexasia/pi-ext-roles`
Branch: `feat/role-diagnostics-audit`

## Evidence policy

This report separates source evidence, runtime evidence, documentation-only claims, and unavailable capabilities. It excludes credentials, auth files, provider configuration, and private model data. The `gentle-ai` extension lifecycle is intentionally excluded as requested; this report does not treat the ambient ODD harness as a product integration.

## Inventory

| Component | Evidence observed | Classification | Boundary / consequence |
| --- | --- | --- | --- |
| `pi-ext-roles` | `package.json:3,22-57,72-94`; `src/roles.ts`; `src/launcher.ts`; `test/*.test.mjs` | Verified source and local test surface | Owns role files, parsing, precedence, resolution, contribution collection, and `pi-role`; no session lifecycle ownership. |
| `pi-extensible-workflows` | `/root/git/personale/pi-extensible-workflows/packages/core/src/types.ts:399`; `packages/core/src/registry.ts:38-89,196,221`; `docs/roles.html:39-52`; `docs/developers.html:48-55,310-337` | Verified source/docs; runtime CLI not available | Owns workflow runtime, preparation hooks, sessions, persistence, retries, budgets, worktrees, and generic doctor. `piewf` is not on `PATH`, so cross-package runtime proof is unavailable in this environment. |
| Personal `pi-herdr-orchestration` | `README.md:5,81-109,250-290,452-480`; `extensions/index.mjs:1-2,44-182`; local package and test scripts | Source/docs verified; live integration unverified | Orchestrates worktree and Herdr coordination. It should consume role preparation and workflow APIs, not add orchestration responsibility to `pi-ext-roles`. |
| Personal `pi-model-fit` | `README.md:3-14,29-93`; `SKILL.md:9,22-31,52-69,74-81`; `extensions/runtime-model-refresh.mjs:78-82,119-182` | Source/docs verified; model entitlement, quota, and inference unverified | Provides model evidence and an active-session refresh extension. It must not mutate role defaults, credentials, workflow ownership, or HA state outside its declared `groups` surface. |
| Pi runtime | `pi` resolves to `/root/.pi/agent/bin/pi`; Node `v22.23.3`; npm `12.2.1` | Runtime available | Native Pi launcher checks can run locally. |
| `pi-role` | Resolves to `/root/.nvm/versions/node/v22.23.3/bin/pi-role` | Runtime available | Installed executable may not be the checked-out build; package tests must use the repository's `dist/cli.js` and distinguish that from PATH behavior. |
| `gh` | `/usr/bin/gh`; authenticated GitHub inventories were previously queried | Runtime available | Issue/PR metadata was observed for the fork and related repositories. No issue/PR was created or changed. |
| GGA | `gga` resolves to `/usr/local/bin/gga`; source checkout exists at `/root/git/Gentleman-Programming/gentleman-guardian-angel` | Installed/source available; target integration unverified | No GGA run and no target `.gga` configuration was used as evidence in this audit. |
| Herdr | `herdr` resolves to `/root/.local/bin/herdr` | CLI available; live pane/session integration unverified | `HERDR_ENV=1` live behavior was not claimed or exercised. |
| Engram | Callable memory tools are active in this Pi session; several target repos contain `.engram/` or `.git/gentle-ai` metadata | Session memory verified; target runtime integration unverified | Repository marker directories are not proof of an enabled product integration. No private memory contents or credentials are included. |
| Gentle Shell | Local checkout exists at `/root/git/Gentleman-Programming/gentle-shell` | Source checkout only | No shell executable/runtime integration was claimed. |
| `pi-herdsman` | GitHub metadata was inspected; no local Git checkout was present at the checked path | External source metadata only | No local source/runtime verification was possible; do not couple `pi-ext-roles` to Herdsman APIs. |
| `piewf` command | `command -v piewf` returned unavailable | Unavailable runtime capability | Cross-repository workflow CLI tests require the checked-out workflow harness or a future installed CLI. |
| `docker` | `/usr/bin/docker` | Available tool, not needed for this package-only slice | Container matrix is not applicable unless scripts/packaging/CLI behavior is changed; the launcher contribution will require a focused cross-platform check if retained. |
| `gentle-ai` extension lifecycle | Explicitly excluded by the user | Deliberately not used as a product integration | Do not add review authority, lifecycle, or provider-specific coupling to this contribution. |
| Other orchestrators, cache/context engines, and Wizard-AI references | Mentioned by personal orchestration documentation but no checked-out source or executable was established in this audit | Documented-only / not evaluated | Treat as optional capability claims, not dependencies or acceptance criteria for `pi-ext-roles`. |

Supporting checkouts had unrelated uncommitted files in personal repositories; they were not modified. The target repository has only the audit files untracked at the time of this report.

## Canonical role and API matrix

| Concern | `@piewf/pi-ext-roles` | `pi-extensible-workflows` | Compatibility decision |
| --- | --- | --- | --- |
| Role files, frontmatter, names, provenance | `src/roles.ts`, `src/settings.ts`, `docs/roles.md:174-182` | Explicitly extension-owned, `docs/roles.html:46-48` | Keep ownership in roles. |
| Pure discovery and resolution | `discoverRoles`, `loadRole`, `resolveRole`, `composeRoleConfiguration` | Consumes prepared options | Preserve pure, side-effect-free APIs. |
| Role contribution transport | `registerRoleContribution` / `collectRoleContributions`, `src/contributions.ts:20-49` | Supplies loaded extension/runtime membership | Keep the event-bus wire contract generic; no workflow singleton. |
| Workflow preparation | `src/workflow.ts`; optional `/workflow` export; `src/extension.ts:24-35` | `agentPreparationHooks` in `types.ts:399` and `registry.ts:38-89` | Adapter-only integration. Do not move role catalogs or directories into core. |
| Model aliases | Shared role settings and role model references; workflow adapter applies role defaults | Runtime model catalog, concrete validation, dynamic aliases, consumer ceilings | Treat as a coordination point. Roles may provide role-level intent; workflows own runtime/session validation. |
| Prompt and resource selectors | Role prompt, tools/skills/extensions/context selectors and provenance | Final native setup, root/parent ceilings, resource/session lifecycle | Keep selectors bounded by the consumer; no security-sandbox claim. |
| Sessions, persistence, retries, budgets, checkpoints, worktrees | Not owned; docs explicitly keep lifecycle with consumers | Core responsibility, `docs/developers.html:48-55,144,321` | Never add these to roles. |
| Generic diagnostics | `pi-role --identify` prints source path and raw content; `docs/roles.md:216` and README quick start | `piewf doctor` inspects generic prepared options but has no role catalog or `roleInspection`, `docs/roles.html:51`, `docs/developers.html:310-311` | Add one read-only role diagnostic at the roles boundary; do not add a workflow-specific doctor API. |

## Ranked contribution candidates

| Rank | Candidate | Decision | Reason |
| --- | --- | --- | --- |
| P0 | Read-only role diagnostics | Implement in this branch | Fills the evidenced gap between raw `--identify` and generic workflow doctor without changing resolution or ownership. |
| P1 | Cross-package local adapter verification documentation | Prepare as follow-up only | Workflow docs already define `verify-local-roles-adapter`; it needs the unavailable `piewf` runtime and should not expand this code slice. |
| P2 | Role/model evidence bridge to `pi-model-fit` | Reject for upstream roles | Provider, quota, HA, and model-fit policy are personal concerns; adding them would violate S7, S8, and S12. |
| P2 | Herdr/Chief/worker scheduling hooks | Reject for upstream roles | Orchestration and terminal coordination belong to personal orchestration, PiWorkflow, and Herdr. |
| P3 | Memory/Gentle AI lifecycle hooks | Reject | Explicitly excluded and unrelated to generic role resolution. |

## Selected implementation contract

Add a generic read-only `pi-role <role> --diagnose` command that emits JSON describing the selected role's name, source path, provenance scope/owner/priority, prompt mode, model declaration, selector declarations, context scopes, and whether the role is a packaged fallback. It must:

1. perform only existing pure discovery and file reads;
2. never load extension factories unless the existing explicit discovery flag is supplied;
3. never start Pi, create a session, resolve providers, inspect credentials, or mutate files;
4. preserve all existing CLI behavior and errors;
5. be useful to standalone users and workflow consumers without introducing workflow ownership.

The diagnostic output is intentionally metadata-only: it does not include the role prompt body, extension settings values, aliases, or credentials. `--identify` remains the explicit raw-content command.

## Migration and personal-only exclusions

- Keep roles under `~/.pi/agent/pi-ext-roles/roles` and authorized project `.pi/pi-ext-roles/roles`; do not restore workflow-owned role directories.
- Keep `pi-extensible-workflows` enabled only where workflow agents are required; roles remains independently usable.
- Keep `pi-herdr-orchestration` responsible for master/chief/worker hierarchy, worktrees, mailbox evidence, Herdr supervision, and integration decisions.
- Keep `pi-model-fit` responsible for model catalog/evidence, route scoring, and its bounded runtime refresh extension. Do not add provider aliases or HA mutation to `pi-ext-roles`.
- Keep GGA, Engram, Gentle Shell, and other optional tools as external integrations. Their presence is not a role package dependency.
- The requested `gentle-ai` extension exclusion remains in force; no review/consent lifecycle is part of this contribution.

## Focused PR draft

Title: `feat(cli): add read-only role diagnostics`

Body:

> Adds `pi-role <role> --diagnose` as a metadata-only JSON diagnostic. It reports the resolved source and role declaration without starting Pi, loading providers, exposing prompt bodies, or changing role resolution. Existing `--identify`, `--list`, launcher delegation, and workflow adapter behavior remain unchanged.
>
> Verification: `npm test`; `npm run test:package`; focused launcher tests for valid diagnostics, unknown roles, option-value scanning, and factory-free default discovery. Cross-package workflow verification remains unavailable because `piewf` is not installed; the workflow source/API comparison is recorded in this audit.

## Verification ledger

- PASS: `npm run build`.
- PASS: `PI_OFFLINE=1 npm test` (63 tests passed).
- PASS: focused `--diagnose` launcher test.
- PASS: focused existing launcher baseline test.
- PASS: `npm run test:terminal` (regular selected, regular unselected, and fullscreen smoke rows passed).
- PASS: `git diff --check`.
- PASS: `npm run test:package` packed-install smoke, pure options, two installed API copies, CLI, resources, and typecheck. The fixture handles npm 12's keyed `npm pack --json` output and pins `@earendil-works/pi-codemode@1.0.0` to match Pi 1.0.0.
- PASS: Linux container matrix, each with `npm ci` and `PI_OFFLINE=1 npm test`: Debian (`node:22.23.3-bookworm`), Alpine (`node:22.23.3-alpine`), Fedora (`fedora:43`), Arch (`archlinux:latest`), and openSUSE (`opensuse/tumbleweed:latest`); each completed 63/63 tests.
- NOT RUN: Windows and macOS are unavailable from this Linux host; no Windows or macOS runner was provisioned.

## Open evidence gaps

- `piewf` CLI and the documented local cross-package harness were not runnable from this checkout.
- No live provider inference, entitlement, quota, GGA review, Herdr pane, or paid-provider test was performed.
- The PATH `pi-role` executable was not treated as proof of the checked-out branch; repository-built `dist/cli.js` is the test target.
- No claim is made about unavailable optional tools beyond the bounded local command and checkout probes recorded above.
