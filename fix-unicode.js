const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        if (isDirectory && f !== 'node_modules') {
            walkDir(dirPath, callback);
        } else if (!isDirectory) {
            callback(dirPath);
        }
    });
}

const targetDir = path.join(__dirname, 'src');

let totalFixed = 0;

walkDir(targetDir, (filePath) => {
    if (filePath.endsWith('.jsx') || filePath.endsWith('.js') || filePath.endsWith('.css') || filePath.endsWith('.json')) {
        let content;
        try {
            content = fs.readFileSync(filePath, 'utf8');
        } catch (e) {
            return;
        }
        
        let original = content;

        // Specific rules provided by user
        content = content.replace(/DFSAR Rev\.2 [\ufffd] OHRC-4K/g, 'DFSAR Rev.2 | OHRC-4K');
        content = content.replace(/89\.9[\ufffd]S/g, '89.9°S');
        content = content.replace(/89\.9[\ufffd]S [\ufffd] Lunar South Pole/g, '89.9°S | Lunar South Pole'); // from the footer search result

        // General rules
        content = content.replace(/â€¢/g, '-');
        content = content.replace(/â€“/g, '-');
        content = content.replace(/â€”/g, '-');
        content = content.replace(/â€œ/g, '"');
        content = content.replace(/â€/g, '"'); 
        content = content.replace(/Â°/g, '°');
        content = content.replace(/Â/g, '');
        content = content.replace(/â/g, "'"); 
        
        // Remove any remaining replacement characters
        content = content.replace(//g, '');
        content = content.replace(/\ufffd/g, '');

        if (original !== content) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Fixed Unicode corruption in: ${filePath}`);
            totalFixed++;
        }
    }
});

console.log(`\nUnicode fix complete! Modified ${totalFixed} files.`);
