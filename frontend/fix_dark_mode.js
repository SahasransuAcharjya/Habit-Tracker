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

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Fix borders and accents missed by previous script
  content = content.replace(/border-t-red-400/g, 'border-t-primary-400');
  content = content.replace(/accent-red-500/g, 'accent-primary-500');
  
  // Fix hover backgrounds and borders that were hardcoded to stone
  content = content.replace(/hover:bg-stone-50/g, 'hover:bg-muted/50');
  content = content.replace(/hover:bg-stone-100/g, 'hover:bg-muted');
  content = content.replace(/hover:border-stone-200/g, 'hover:border-border');
  content = content.replace(/hover:border-stone-300/g, 'hover:border-border');
  
  content = content.replace(/bg-stone-50/g, 'bg-muted/50');
  content = content.replace(/bg-stone-100/g, 'bg-muted');
  content = content.replace(/border-stone-100/g, 'border-border');
  content = content.replace(/border-stone-200/g, 'border-border');
  content = content.replace(/border-stone-300/g, 'border-border');

  // Fix text colors missed
  content = content.replace(/text-stone-300/g, 'text-muted-foreground');
  content = content.replace(/text-stone-400/g, 'text-muted-foreground');
  content = content.replace(/text-stone-500/g, 'text-muted-foreground');
  content = content.replace(/text-stone-600/g, 'text-muted-foreground');
  
  // Fix specific gradient in TodayHero
  content = content.replace(/from-white via-white to-red-50\/30/g, 'from-card via-card to-primary-500/10');
  content = content.replace(/from-white/g, 'from-card');
  content = content.replace(/via-white/g, 'via-card');
  content = content.replace(/to-white/g, 'to-card');
  
  // Fix any remaining text-red
  content = content.replace(/text-red-400/g, 'text-primary-400');
  content = content.replace(/text-red-500/g, 'text-primary-500');
  content = content.replace(/text-red-600/g, 'text-primary-600');

  // Fix background opacities that missed (like bg-background/70)
  // Actually they are fine.

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated', file);
  }
}
