const fs = require('fs');
const path = require('path');

const ROUTES = [
  'app/showcase/page.tsx',
  'app/settings/page.tsx',
  'app/profile/page.tsx',
  'app/notifications/page.tsx',
  'app/network/page.tsx',
  'app/messages/page.tsx'
];

const sidebarNav = `
<nav className="flex flex-col gap-1">
<Link className="flex items-center gap-3 px-4 py-3 text-primary font-bold bg-surface-container-high rounded-lg" href="/showcase">
<span className="material-symbols-outlined">dashboard</span>
<span className="font-label-md">Dashboard</span>
</Link>
<Link className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-variant/50 rounded-lg transition-all" href="/profile">
<span className="material-symbols-outlined">palette</span>
<span className="font-label-md">Portfolio</span>
</Link>
<Link className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-variant/50 rounded-lg transition-all" href="/showcase">
<span className="material-symbols-outlined">insights</span>
<span className="font-label-md">Analytics</span>
</Link>
<Link className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-variant/50 rounded-lg transition-all" href="/network">
<span className="material-symbols-outlined">group</span>
<span className="font-label-md">Connections</span>
</Link>
<Link className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-variant/50 rounded-lg transition-all" href="/settings">
<span className="material-symbols-outlined">settings</span>
<span className="font-label-md">Settings</span>
</Link>

<Link className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-variant/50 rounded-lg transition-all" href="/messages">
<span className="material-symbols-outlined">mail</span>
<span className="font-label-md">Messages</span>
</Link>
</nav>
`;

ROUTES.forEach(route => {
  const fullPath = path.join(__dirname, route);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Check if it has an <aside> but lacks the links. 
    // We can just insert it before <div className="mt-auto p-4"> inside <aside>
    if (content.includes('<aside') && content.includes('<div className="mt-auto p-4">') && !content.includes('href="/showcase"')) {
        content = content.replace('<div className="mt-auto p-4">', sidebarNav + '<div className="mt-auto p-4">');
        fs.writeFileSync(fullPath, content);
        console.log("Restored in " + route);
    }
  }
});
