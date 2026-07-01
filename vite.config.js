import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// --- AUTOMATIC UNICODE CLEANER ---
try {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

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

  const targetDir = path.resolve(__dirname, 'src');
  
  walkDir(targetDir, (filePath) => {
      if (filePath.endsWith('.jsx') || filePath.endsWith('.js') || filePath.endsWith('.css') || filePath.endsWith('.json')) {
          let content;
          try { content = fs.readFileSync(filePath, 'utf8'); } catch (e) { return; }
          
          let original = content;

          // Replace degree symbol context first
          content = content.replace(/89\.9\ufffdS/g, '89.9°S');
          content = content.replace(/89\.9\ufffdN/g, '89.9°N');
          content = content.replace(/89\.9\ufffdE/g, '89.9°E');
          content = content.replace(/89\.9\ufffdW/g, '89.9°W');
          
          // The rest are used as separators
          content = content.replace(/ \ufffd /g, ' | ');
          content = content.replace(/\ufffd/g, '|');
          
          if (original !== content) {
              fs.writeFileSync(filePath, content, 'utf8');
              console.log(`[Vite Unicode Cleaner] Fixed: ${filePath}`);
          }
      }
  });
} catch(e) {
  console.error("Vite cleaner error:", e);
}
// ---------------------------------

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true
  }
})
