const fs = require('fs');
const path = require('path');

const dir = 'd:\\August Websites\\Auto Parts & Car Accessories Store';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const newContent = `<div class="mt-4">
                        <a href="#" class="social-icon" aria-label="Facebook"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a>
                        <a href="#" class="social-icon" aria-label="X (Twitter)"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"></path><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path></svg></a>
                        <a href="#" class="social-icon" aria-label="Instagram"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
                        <a href="#" class="social-icon" aria-label="YouTube"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg></a>
                    </div>`;

const regex = /<div class="mt-4">\s*<a href="#" class="social-icon"><i data-lucide="facebook" size="18"><\/i><\/a>\s*<a href="#" class="social-icon"><i data-lucide="twitter" size="18"><\/i><\/a>\s*<a href="#" class="social-icon"><i data-lucide="instagram" size="18"><\/i><\/a>\s*<a href="#" class="social-icon"><i data-lucide="youtube" size="18"><\/i><\/a>\s*<\/div>/g;

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    if (regex.test(content)) {
        content = content.replace(regex, newContent);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Updated', file);
    } else {
        console.log('Not found in', file);
    }
});
