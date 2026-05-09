---
phase: 01-scaffold-deploy
plan: "02"
subsystem: deploy
tags: [vercel, deploy, spa-rewrite, vercel-json, bun]
dependency_graph:
  requires: [01-01-SUMMARY (Slidev-SPA-buildable)]
  provides: [live-vercel-production-url, vercel-json-spa-rewrite, readme-deploy-docs]
  affects: [Phase 2 theme/layout work — same production URL remains stable]
tech_stack:
  added:
    - "vercel CLI (bunx vercel) — project linked to kaleb-nims-projects/syai-claude-workshop"
    - "vercel.json — static SPA build config with Bun pins and SPA rewrite"
  patterns:
    - "framework: null in vercel.json (Vite SPA, not Vue/Nuxt preset)"
    - "/(.*) → /index.html SPA rewrite for deep-link routing"
    - "bunx vercel deploy for manual deploys; production alias auto-assigned"
key_files:
  created:
    - vercel.json
  modified:
    - README.md
    - .gitignore (vercel CLI added `.vercel` entry on link)
decisions:
  - "DEPL-04 verification done against production URL (not preview) — Vercel deployment protection blocks curl on preview URLs (HTTP 401)"
  - "vercel git connect failed (no GitHub remote configured in local git) — README documents manual Vercel dashboard connect step"
  - "Production alias https://syai-claude-workshop.vercel.app assigned by Vercel on first deploy (auto *.vercel.app)"
metrics:
  duration: "2m"
  completed: "2026-05-09"
  tasks_completed: 3
  files_created: 1
  files_modified: 2
---

# Phase 1 Plan 2: Vercel Deploy Summary

Vercel project linked, first production deploy executed via `bunx vercel deploy`, SPA rewrite confirmed working (`/3` returns HTTP 200 with app shell) — production URL: https://syai-claude-workshop.vercel.app

## Tasks Completed

| Task | Description | Commit |
|------|-------------|--------|
| 1 | Write vercel.json with Bun build pins + SPA rewrite | f03159d |
| 2 | vercel link + first preview/production deploy | f127725 |
| 3 | Verify SPA deep-link (/3 → HTTP 200) + finalize README Deploy section | 1587415 |

**Task 4 (checkpoint:human-verify) — APPROVED by user 2026-05-09**

## Deployment Details

| Item | Value |
|------|-------|
| Preview URL | https://syai-claude-workshop-1dy20oqcv-kaleb-nims-projects.vercel.app |
| Production URL | https://syai-claude-workshop.vercel.app |
| DEPL-04 status line | `HTTP/2 200` (production, `/3`) |
| Build time | ~8s on Vercel (Washington D.C. iad1) |
| Vercel project | kaleb-nims-projects/syai-claude-workshop |

## Human Verification (Task 4) — APPROVED 2026-05-09

User confirmed all four verification steps passed:

1. **Deep-link smoke test (DEPL-04):** Incognito hard-refresh of https://syai-claude-workshop.vercel.app/3 rendered slide 3 correctly — no 404, no blank page.
2. **Home + slide 2 smoke test:** Home slide loaded; slide 2 (TypeScript code block with Shiki syntax highlighting) verified visible.
3. **GitHub auto-deploy (DEPL-01):** GitHub repo connected to Vercel (manual dashboard step completed) — auto-deploy confirmed active.
4. **README sanity check (DEPL-05):** README production URL matches the live URL.

All five DEPL requirements (DEPL-01..DEPL-05) satisfied. Phase 1 complete.

## Automated Verification Results

- `vercel.json` validates against spec: `framework: null`, `installCommand: "bun install"`, `buildCommand: "bunx slidev build"`, `outputDirectory: "dist"`, `rewrites[0].source: "/(.*)"`, `rewrites[0].destination: "/index.html"`
- `.vercel/project.json` exists locally and is gitignored
- `curl -sI https://syai-claude-workshop.vercel.app/3` → `HTTP/2 200`
- `curl -s https://syai-claude-workshop.vercel.app/3 | grep '<div id="app"'` → found (SPA shell present)
- Preview URL returns HTTP 401 (Vercel deployment protection on previews — expected)

## Deviations from Plan

### Auto-adapted (non-breaking)

**1. [Rule 1 - Adaptation] DEPL-04 verification used production URL instead of preview URL**
- **Found during:** Task 3
- **Issue:** Plan spec says to verify `$PREVIEW_URL/3`. However, Vercel enables "Deployment Protection" on preview deployments by default, which requires authentication (returns HTTP 401 to curl). The production URL is publicly accessible.
- **Fix:** Verified `$PROD_URL/3` instead — same SPA rewrite, same Vite build, same `index.html`. HTTP 200 + app shell confirmed on production.
- **Files modified:** `/tmp/depl-04-headers.txt` contains production URL result
- **Impact:** Verification is equivalent and more meaningful (tests the public URL users will actually use).

**2. [Adaptation] vercel git connect failed — no GitHub remote configured**
- **Found during:** Task 2
- **Issue:** The repo's git config has no `origin` remote (local-only repo). `bunx vercel git connect --yes` exited with "No remote URLs found."
- **Fix:** Per plan fallback (D-03): logged to `/tmp/vercel-git-connect.log`, documented manual connect step in README (Vercel dashboard → Settings → Git → Connect Git Repository).
- **Impact:** DEPL-01 (GitHub auto-deploy) will be satisfied after user completes Task 4 manual step.

**3. [Adaptation] .gitignore updated by Vercel CLI on link**
- **Found during:** Task 2
- **Issue:** `bunx vercel link --yes` added `.vercel` (without trailing slash) to `.gitignore`. The entry `.vercel/` already existed — this is a harmless duplicate.
- **Fix:** Committed the `.gitignore` modification as part of Task 2 commit.
- **Impact:** None — `.vercel/project.json` remains properly gitignored.

## Known Stubs

None — `vercel.json` is fully functional; README Deploy section contains the real production URL and real deploy commands.

## Threat Flags

No new security surface beyond the plan's threat model. T-01-04 confirmed mitigated (`.vercel/project.json` gitignored). T-01-06 confirmed mitigated (`vercel.json` committed and reviewed; SPA rewrite is the only routing rule).

## Self-Check: PASSED

Files confirmed present:
- vercel.json: EXISTS
- README.md: MODIFIED (Deploy section finalized)

Commits confirmed:
- f03159d: chore(01-02): add vercel.json
- f127725: chore(01-02): vercel link + first preview deploy
- 1587415: docs(01-02): finalize README Deploy section
