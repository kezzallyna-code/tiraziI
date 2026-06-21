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

function stripNav() {
  ROUTES.forEach(route => {
    const fullPath = path.join(__dirname, route);
    if (!fs.existsSync(fullPath)) return;
    
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Remove everything between <nav ...> and </nav>
    content = content.replace(/<nav[\s\S]*?<\/nav>/gi, '');
    
    // Also remove empty <header> tags if any
    content = content.replace(/<header[^>]*>\s*<\/header>/gi, '');
    content = content.replace(/<header[\s\S]*?<\/header>/gi, '');

    // Let's also ensure that Navbar is imported and used in layout.tsx, not here.
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Stripped nav from ${route}`);
  });
}

stripNav();
