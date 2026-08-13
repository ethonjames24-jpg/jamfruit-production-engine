# A01 Security Audit — JamFruit Safe Mode Foundation

## Baseline

- Repository: `ethonjames24-jpg/jamfruit-production-engine`
- Upstream: `darkzOGx/youtube-automation-agent`
- Pinned upstream commit: `030fd30e12150b4c793868acd04d4eeb5281e602`
- Upstream version: `2.4.1`
- License: MIT, preserved unchanged

## A01 objective

A01 creates a non-production Hostinger-ready foundation. The approved container starts a separate JamFruit Safe Server and does not initialize the upstream production engine.

The A01 runtime policy is:

```text
JAMFRUIT_SAFE_MODE=true
ENABLE_INTERNAL_SCHEDULER=false
ENABLE_YOUTUBE_PUBLISHING=false
ENABLE_AI_GENERATION=false
ENABLE_DATABASE_WRITES=false
```

Safe Mode rejects a configuration that enables any of those production capabilities while Safe Mode is active.

## Approved API surface

The A01 Safe Server exposes only:

- `GET /health`
- `GET /ready`

No generation, scheduling, database, analytics, dashboard, or publishing routes are registered by the Safe Server.

## Upstream isolation findings

The upstream application normally initializes persistence, provider configuration, agents, and scheduling as part of its full runtime. A01 does not modify those subsystems yet. Instead, it quarantines them behind a separate Safe Server entrypoint for the Hostinger container. The existing upstream runtime remains source material for controlled A02 conversion.

## Container baseline

The A01 Dockerfile uses Node 20 slim, runs as the non-root `node` user, embeds Safe Mode defaults, provides a health check, and starts `safe-server.js`. No provider secrets are included in the image definition.

The final Hostinger runtime hardening definition—loopback-only exposure, read-only filesystem, reduced Linux privileges, bounded resources, and ephemeral writable paths—remains a later deployment-step artifact. No Hostinger deployment is authorized by A01-04.

## Validation gates

Committed CI runs:

1. `npm ci`
2. `npm run lint`
3. upstream regression tests
4. JamFruit Safe Mode regression tests
5. repository guard checks

Dependency audit and Docker image build remain required manual A01 gates because the connector rejected those additional workflow commands.

## Deferred

A01 does not connect Supabase, Cloudflare R2, n8n service credentials, Kling, ElevenLabs, or YouTube. It does not enable production data writes or public publishing. Those changes require later approved milestones.

## Exit condition

A01-04 remains unmerged and undeployed until CI and manual gates pass and the draft pull request is reviewed.
