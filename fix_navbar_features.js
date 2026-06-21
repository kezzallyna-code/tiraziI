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

  // 1. Replace search button with a real search input
  const searchButtonRegex = /<button[^>]*>\s*<span[^>]*>search<\/span>\s*<\/button>/g;
  const searchInputHtml = `<div className="relative hidden sm:block w-48 md:w-64">
  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">search</span>
  <input type="text" placeholder="Search..." className="w-full pl-10 pr-4 py-2 bg-surface-container-low border-none rounded-full focus:ring-2 focus:ring-primary text-body-sm transition-all text-on-surface" />
</div>`;
  content = content.replace(searchButtonRegex, searchInputHtml);

  // 2. Wrap User Profile image in a link to /profile
  // Case A: Nested inside a div
  const profileDivRegex = /<div className="([^"]*w-10 h-10[^"]*)">\s*<img alt="User profile"([^>]+)>\s*<\/div>/g;
  content = content.replace(profileDivRegex, `<Link href="/profile" className="$1 block"><img alt="User profile"$2></Link>`);

  // Case B: Naked img tag (like in messages)
  const profileImgRegex = /<img alt="User profile" className="([^"]*)"([^>]+)>/g;
  content = content.replace(profileImgRegex, (match, className, rest) => {
    // If it's already inside a Link (from our Case A replacement, or just generally), leave it
    // Wait, the regex won't know if it's in a link. Let's do it safely.
    if (className.includes('w-full') && className.includes('h-full')) {
      // This is the inner image from Case A, already handled.
      return match;
    }
    // This is the naked img (w-8 h-8 rounded-full)
    return `<Link href="/profile" className="block ${className} overflow-hidden"><img alt="User profile" className="w-full h-full object-cover"${rest}></Link>`;
  });

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated navbar in ${filePath}`);
  }
}

ROUTES.forEach(route => {
  const fullPath = path.join(__dirname, route);
  if (fs.existsSync(fullPath)) {
    processFile(fullPath);
  }
});
