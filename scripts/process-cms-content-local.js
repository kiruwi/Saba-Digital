// scripts/process-cms-content-local.js
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Define paths
const contentDir = path.join(__dirname, '../src/content');
const outputDir = path.join(__dirname, '../public/content-api');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Function to process Markdown files in a directory
function processMarkdownCollection(collectionName) {
  const collectionPath = path.join(contentDir, collectionName);
  const outputPath = path.join(outputDir, `${collectionName}.json`);
  const items = [];

  if (fs.existsSync(collectionPath)) {
    const files = fs.readdirSync(collectionPath);
    files.forEach(file => {
      if (file.endsWith('.md')) {
        const filePath = path.join(collectionPath, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContent);
        items.push({ 
          id: file.replace('.md', ''), 
          slug: file.replace('.md', ''),
          ...data, 
          body: content 
        });
      }
    });
  }

  fs.writeFileSync(outputPath, JSON.stringify(items, null, 2));
  console.log(`Processed ${items.length} items for ${collectionName} -> ${outputPath}`);
}

// Function to copy JSON files (like about.json)
function copyJsonFile(fileName) {
  const filePath = path.join(contentDir, fileName);
  const outputPath = path.join(outputDir, fileName);
  if (fs.existsSync(filePath)) {
    fs.copyFileSync(filePath, outputPath);
    console.log(`Copied ${fileName} -> ${outputPath}`);
  }
}

// Process all collections
processMarkdownCollection('projects');
processMarkdownCollection('skills');

// Copy individual JSON files
copyJsonFile('about.json');

console.log('Local CMS content processing complete.');
