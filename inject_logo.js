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

  // Replace img tag with Logo component
  content = content.replace(/<img src="\/logo\.png" alt="Tirazy Logo" className="([^"]*)" \/>/g, '<Logo className="$1" />');

  // Add import if we used <Logo>
  if (content.includes('<Logo ') && !content.includes('import Logo from')) {
    // Add import after the first import React from 'react'; or at the top
    if (content.includes("import React")) {
      content = content.replace(/import React[^;]*;\n?/, match => `${match}import Logo from '@/components/Logo';\n`);
    } else if (content.includes("import Link")) {
      content = content.replace(/import Link[^;]*;\n?/, match => `${match}import Logo from '@/components/Logo';\n`);
    } else {
      content = `import Logo from '@/components/Logo';\n` + content;
    }
  }

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated Logo component in ${filePath}`);
  }
}

ROUTES.forEach(route => {
  const fullPath = path.join(__dirname, route);
  if (fs.existsSync(fullPath)) {
    processFile(fullPath);
  }
});
