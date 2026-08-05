import os
import re

directory = r"d:\Programing Lanuages\Projects\activity-assistant\frontend\src"

replacements = [
    # Text colors
    (r'text-white', r'text-stone-800'),
    (r'text-slate-200', r'text-stone-700'),
    (r'text-slate-300', r'text-stone-600'),
    (r'text-slate-400', r'text-stone-500'),
    (r'text-slate-500', r'text-stone-400'),
    
    # Backgrounds
    (r'bg-slate-950', r'bg-[#fdfaf6]'),
    (r'bg-slate-900', r'bg-white'),
    (r'bg-slate-800', r'bg-stone-100'),
    (r'bg-slate-700', r'bg-stone-200'),
    
    # Borders
    (r'border-slate-800', r'border-stone-200'),
    (r'border-slate-700', r'border-stone-300'),
    
    # Primary Accent: Red
    (r'cyan-500', r'red-500'),
    (r'cyan-400', r'red-400'),
    (r'cyan-300', r'red-600'),
    (r'cyan-950', r'red-50'),
    
    # Secondary Accent: Light Blue (Sky)
    (r'emerald-500', r'sky-500'),
    (r'emerald-400', r'sky-400'),
    (r'emerald-300', r'sky-600'),
    (r'emerald-950', r'sky-50'),
    
    # Keep button text white if it was converted to text-stone-800 by mistake
    # We will do a regex to fix `bg-red-500 text-stone-800` to `bg-red-500 text-white`
]

button_fix_patterns = [
    (r'bg-red-500\s+(.*?)text-stone-800', r'bg-red-500 \1text-white'),
    (r'bg-red-500\s+text-stone-800', r'bg-red-500 text-white'),
    (r'bg-sky-500\s+text-stone-800', r'bg-sky-500 text-white'),
    (r'bg-amber-500\s+text-stone-800', r'bg-amber-500 text-white'),
    (r'text-stone-800\s+(.*?)bg-red-500', r'text-white \1bg-red-500'),
]

for root, _, files in os.walk(directory):
    for file in files:
        if file.endswith(('.tsx', '.ts')) and file != 'globals.css':
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            new_content = content
            for old, new in replacements:
                new_content = new_content.replace(old, new)
                
            for old, new in button_fix_patterns:
                new_content = re.sub(old, new, new_content)
                
            # Extra fix: bg-red-500 ... text-stone-800 (handle px-3 py-2 text-sm etc)
            new_content = re.sub(r'(bg-(?:red|sky|amber)-500\s+[^"\'`]*?)text-stone-800', r'\1text-white', new_content)
                
            if content != new_content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                    
print("Done replacing classes.")
