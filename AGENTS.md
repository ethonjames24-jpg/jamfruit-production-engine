# AGENTS.md — JamFruit Repository Operating Rules

This file governs AI coding agents, code reviewers and automated engineering assistants working in `ethonjames24-jpg/jamfruit-production-engine`.

## 1. Authority

**Google Drive is the project source of truth for approvals, freezes, gates and evidence. GitHub is implementation/history.**

Do not override a Drive decision because repository code, an upstream README, a model assumption or an earlier chat suggests something different.

Before a material JamFruit change:
1. identify the controlling Drive record;
2. verify current repository state;
3. state the exact bounded change;
4. preserve frozen/approved scope;
5. implement on a branch;
6. run the relevant tests;
7. open a reviewable PR;
8. document the outcome back in Drive.

If evidence is missing, say so and stop. Do not reconstruct or invent an approved state.

## 2. Frozen project boundaries

A00 pilot scope is fixed unless a later approved decision changes it.

Characters:
- Julie Mango
- East Indian Mango
- Ackee
- Guinep
- Soursop

Locations:
- Fruit Tree District Main Street
- Coronation Fruit Market
- Mango Mansion

Pilot:
- three manually supervised episodes;
- human approvals required;
- automatic public publishing prohibited.

Do not add pilot characters/locations, redesign approved canon, or loosen publication controls without explicit authorization.

## 3. EP01 controls

Pilot Episode 1:
- title: **Who Never Hail Julie?**
- 9:16
- Coronation Fruit Market
- frozen 9-scene storyboard
- 43-second contract
- Gate D approved 9/9

Do not rewrite the script/storyboard or regenerate replacement canon because a provider or implementation is inconvenient.

## 4. Repository truth versus project truth

Current GitHub reality:
- `master` is still largely the generic upstream `darkzOGx/youtube-automation-agent` v2.4.1 codebase.
- JamFruit Safe Mode exists in draft PR #1, branch `a01/jamfruit-safe-mode-foundation`.
- PR #1 is unmerged.
- The accepted EP01 n8n baseline is an external orchestration implementation and is not represented by the generic upstream agents on `master`.

Never claim an unmerged branch is deployed or active.

Never infer that upstream features such as autonomous scheduling, direct publishing, credential setup, generic provider fallbacks or local SQLite persistence are approved JamFruit behavior.

## 5. Safe-by-default rule

All new JamFruit engineering work must preserve fail-closed behavior.

Unless a specific approval says otherwise:
- generation execution = disabled
- provider execution = disabled
- video generation = disabled
- publication = disabled
- scheduling = disabled
- auto-approval = disabled
- production database/object-storage writes = disabled
- YouTube upload = disabled

A technical test may prove a path exists without authorizing the side effect.

## 6. Secrets and credentials

Never:
- commit API keys, OAuth tokens, cookies or service-account secrets;
- copy production secrets into Drive documentation;
- log secrets in test fixtures;
- add provider credentials merely to make a test pass.

Use placeholders and fail-closed configuration. Production credential integration always requires separate authorization.

## 7. Provider architecture

Approved route:
- ElevenLabs direct for voice
- Runway direct for video
- provider-neutral n8n contracts for orchestration

Keep these dimensions separable:
- provider
- model
- voice ID
- character assignment
- generation settings
- pronunciation controls
- execution permission

Do not hard-code a single provider/model into core workflow contracts unless the governing milestone explicitly authorizes the lock.

### ElevenLabs note

Flash v2.5 benchmark evidence remains historical/valid for that model.

Eleven v4 is now available and supports expressive audio tags. The project is reassessing the voice shortlist under `A01-AI-01.01B`. Do not silently migrate production code or character mappings to v4. Exact voice IDs are mandatory because display names are not unique/stable enough for control.

## 8. Accepted n8n EP01 baseline

Treat these IDs as the accepted EP01 baseline unless Drive records supersede them:
- WF-00 `NyxzCaawpy3FLO6L`
- WF-01 `PnXaM2wqepQTz5e4`
- WF-02 `W7JdvkUxsA2M3etK`
- WF-03 `aTuz8VbWSLdeWWyu`
- WF-04 `MhhV6GZCchz2BQE6`
- WF-05 `ivj89UqE8cJQxniL`

Rules:
- preserve legacy rollback/history artifacts;
- do not rename/rebind/activate workflows casually;
- do not infer missing workflow IDs;
- do not claim WF-04→WF-05 live-chain behavior beyond what evidence proves;
- do not generalize the EP01 9-scene/43-second contract into an all-episode template without a dedicated change.

## 9. Canon asset rules

Use exact approved references for production comparisons.

Never use a regenerated approximation as canon evidence.

Especially:
- Guinep must use the corrected fruit-integrated green canon direction; no residual orange/human-style face plane and no fixed gold-hoop signature.
- Julie and East Indian Mango must remain visually differentiated.
- generated signs/slogans in location boards are set dressing, not permanent canon copy.
- wardrobe/background contrast must remain readable.
- vertical 9:16-safe composition must be preserved.

See `DESIGN_SYSTEM.md` for the concise production rules.

## 10. Change discipline

Prefer small, bounded PRs.

Every PR should state:
- governing milestone/control ID;
- what changes;
- what does not change;
- tests/evidence;
- side-effect status;
- whether deployment/activation/merge is authorized.

Do not combine unrelated cleanup with a controlled milestone.

Do not modify lockfiles unless dependency changes require it.

Preserve upstream MIT attribution/provenance.

## 11. Testing expectations

Before marking a code change ready:
- run existing tests relevant to the changed surface;
- run lint when JavaScript/Node code changes;
- preserve repository guard/security checks;
- add regression coverage for defects being fixed;
- test failure paths for human gates and execution locks;
- verify disabled controls are restored after negative tests.

Documentation-only changes should still be checked for:
- contradictions with Drive;
- stale IDs/statuses;
- accidental authorization language;
- broken internal links/filenames.

## 12. No false status claims

Do not say:
- “production ready” when only dry-run evidence exists;
- “deployed” when only code/Compose files exist;
- “approved” when only a model generated successfully;
- “canonical” when an asset is still a candidate;
- “integrated” when credentials/provider execution remain disabled;
- “final 100-point score” when repeatability is unscored.

Use the exact recorded state.

## 13. Documentation rule

Material engineering decisions must be documented in Drive. Repository Markdown is a working context layer and must point back to the canonical records.

When this file, `PRD.md`, `DESIGN_SYSTEM.md` or `ARCHITECTURE.md` becomes stale, update it in a controlled documentation PR. Do not silently let the repo context diverge from Drive.

## 14. Current next lane

After A01-DOC-01 review, return to:
**A01-AI-01.01B — Eleven v4 Jamaican Voice Discovery & Expressive Performance Check.**

Do not start public publishing, production deployment, or automated provider execution as part of that work.
