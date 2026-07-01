const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

const targetDir = path.join(__dirname, 'src');
const issues = [];

walkDir(targetDir, (filePath) => {
    if (filePath.endsWith('.jsx') || filePath.endsWith('.js') || filePath.endsWith('.css')) {
        const content = fs.readFileSync(filePath, 'utf8');
        const lines = content.split('\n');
        lines.forEach((line, index) => {
            if (
                line.includes('TODO') || 
                line.includes('FIXME') || 
                line.includes('Lorem') || 
                line.includes('Placeholder') || 
                line.includes('console.warn') ||
                line.includes('') ||
                line.match(/[^\x00-\x7F]/) // Non-ASCII character
            ) {
                issues.push(`File: ${filePath}, Line: ${index + 1}, Content: ${line.trim()}`);
            }
        });
    }
});

fs.writeFileSync('issues.txt', issues.join('\n'));
console.log(`Found ${issues.length} issues`);
