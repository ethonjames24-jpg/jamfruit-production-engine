require('dotenv').config();

const express = require('express');
const chalk = require('chalk');
const { Logger } = require('./utils/logger');
const { buildRuntimePolicy } = require('./config/runtime-policy');
const { version } = require('./package.json');

class JamFruitSafeServer {
  constructor() {
    this.logger = new Logger('JamFruitSafeServer');
    this.runtime = buildRuntimePolicy(process.env);
    if (!this.runtime.safeMode) {
      throw new Error('A01 Safe Server refuses to start with JAMFRUIT_SAFE_MODE=false');
    }
    this.app = express();
    this.isInitialized = false;
  }

  initialize() {
    this.app.disable('x-powered-by');
    this.app.use(express.json({ limit: '64kb' }));

    this.app.get('/health', (req, res) => {
      res.json(this.getHealthPayload());
    });

    this.app.get('/ready', (req, res) => {
      const payload = this.getReadinessPayload();
      res.status(payload.status === 'ready' ? 200 : 503).json(payload);
    });

    this.app.use((req, res) => {
      res.status(404).json({
        status: 'not_found',
        error: 'A01 Safe Mode exposes only GET /health and GET /ready',
      });
    });

    this.isInitialized = true;
    this.logger.success('JamFruit A01 Safe Server initialized; production subsystems remain quarantined.');
    return true;
  }

  getHealthPayload() {
    return {
      status: 'healthy',
      service: 'jamfruit-production-engine',
      version,
      environment: this.runtime.environment,
      initialized: this.isInitialized,
      safeMode: this.runtime.safeMode,
      schedulerEnabled: this.runtime.internalSchedulerEnabled,
      publishingEnabled: this.runtime.youtubePublishingEnabled,
      aiGenerationEnabled: this.runtime.aiGenerationEnabled,
      databaseWritesEnabled: this.runtime.databaseWritesEnabled,
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    };
  }

  getReadinessPayload() {
    const safeBaseline = this.runtime.safeMode &&
      !this.runtime.internalSchedulerEnabled &&
      !this.runtime.youtubePublishingEnabled &&
      !this.runtime.aiGenerationEnabled &&
      !this.runtime.databaseWritesEnabled;

    return {
      status: this.isInitialized && safeBaseline ? 'ready' : 'not_ready',
      service: 'jamfruit-production-engine',
      safeBaseline,
      timestamp: new Date().toISOString(),
    };
  }

  start() {
    this.initialize();
    const port = Number(process.env.PORT || 3456);
    return this.app.listen(port, '0.0.0.0', () => {
      console.log(chalk.green(`\n✅ JamFruit A01 Safe Server running on port ${port}`));
      console.log(chalk.yellow('🔒 Generation, database writes, scheduler, credentials, and YouTube publishing are disabled.'));
    });
  }
}

if (require.main === module) {
  try {
    new JamFruitSafeServer().start();
  } catch (error) {
    console.error(chalk.red(`Fatal Safe Mode configuration error: ${error.message}`));
    process.exit(1);
  }
}

module.exports = { JamFruitSafeServer };
