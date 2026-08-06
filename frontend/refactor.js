const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.css')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk(path.join(__dirname, 'src'));
files.push(path.join(__dirname, 'tailwind.config.ts'));

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Replace hardcoded background
  content = content.replace(/bg-\[#fdfaf6\]/g, 'bg-background');
  
  // Replace white card backgrounds
  content = content.replace(/bg-white/g, 'bg-card');
  
  // Replace stone text
  content = content.replace(/text-stone-800/g, 'text-foreground');
  content = content.replace(/text-stone-700/g, 'text-foreground');
  content = content.replace(/text-stone-600/g, 'text-muted-foreground');
  content = content.replace(/text-stone-500/g, 'text-muted-foreground');
  content = content.replace(/text-stone-400/g, 'text-muted-foreground');
  
  // Replace borders
  content = content.replace(/border-stone-200/g, 'border-border');
  content = content.replace(/border-stone-300/g, 'border-border');
  
  // Replace red with primary
  content = content.replace(/bg-red-/g, 'bg-primary-');
  content = content.replace(/text-red-/g, 'text-primary-');
  content = content.replace(/border-red-/g, 'border-primary-');
  content = content.replace(/shadow-red-/g, 'shadow-primary-');
  content = content.replace(/ring-red-/g, 'ring-primary-');

  // Fix specific Tailwind colors in JS (like in Button variants)
  // Actually, standard regex captures those well.

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated', file);
  }
}
