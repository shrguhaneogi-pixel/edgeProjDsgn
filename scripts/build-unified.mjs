import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const rootDist = path.join(rootDir, 'dist');

const SUB_PROJECTS = [
  'barter-bridge',
  'diagnostic-liquidity',
  'horizon-scrape',
  'parametric-pulse',
  'sacrificial-pathways'
];

console.log('====================================================');
console.log('🚀 Edge Systems Unified Monorepo Static Build Pipeline');
console.log('====================================================\n');

// 1. Ensure node_modules exists across all sub-projects (auto-linking if donor exists, or installing)
const donorModules = path.join(rootDir, 'barter-bridge', 'node_modules');
for (const slug of SUB_PROJECTS) {
  const projectModules = path.join(rootDir, slug, 'node_modules');
  if (!fs.existsSync(projectModules)) {
    if (fs.existsSync(donorModules)) {
      console.log(`🔗 Linking node_modules for ${slug}...`);
      try {
        fs.symlinkSync(donorModules, projectModules, 'junction');
      } catch {
        try {
          fs.cpSync(donorModules, projectModules, { recursive: true });
        } catch (cpErr) {
          console.warn(`Warning: Could not link node_modules for ${slug}: ${cpErr.message}`);
        }
      }
    } else {
      console.log(`📦 Installing dependencies for ${slug}...`);
      try {
        execSync('npm install', {
          cwd: path.join(rootDir, slug),
          stdio: 'inherit',
          shell: true
        });
      } catch (installErr) {
        console.error(`❌ npm install failed for ${slug}: ${installErr.message}`);
        process.exit(1);
      }
    }
  }
}

// 2. Build each sub-project independently
for (const slug of SUB_PROJECTS) {
  const projectDir = path.join(rootDir, slug);
  console.log(`\n📦 Building sub-project [${slug}] in ${projectDir}...`);
  try {
    execSync('npm run build', {
      cwd: projectDir,
      stdio: 'inherit',
      shell: true
    });
    console.log(`✅ [${slug}] build succeeded.`);
  } catch (err) {
    console.error(`❌ [${slug}] build failed!`, err.message);
    process.exit(1);
  }
}

// 3. Clean and recreate root dist directory
console.log('\n🧹 Cleaning and preparing root dist/ directory...');
if (fs.existsSync(rootDist)) {
  fs.rmSync(rootDist, { recursive: true, force: true });
}
fs.mkdirSync(rootDist, { recursive: true });

// 4. Copy root index.html to dist/index.html
const rootIndexHtml = path.join(rootDir, 'index.html');
if (fs.existsSync(rootIndexHtml)) {
  console.log('📄 Copying root landing hub index.html -> dist/index.html...');
  fs.copyFileSync(rootIndexHtml, path.join(rootDist, 'index.html'));
} else {
  console.error('❌ Root index.html not found!');
  process.exit(1);
}

// 5. Copy each compiled sub-project dist into dist/<slug>
for (const slug of SUB_PROJECTS) {
  const projectDist = path.join(rootDir, slug, 'dist');
  const targetDist = path.join(rootDist, slug);

  if (!fs.existsSync(projectDist)) {
    console.error(`❌ Expected build output directory missing: ${projectDist}`);
    process.exit(1);
  }

  console.log(`📂 Merging ${slug}/dist -> dist/${slug}...`);
  fs.cpSync(projectDist, targetDist, { recursive: true });
}

// 6. Generate dist/_redirects for Cloudflare Pages / Netlify SPA routing
console.log('📝 Generating dist/_redirects for subpath SPA fallbacks...');
const redirectsContent = [
  '# Subpath SPA fallback rules for Edge Systems Unified Static Build',
  ...SUB_PROJECTS.map(slug => `/${slug}/* /${slug}/index.html 200`),
  '/* /index.html 200',
  ''
].join('\n');
fs.writeFileSync(path.join(rootDist, '_redirects'), redirectsContent, 'utf8');

// 7. Generate dist/vercel.json for static host rewrites
console.log('📝 Generating dist/vercel.json for static hosts...');
const staticVercelConfig = {
  cleanUrls: true,
  rewrites: [
    ...SUB_PROJECTS.map(slug => ({
      source: `/${slug}/(.*)`,
      destination: `/${slug}/index.html`
    })),
    {
      source: '/(.*)',
      destination: '/index.html'
    }
  ]
};
fs.writeFileSync(
  path.join(rootDist, 'vercel.json'),
  JSON.stringify(staticVercelConfig, null, 2),
  'utf8'
);

console.log('\n====================================================');
console.log('🎉 UNIFIED STATIC BUILD COMPLETED SUCCESSFULLY!');
console.log(`📁 Merged Artifact Location: ${rootDist}`);
console.log('====================================================\n');
