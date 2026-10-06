# JamFruit Stories — Product Requirements Document

**Control ID:** A01-DOC-01 / PRD.md  
**Status:** CONTROLLED REPOSITORY CONTEXT — review required before merge  
**Canonical authority:** Google Drive JamFruit control records. This file is a repository working summary, not the ultimate governance record.

## 1. Product definition

JamFruit Stories is an original Jamaican animated entertainment franchise and AI-assisted production system built around recurring anthropomorphic Jamaican fruit characters living in the fictional Jamaican-inspired **Fruit Tree District** universe.

The product goal is not a generic automated social-video channel. The pilot must prove that a controlled production system can repeatedly create recognizable characters, Jamaican cultural texture, consistent environments, authentic voice performances, coherent short-form stories, and auditable human approval gates.

## 2. Source-of-truth hierarchy

When sources disagree, use this order:

1. **Google Drive decision/approval records** — authoritative approvals, freezes, holds, supersessions, evidence and gates.
2. **Google Drive master/engineering/design records** — controlled requirements and implementation history.
3. **Accepted n8n workflow records/exports** — orchestration implementation evidence.
4. **This repository** — code implementation/history.
5. **This PRD and the companion repository context files** — concise working context only.

Never reconstruct an approved fact from memory when the controlling Drive record is available.

Primary controlling records:
- `JFS-GOV-001` — Decision & Approval Register — Drive ID `1zKrcjx4C5vcwWBrxp6fdIttCPZD-3VUD8Vnht1p2qec`
- `JFS-MSTR-001` — Detailed Master Plan v2.1 — Drive ID `1TMKyhExlT3zPJ5Db3u-kSZQyz5S_x_h8099UyvG6MDc`
- `JFS-A01-001` — Production Engine Foundation Engineering Record — Drive ID `1nEq15xP9pd-lHekkCGVTWxvg_oK2NLSPeYJSqyU3wyY`
- `JFS-AI-001` — Voice & Video Provider Evaluation — Drive ID `1P6ElBm8vR7o27H1f1MWl_VLRlfbzS_lMboJSM3MD4sc`
- `JFS-AI-001.01` — ElevenLabs Jamaican Voice Shortlist & Patwa Listening Test — Drive ID `1mPqtfn9KPagczPi9ztZjt84TyU7DsRw0mUalaUe8UF4`
- `JFS-DSGN-001` — Pilot Character Board Development — Drive ID `1quCazR-iQ3lyq3kdPJTRCeaGpF8dJbJMMIh76IVwJYo`
- `JFS-DSGN-002` — Pilot Location Visual Development — Drive ID `1E0O5g0NiF0_gedihYwKfNIHsubxu-80BqmJfCxGd-BQ`
- `JFS-PILOT-EP01.03` — Gate D Final Nine-Frame Package Review — Drive ID `1jUoEf94pVOp5w5J2bNMonCKv_r3RE79VvydaNyzkwQo`

## 3. Frozen A00 pilot scope

### Pilot characters
Only these five principal pilot characters are in scope unless a later approved decision changes the boundary:
1. Julie Mango — female
2. East Indian Mango — female
3. Ackee — male
4. Guinep — female
5. Soursop — male

All five have reached FINAL CANON status in the design program. Canon gender presentation is **3 female / 2 male**: Julie female, East Indian female, Guinep female; Ackee male, Soursop male. Do not redesign or replace them from text prompts when exact canon references are required.

### Pilot locations
The three approved pilot locations are:
1. Fruit Tree District Main Street
2. Coronation Fruit Market
3. Mango Mansion

All three are locked as FINAL CANON locations.

### Pilot production
- Three manually supervised pilot episodes.
- Human approval remains mandatory.
- Automatic public publishing is prohibited.
- Expansion beyond pilot scope must not delay validation unless separately approved.

## 4. Content format and creative requirements

Primary pilot format is short-form vertical video:
- aspect ratio: **9:16**
- target presentation: mobile-first vertical storytelling
- character and location continuity are mandatory
- principal characters must remain clearly adult-coded
- designs must remain original and must not imitate protected franchise characters or house styles

The system must prioritize:
- recognizable recurring silhouettes and palettes;
- stable fruit anatomy and character proportions;
- readable facial acting;
- Jamaican-inspired environmental specificity without pretending Fruit Tree District is a literal real-world map;
- dialogue and performance that can carry gossip, comedy, conflict, suspicion, hurt, warmth and quiet scenes without caricature;
- exact-reference continuity across image-to-video generation.

## 5. Pilot Episode 1 controlling state

**Episode:** “Who Never Hail Julie?”  
**Format:** 9:16 vertical  
**Location:** Coronation Fruit Market FINAL CANON  
**Runtime contract:** 43 seconds  
**Storyboard:** frozen, 9 scenes  
**Gate D:** APPROVED — S01–S09, 9/9 creative/technical pass

The approved Gate D package must not be reopened merely to accommodate provider limitations. Provider/model tests must adapt to the approved canon and storyboard, not the reverse.

## 6. Production workflow requirements

The controlled pilot production path is:

```
approved concept/script
  -> approved storyboard
  -> creative package
  -> media-job contract
  -> Gate D keyframe package
  -> video-job contract
  -> provider execution (separately authorized)
  -> voice/audio assembly
  -> Gate E final human review
  -> manual publication decision
```

n8n is the orchestration authority for the pilot workflow contracts. Provider and model choices must remain separable from orchestration contracts.

Accepted EP01 n8n baseline:
- WF-00 `NyxzCaawpy3FLO6L` — Pilot Production Orchestrator
- WF-01 `PnXaM2wqepQTz5e4` — Pilot Episode Control Plane
- WF-02 `W7JdvkUxsA2M3etK` — Creative Package Builder
- WF-03 `aTuz8VbWSLdeWWyu` — Media Job Contract Builder
- WF-04 `MhhV6GZCchz2BQE6` — Keyframe Job & Gate D Review
- WF-05 `ivj89UqE8cJQxniL` — Video Job Contract Builder

The accepted baseline is **EP01-specific**. Do not describe it as a generic all-episode production template until a separate generalization milestone proves that claim.

## 7. Provider route

Approved pilot routing:
- **Voice:** ElevenLabs direct
- **Video:** Runway direct
- **Orchestration:** provider-neutral n8n contracts

This routing decision does **not** approve:
- a permanent voice;
- a character-to-voice assignment;
- one fixed ElevenLabs model;
- one fixed Runway video model;
- provider credentials in production;
- automated provider execution;
- public release.

### ElevenLabs current checkpoint

Earlier voice baselines were generated with Eleven Flash v2.5. Those scores remain valid evidence for that model.

On 2026-10-06 the connected ElevenLabs workspace verified that **Eleven v4** is available and supports expressive audio/performance tags including laughter, giggling, sighs, whispers, emotional delivery and dialogue timing controls. This materially changes the evaluation surface.

Current control state:
- do not discard the Flash v2.5 evidence;
- do not treat Flash results as proof of v4 performance;
- do not spend the planned finalist-consistency credits on Flash v2.5 until the v4 discovery screen is resolved;
- no v4 voice/model is approved yet;
- newly surfaced Jamaican-oriented library voices require native Jamaican review and exact voice-ID tracking.

## 8. Human gates and fail-closed requirements

The pilot is intentionally human-gated.

At minimum:
- character/location canon changes require explicit approval;
- script/storyboard changes require explicit approval;
- Gate D keyframes require human approval;
- provider/model locks require scored review;
- Gate E final output requires human approval;
- public publishing requires a human decision.

A missing or stale approval must fail closed. Do not infer approval from the existence of an asset, a successful generation, a passing technical test, or a previous episode.

## 9. Safety and execution boundaries

Until separately authorized:
- no automatic public publishing;
- no YouTube upload;
- no public scheduling;
- no autonomous provider execution;
- no production credentials committed to GitHub or Drive;
- no Supabase or object-storage production writes;
- no deployment that exposes upstream autonomous generation/publishing behavior;
- no silent activation of internal schedulers;
- no replacement of exact canon assets with regenerated approximations.

Any change to these boundaries requires a new approved decision.

## 10. Infrastructure direction

Target operating model:
- Hostinger VPS/cloud-hosted runtime;
- Dockerized production engine;
- n8n for orchestration;
- planned structured metadata/canonical asset layers may use Supabase and Cloudflare R2, but those production integrations are not authorized merely because they appear in the architecture plan;
- exact provider adapters are added only after provider evaluation/approval.

## 11. Current repository state

The repository was forked from `darkzOGx/youtube-automation-agent`, pinned at upstream commit `030fd30e12150b4c793868acd04d4eeb5281e602`, upstream version 2.4.1.

Important distinction:
- `master` still largely reflects the generic upstream automation engine.
- JamFruit Safe Mode changes are in draft PR #1 on `a01/jamfruit-safe-mode-foundation`.
- That PR is open, draft and unmerged.
- n8n accepted EP01 orchestration exists outside this repository and must not be inferred from generic upstream code.

## 12. Pilot success criteria

The pilot should demonstrate:
- stable character identity across scenes;
- stable location identity;
- credible Jamaican/Patwa voice path;
- repeatable provider output under controlled settings;
- successful 9:16 rendering;
- recoverable and auditable workflow execution;
- human gates that fail closed;
- measurable retries and cost per approved scene;
- no unauthorized public side effects.

Pilot closeout is a **GO / CORRECT / HOLD** decision, not an automatic production launch.

## 13. Explicit non-goals for the current milestone

Do not:
- redesign the five characters;
- redesign the three pilot locations;
- rewrite the frozen EP01 script/storyboard;
- generalize the EP01-specific n8n baseline without a dedicated milestone;
- activate upstream autonomous scheduling/publishing;
- add production secrets;
- merge or deploy merely because documentation exists;
- treat a provider marketing label as proof of Jamaican authenticity.

## 14. Immediate controlled next work

1. Merge this AI context pack only after review.
2. Resume `A01-AI-01.01B` as a small Eleven v4 Jamaican voice discovery and expressive-Patwa screening.
3. Use native Jamaican review and exact voice IDs.
4. Select only qualifying finalists for consistency testing.
5. Continue to the Runway-direct video model benchmark only after the voice checkpoint is resolved under the governing plan.
