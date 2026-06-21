const fs = require('fs');
const path = require('path');

const ROUTES = [
  'app/profile/page.tsx',
  'app/network/page.tsx',
  'app/messages/page.tsx',
  'app/notifications/page.tsx',
  'app/showcase/page.tsx',
  'app/settings/page.tsx'
];

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Add overflow-y-auto custom-scrollbar to fixed or sticky asides
  content = content.replace(/<aside([^>]*)className="([^"]*(?:fixed|sticky)[^"]*)"([^>]*)>/g, (match, before, classNames, after) => {
    if (!classNames.includes('overflow-y-auto')) {
      classNames = classNames + ' overflow-y-auto custom-scrollbar pb-6';
    }
    return `<aside${before}className="${classNames}"${after}>`;
  });

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed sidebar overflow in ${filePath}`);
  }
}

ROUTES.forEach(route => {
  const fullPath = path.join(__dirname, route);
  if (fs.existsSync(fullPath)) {
    processFile(fullPath);
  }
});
