function parseBoolean(value, defaultValue = false) {
  if (value === undefined || value === null || value === '') return defaultValue;
  return String(value).trim().toLowerCase() === 'true';
}

function buildRuntimePolicy(env = process.env) {
  const policy = {
    environment: env.NODE_ENV || 'development',
    safeMode: parseBoolean(env.JAMFRUIT_SAFE_MODE, true),
    internalSchedulerEnabled: parseBoolean(env.ENABLE_INTERNAL_SCHEDULER, false),
    youtubePublishingEnabled: parseBoolean(env.ENABLE_YOUTUBE_PUBLISHING, false),
    aiGenerationEnabled: parseBoolean(env.ENABLE_AI_GENERATION, false),
    databaseWritesEnabled: parseBoolean(env.ENABLE_DATABASE_WRITES, false),
  };

  const errors = [];
  const unsafeFeatures = [
    ['ENABLE_INTERNAL_SCHEDULER', policy.internalSchedulerEnabled],
    ['ENABLE_YOUTUBE_PUBLISHING', policy.youtubePublishingEnabled],
    ['ENABLE_AI_GENERATION', policy.aiGenerationEnabled],
    ['ENABLE_DATABASE_WRITES', policy.databaseWritesEnabled],
  ].filter(([, enabled]) => enabled).map(([name]) => name);

  if (policy.safeMode && unsafeFeatures.length > 0) {
    errors.push(`JAMFRUIT_SAFE_MODE=true requires these controls to remain disabled: ${unsafeFeatures.join(', ')}`);
  }

  if (policy.environment === 'production' && !policy.safeMode && !env.API_KEY) {
    errors.push('API_KEY is required when JAMFRUIT_SAFE_MODE=false in production');
  }

  if (errors.length > 0) {
    throw new Error(`Unsafe JamFruit runtime configuration: ${errors.join('; ')}`);
  }

  return Object.freeze(policy);
}

module.exports = { buildRuntimePolicy, parseBoolean };
