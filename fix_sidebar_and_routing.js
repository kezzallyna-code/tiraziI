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

  // 1. Fix top nav buttons for notifications and mail
  content = content.replace(
    /<button([^>]*)>\s*<span([^>]*)>notifications<\/span>\s*<\/button>/gi,
    '<Link href="/notifications" $1>\n<span$2>notifications</span>\n</Link>'
  );
  content = content.replace(
    /<button([^>]*)>\s*<span([^>]*)>mail<\/span>\s*<\/button>/gi,
    '<Link href="/messages" $1>\n<span$2>mail</span>\n</Link>'
  );

  // 2. Fix Markets link rotting
  content = content.replace(
    /<Link([^>]*)href="[^"]*"([^>]*)>Markets<\/Link>/gi,
    '<Link$1href="/showcase"$2>Markets</Link>'
  );
  content = content.replace(
    /<a([^>]*)href="[^"]*"([^>]*)>Markets<\/a>/gi,
    '<Link$1href="/showcase"$2>Markets</Link>'
  );

  // 3. Find the Sidebar <nav> and normalize its links/buttons
  // The sidebar nav usually has Dashboard, Portfolio, etc.
  // It might be <nav className="flex flex-col gap-1"> or similar inside an <aside>
  // Let's use a regex to find the block of HTML that contains 'dashboard' and 'palette' icons
  // Actually, let's just find the <aside> block that contains 'Dashboard'
  
  // To avoid messing up the chat list aside in messages, we look for the nav that specifically has Dashboard
  const navRegex = /<nav[^>]*>([\s\S]*?)<\/nav>/g;
  
  content = content.replace(navRegex, (match, navContent) => {
    if (navContent.includes('Dashboard') && navContent.includes('Portfolio')) {
      
      // Convert all <button> inside this nav to <Link>
      let newNavContent = navContent.replace(/<button([^>]*)>/gi, '<Link$1 href="#">');
      newNavContent = newNavContent.replace(/<\/button>/gi, '</Link>');

      // Fix routing for each item
      newNavContent = newNavContent.replace(/<Link([^>]*)href="[^"]*"([^>]*)>([\s\S]*?)<\/Link>/gi, (m, before, after, inner) => {
        let text = inner.toLowerCase();
        let href = '#';
        if (text.includes('dashboard')) href = '/showcase';
        else if (text.includes('portfolio')) href = '/profile'; // Wait, let's map portfolio to profile
        else if (text.includes('analytics')) href = '/showcase';
        else if (text.includes('connections')) href = '/network';
        else if (text.includes('settings')) href = '/settings';
        else if (text.includes('messages')) href = '/messages';
        else href = '#';

        // Keep the active styling if we are on the current page? 
        // The user just wants the routing fixed.
        return `<Link${before}href="${href}"${after}>${inner}</Link>`;
      });

      // Add Messages link if it doesn't exist
      if (!newNavContent.includes('>Messages<')) {
        // Find the class of the 'Connections' link to copy its styling
        // Example: <Link className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-variant/50 rounded-lg transition-all" href="/network">
        const linkClassMatch = newNavContent.match(/<Link className="([^"]*text-on-surface-variant[^"]*)"/);
        const linkClass = linkClassMatch ? linkClassMatch[1] : "flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-variant/50 rounded-lg transition-all";
        
        const messagesLink = `\n<Link className="${linkClass}" href="/messages">\n<span className="material-symbols-outlined">mail</span>\n<span className="font-label-md">Messages</span>\n</Link>\n`;
        
        // Insert it before settings or at the end
        newNavContent = newNavContent + messagesLink;
      }

      return match.replace(navContent, newNavContent);
    }
    return match;
  });

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

ROUTES.forEach(route => {
  const fullPath = path.join(__dirname, route);
  if (fs.existsSync(fullPath)) {
    processFile(fullPath);
  }
});
