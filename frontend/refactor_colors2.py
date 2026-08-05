import os

directory = r"d:\Programing Lanuages\Projects\activity-assistant\frontend\src"

replacements = [
    (r'text-slate-950', r'text-white'),
    (r'text-slate-900', r'text-stone-800'),
    (r'from-slate-900', r'from-white'),
    (r'via-slate-900', r'via-white'),
    (r'to-slate-900', r'to-white'),
    (r'from-slate-950', r'from-[#fdfaf6]'),
    (r'via-slate-950', r'via-[#fdfaf6]'),
    (r'to-slate-950', r'to-[#fdfaf6]'),
    (r'bg-gradient-to-br from-slate-900 via-slate-900 to-red-50/30', r'bg-white'),
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
                
            if content != new_content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                    
print("Done final replacements.")
