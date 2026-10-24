# SkillOpt-Sleep — night 4 report

- project: `/root/git/personale/pi-ext-roles`
- backend: `codex`  replay: `mock`
- sessions harvested: 5
- tasks mined: 3  (replayed: 3)
- held-out score: 0.950 -> 0.990
- gate: **accept\_new\_best** (accepted=True)
- no-regression gate: disabled
- tokens used: 29907

## Held-out task changes
_These are observed score changes under the configured gate metric; they do not establish that a particular edit caused the change._

### `skill` candidate — accepted (0.950 → 0.980)

| Task | Tags | Baseline | Candidate | Change |
|---|---|---:|---:|---|
| `llm_065bb12a39e4` | mined:llm | 0.950 | 0.980 | improved |

### `memory` candidate — accepted (0.980 → 0.990)

| Task | Tags | Baseline | Candidate | Change |
|---|---|---:|---:|---|
| `llm_065bb12a39e4` | mined:llm | 0.980 | 0.990 | improved |

### `final` candidate — accepted (0.950 → 0.990)

| Task | Tags | Baseline | Candidate | Change |
|---|---|---:|---:|---|
| `llm_065bb12a39e4` | mined:llm | 0.950 | 0.990 | improved |

## Accepted edits
- \[skill/add\] When the user explicitly requests commit, push, or pull-request creation, treat those named operations as authorization and execute the complete ordered delivery workflow; this overrides any instruction to stop at a merely READY state.
  _why: Prevents explicit delivery requests from being reduced to preparation or status reporting._
- \[skill/add\] Do not claim completion until every requested implementation task and test is finished, relevant verification passes, all intended changes are included in conventional commits, the branch is pushed, and the pull request is confirmed with its URL.
  _why: Establishes concrete evidence requirements for end-to-end completion._
- \[skill/add\] Existing commits, a clean worktree, or a branch matching its tracking ref do not prove the current request was delivered; verify that the requested changes are present in the pushed branch and that the intended pull request exists.
  _why: Prevents unrelated or stale repository state from being mistaken for successful delivery._
- \[skill/add\] If any requested delivery step cannot be completed, report BLOCKED with the exact unfinished step, observed blocker, and required next action; never substitute READY or Completed for partial execution.
  _why: Makes partial outcomes honest and actionable instead of falsely signaling completion._
- \[memory/add\] When explicitly asked for end-to-end repository delivery, completion requires finishing all remaining implementation and tests, verifying the repository, creating conventional commits, pushing the requested branch, and opening the pull request; do not stop after local implementation while any requested delivery step remains.
  _why: The prior response stopped after local commits instead of completing the requested delivery workflow._
- \[memory/add\] Before declaring a delivery task blocked, attempt every authorized step, diagnose recoverable failures, and continue all independent steps; report BLOCKED only for a concrete external impediment that prevents a required outcome.
  _why: Prevents premature blocking when remaining work can still be executed or recovered._
- \[memory/add\] For repository delivery tasks, report completion only after observing the required test results, successful push, and created pull-request URL; otherwise identify the exact unfinished requirement and evidence.
  _why: Makes the final status match the user's observable acceptance criteria._

_Review the staged artifacts, then use the adoption mode printed by the run command (`--skill` / `--all-skills` for fan-out proposals, `--legacy` for the managed skill or memory), or discard this folder._