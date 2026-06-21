const fs = require('fs');
const path = require('path');

const ROUTES = [
  'app/page.tsx',
  'app/login/page.tsx',
  'app/register/page.tsx',
  'app/artisans/page.tsx',
  'app/profile/page.tsx',
  'app/network/page.tsx',
  'app/messages/page.tsx',
  'app/notifications/page.tsx',
  'app/showcase/page.tsx',
  'app/publish/page.tsx',
  'app/settings/page.tsx'
];

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Replace text logo with image logo wrapped in a Link to home
  const logoRegex = /<(h1|span|div)\s+className="[^"]*text-primary[^"]*"\s*>\s*TIRAZY\s*<\/\1>/gi;
  
  content = content.replace(logoRegex, '<Link href="/"><img src="/logo.png" alt="Tirazy Logo" className="h-12 w-auto object-contain" /></Link>');

  // Also replace any isolated TIRAZY header that might not have text-primary (e.g. in the footer or nav)
  const fallbackRegex = /<(h1|span|div)\s+className="[^"]*font-display-lg[^"]*"\s*>\s*TIRAZY\s*<\/\1>/gi;
  content = content.replace(fallbackRegex, '<Link href="/"><img src="/logo.png" alt="Tirazy Logo" className="h-12 w-auto object-contain" /></Link>');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated logo in ${filePath}`);
  }
}

ROUTES.forEach(route => {
  const fullPath = path.join(__dirname, route);
  if (fs.existsSync(fullPath)) {
    processFile(fullPath);
  }
});
