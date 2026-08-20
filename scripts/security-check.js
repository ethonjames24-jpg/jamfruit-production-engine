const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const excludedDirs = new Set(['.git', 'node_modules', 'data', 'logs', 'coverage']);
const prohibitedFiles = ['.env', 'config/credentials.json', 'config/tokens.json'];
const secretPatterns = [
  { name: 'OpenAI-style secret', re: /\bsk-[A-Za-z0-9_-]{20,}\b/g },
  { name: 'OpenRouter secret', re: /\bsk-or-v1-[A-Za-z0-9]{20,}\b/g },
  { name: 'Google API key', re: /\bAIza[0-9A-Za-z_-]{30,}\b/g },
  { name: 'GitHub token', re: /\bgh[pousr]_[A-Za-z0-9]{20,}\b/g },
  { name: 'Private key material', re: /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/g },
];

const findings = [];

for (const rel of prohibitedFiles) {
  if (fs.existsSync(path.join(root, rel))) findings.push(`Prohibited secret file is present: ${rel}`);
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory() && excludedDirs.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) { walk(full); continue; }
    if (!entry.isFile()) continue;
    if (fs.statSync(full).size > 2 * 1024 * 1024) continue;

    let text;
    try { text = fs.readFileSync(full, 'utf8'); } catch { continue; }
    for (const { name, re } of secretPatterns) {
      re.lastIndex = 0;
      const matches = text.match(re) || [];
      const suspicious = matches.filter(value => !/(your|test|example|placeholder)/i.test(value));
      if (suspicious.length > 0) findings.push(`${name} detected in ${path.relative(root, full)}`);
    }
  }
}

walk(root);

const dockerfile = fs.readFileSync(path.join(root, 'Dockerfile'), 'utf8');
if (!dockerfile.includes('CMD ["node", "safe-server.js"]')) {
  findings.push('Dockerfile must start safe-server.js in A01');
}
if (/CMD \["node", "index\.js"\]/.test(dockerfile)) {
  findings.push('Dockerfile must not start the upstream production index in A01');
}

const envExample = fs.readFileSync(path.join(root, '.env.example'), 'utf8');
for (const required of [
  'JAMFRUIT_SAFE_MODE=true',
  'ENABLE_INTERNAL_SCHEDULER=false',
  'ENABLE_YOUTUBE_PUBLISHING=false',
  'ENABLE_AI_GENERATION=false',
  'ENABLE_DATABASE_WRITES=false',
]) {
  if (!envExample.includes(required)) findings.push(`Missing Safe Mode default in .env.example: ${required}`);
}

if (findings.length > 0) {
  console.error('Security check failed:\n- ' + findings.join('\n- '));
  process.exit(1);
}

console.log('Security check passed: no committed secret files/signatures and the Docker Safe Mode entrypoint is enforced');
