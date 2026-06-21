const fs = require('fs');
const https = require('https');
const path = require('path');

const SCREENS = {
  'home': '04f534611bae4d0881a13803aecdb189',
  'login': '1cb3e67d3d954b5bac2ffd79cb0a7e63',
  'register': '2509ed7cabf64f27b9743f2ee725728c',
  'artisans': 'acab44b1e5c4498099f185f26ed4e812',
  'profile': '2cdced6cf52943c3a491d6b5032c4c17',
  'network': 'b0983e9e31184cb28e53598939480d80',
  'messages': '78d4a01fdf554309a013cdf686533539',
  'notifications': 'e882e29d29e0467db02ee1e85abaec8a',
  'showcase': 'a47b40738a8c41d5a4ed8a398518229b',
  'publish': '77d4dde3689943298920f30d85a4c96e',
  'settings': 'c03b9f75c6cd4cf496f8e582e2d07a04'
};

const ROUTES = {
  'home': 'app/page.tsx',
  'login': 'app/login/page.tsx',
  'register': 'app/register/page.tsx',
  'artisans': 'app/artisans/page.tsx',
  'profile': 'app/profile/page.tsx',
  'network': 'app/network/page.tsx',
  'messages': 'app/messages/page.tsx',
  'notifications': 'app/notifications/page.tsx',
  'showcase': 'app/showcase/page.tsx',
  'publish': 'app/publish/page.tsx',
  'settings': 'app/settings/page.tsx'
};

const screensDataPath = 'C:/Users/Power-info/.gemini/antigravity-ide/brain/4164793e-510b-4d03-9422-6014ee369f53/.system_generated/steps/154/output.txt';

async function fetchHtml(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', err => reject(err));
  });
}

function convertToJsx(html) {
  let jsx = html.replace(/class=/g, 'className=');
  jsx = jsx.replace(/for=/g, 'htmlFor=');
  jsx = jsx.replace(/<!--[\s\S]*?-->/g, ''); // Remove comments
  
  // Strip script tags
  jsx = jsx.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  
  // Strip style attributes to prevent React errors
  jsx = jsx.replace(/ style="[^"]*"/g, '');

  // Fix SVG attributes
  jsx = jsx.replace(/viewbox=/gi, 'viewBox=');
  jsx = jsx.replace(/stroke-width=/gi, 'strokeWidth=');
  jsx = jsx.replace(/stroke-linecap=/gi, 'strokeLinecap=');
  jsx = jsx.replace(/stroke-linejoin=/gi, 'strokeLinejoin=');
  jsx = jsx.replace(/fill-rule=/gi, 'fillRule=');
  jsx = jsx.replace(/clip-rule=/gi, 'clipRule=');
  jsx = jsx.replace(/preserveaspectratio=/gi, 'preserveAspectRatio=');

  // Strip inline event handlers like onclick="doSomething()"
  jsx = jsx.replace(/\son[a-z]+="[^"]*"/gi, '');

  // Fix React specific boolean attributes that are strings in raw HTML
  jsx = jsx.replace(/ checked=""/gi, ' defaultChecked');
  jsx = jsx.replace(/ selected=""/gi, ' defaultValue="true"');
  jsx = jsx.replace(/ disabled=""/gi, ' disabled');
  jsx = jsx.replace(/ required=""/gi, ' required');
  jsx = jsx.replace(/ readonly=""/gi, ' readOnly');

  // Fix numeric attributes
  jsx = jsx.replace(/ rows="(\d+)"/gi, ' rows={$1}');
  jsx = jsx.replace(/ cols="(\d+)"/gi, ' cols={$1}');
  jsx = jsx.replace(/ tabindex="(-?\d+)"/gi, ' tabIndex={$1}');
  jsx = jsx.replace(/ maxlength="(\d+)"/gi, ' maxLength={$1}');

  // Close standalone tags
  const voidElements = ['img', 'input', 'hr', 'br'];
  voidElements.forEach(tag => {
    const regex = new RegExp(`<${tag}\\b([^>]*?)(?<!/)>`, 'gi');
    jsx = jsx.replace(regex, `<${tag}$1 />`);
  });

  const bodyMatch = jsx.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (bodyMatch) {
    jsx = bodyMatch[1];
  }

  jsx = jsx.replace(/<head[^>]*>([\s\S]*?)<\/head>/gi, '');
  jsx = jsx.replace(/<html[^>]*>/gi, '');
  jsx = jsx.replace(/<\/html>/gi, '');

  return jsx.trim();
}

async function main() {
  const data = fs.readFileSync(screensDataPath, 'utf8');
  const screensList = JSON.parse(data).screens;

  for (const [key, id] of Object.entries(SCREENS)) {
    const screen = screensList.find(s => s.name.endsWith(id));
    if (!screen) {
      console.log(`Could not find screen for ${key} (id: ${id})`);
      continue;
    }

    const downloadUrl = screen.htmlCode.downloadUrl;
    console.log(`Fetching ${key}...`);
    try {
      const html = await fetchHtml(downloadUrl);
      const jsx = convertToJsx(html);
      
      const componentCode = `import React from 'react';\n\nexport default function ${key.charAt(0).toUpperCase() + key.slice(1)}Page() {\n  return (\n    <div className="stitch-screen-wrapper">\n      ${jsx}\n    </div>\n  );\n}\n`;
      
      const outPath = path.join(__dirname, ROUTES[key]);
      fs.mkdirSync(path.dirname(outPath), { recursive: true });
      fs.writeFileSync(outPath, componentCode, 'utf8');
      console.log(`Successfully wrote ${ROUTES[key]}`);
    } catch (e) {
      console.error(`Error processing ${key}: ${e}`);
    }
  }
}

main();
