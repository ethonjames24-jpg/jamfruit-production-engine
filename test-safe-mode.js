const assert = require('assert');

function withSafeEnvironment() {
  process.env.NODE_ENV = 'production';
  process.env.JAMFRUIT_SAFE_MODE = 'true';
  process.env.ENABLE_INTERNAL_SCHEDULER = 'false';
  process.env.ENABLE_YOUTUBE_PUBLISHING = 'false';
  process.env.ENABLE_AI_GENERATION = 'false';
  process.env.ENABLE_DATABASE_WRITES = 'false';
  delete process.env.API_KEY;
}

async function run() {
  const saved = {};
  const keys = [
    'NODE_ENV', 'JAMFRUIT_SAFE_MODE', 'ENABLE_INTERNAL_SCHEDULER',
    'ENABLE_YOUTUBE_PUBLISHING', 'ENABLE_AI_GENERATION',
    'ENABLE_DATABASE_WRITES', 'API_KEY',
  ];
  for (const key of keys) saved[key] = process.env[key];

  try {
    withSafeEnvironment();

    const { JamFruitSafeServer } = require('./safe-server');
    const server = new JamFruitSafeServer();
    assert.strictEqual(server.initialize(), true);
    assert.strictEqual(server.runtime.safeMode, true);

    const routes = server.app._router.stack
      .filter(layer => layer.route)
      .map(layer => layer.route.path)
      .sort();
    assert.deepStrictEqual(routes, ['/health', '/ready'], 'Safe Server must expose only health/readiness routes');

    const health = server.getHealthPayload();
    assert.strictEqual(health.safeMode, true);
    assert.strictEqual(health.schedulerEnabled, false);
    assert.strictEqual(health.publishingEnabled, false);
    assert.strictEqual(health.aiGenerationEnabled, false);
    assert.strictEqual(health.databaseWritesEnabled, false);

    const ready = server.getReadinessPayload();
    assert.strictEqual(ready.status, 'ready');
    assert.strictEqual(ready.safeBaseline, true);

    const { buildRuntimePolicy } = require('./config/runtime-policy');
    assert.throws(() => buildRuntimePolicy({
      NODE_ENV: 'production',
      JAMFRUIT_SAFE_MODE: 'true',
      ENABLE_AI_GENERATION: 'true',
    }), /Unsafe JamFruit runtime configuration/);

    assert.throws(() => {
      process.env.JAMFRUIT_SAFE_MODE = 'false';
      process.env.API_KEY = 'test-value';
      return new JamFruitSafeServer();
    }, /refuses to start/);

    console.log('JamFruit Safe Mode regression tests passed');
  } finally {
    for (const key of keys) {
      if (saved[key] === undefined) delete process.env[key];
      else process.env[key] = saved[key];
    }
  }
}

run().catch(error => {
  console.error(error);
  process.exit(1);
});
