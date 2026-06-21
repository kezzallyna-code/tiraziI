const fs = require('fs');
const path = require('path');

const ROUTES = [
  'app/profile/page.tsx',
  'app/network/page.tsx',
  'app/messages/page.tsx',
  'app/notifications/page.tsx',
  'app/showcase/page.tsx',
  'app/settings/page.tsx',
  'app/artisans/page.tsx'
];

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Regex to remove the Link containing the mail icon in the header.
  // It looks for <Link href="/messages"...> down to </Link> where it contains the "mail" icon span.
  const mailLinkRegex = /<Link href="\/messages"[^>]*>\s*<span[^>]*>mail<\/span>\s*<\/Link>/g;
  
  content = content.replace(mailLinkRegex, '');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Removed mail icon from header in ${filePath}`);
  }
}

ROUTES.forEach(route => {
  const fullPath = path.join(__dirname, route);
  if (fs.existsSync(fullPath)) {
    processFile(fullPath);
  }
});
