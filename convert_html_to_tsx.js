const fs = require('fs');
const path = require('path');

function convertHtmlToTsx(html) {
    // Extract everything between <body> and </body>
    const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    let content = bodyMatch ? bodyMatch[1] : html;

    // Remove <script> tags
    content = content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

    // Replace class= with className=
    content = content.replace(/class="/g, 'className="');

    // Self-close tags: img, input, br, hr
    content = content.replace(/<(img|input|br|hr)([^>]*?)>/g, (match, tag, attrs) => {
        if (attrs.trim().endsWith('/')) {
            return match; // Already self-closing
        }
        return `<${tag}${attrs} />`;
    });

    // Replace inline styles (simplistic)
    content = content.replace(/style="([^"]*)"/g, (match, styleString) => {
        const styleObj = {};
        styleString.split(';').forEach(rule => {
            const [key, value] = rule.split(':');
            if (key && value) {
                const camelKey = key.trim().replace(/-([a-z])/g, (g) => g[1].toUpperCase());
                styleObj[camelKey] = value.trim().replace(/'/g, '"');
            }
        });
        return `style={${JSON.stringify(styleObj)}}`;
    });

    return content.trim();
}

const file = process.argv[2];
const html = fs.readFileSync(path.join(__dirname, 'stitch_screens', file), 'utf8');
const tsxContent = convertHtmlToTsx(html);

console.log(tsxContent);
