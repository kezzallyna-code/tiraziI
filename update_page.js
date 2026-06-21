const fs = require('fs');
let content = fs.readFileSync('tmp_splash.tsx', 'utf8');

// Add import Link
content = "import Link from 'next/link';\n\nexport default function Page() {\n  return (\n    <>\n" + content + "\n    </>\n  );\n}\n";

// Replace the navbar links to match Picture 5
const oldNavRegex = /<div className="hidden md:flex items-center gap-8 font-label-md text-label-md">[\s\S]*?<\/div>/;
const newNav = `<div className="hidden md:flex items-center gap-8 font-label-md text-label-md">
<Link className="text-primary dark:text-inverse-primary border-b-2 border-primary dark:border-inverse-primary pb-1 font-bold" href="/">Home</Link>
<Link className="text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-inverse-primary transition-colors" href="/features">Features</Link>
<Link className="text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-inverse-primary transition-colors" href="/artisans">Artisans</Link>
<Link className="text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-inverse-primary transition-colors" href="/contact">Contact</Link>
</div>`;
content = content.replace(oldNavRegex, newNav);

// Replace the right side buttons to match Picture 5 (Login, Join the Atelier)
const oldAuthRegex = /<div className="flex items-center gap-4">[\s\S]*?<\/div>\n<\/div>\n<\/header>/;
const newAuth = `<div className="flex items-center gap-4">
<Link className="text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-inverse-primary font-label-md text-label-md transition-colors" href="/login">Login</Link>
<Link className="bg-primary text-on-primary px-6 py-2 rounded-full font-label-md text-label-md hover:bg-surface-tint transition-all active:scale-95 duration-200" href="/register">Join the Atelier</Link>
</div>
</div>
</header>`;
content = content.replace(oldAuthRegex, newAuth);

// Replace all other <a> tags with <Link>
content = content.replace(/<a ([^>]*)>([\s\S]*?)<\/a>/g, '<Link $1>$2</Link>');
content = content.replace(/class=/g, 'className=');

fs.writeFileSync('app/page.tsx', content);
