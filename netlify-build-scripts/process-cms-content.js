// netlify-build-scripts/process-cms-content.js
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Create output directory if it doesn't exist
const outputDir = path.join(__dirname, '../public/src/content');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Function to process Markdown files and convert to JSON
function processMarkdownFiles(dirPath, outputFilename) {
  try {
    const files = fs.readdirSync(dirPath);
    const contentArray = [];

    // Loop through each file in the directory
    for (const file of files) {
      if (file.endsWith('.md')) {
        const filePath = path.join(dirPath, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContent);
        
        // Create content object with front matter and body
        const contentObj = {
          ...data,
          body: content,
          slug: file.replace('.md', '')
        };
        
        contentArray.push(contentObj);
      }
    }

    // Write processed content to JSON file
    fs.writeFileSync(
      path.join(outputDir, outputFilename), 
      JSON.stringify(contentArray, null, 2)
    );
    
    console.log(`Generated ${outputFilename} with ${contentArray.length} items`);
  } catch (error) {
    console.error(`Error processing markdown files: ${error}`);
  }
}

// Process projects
const projectsDir = path.join(__dirname, '../src/content/projects');
if (fs.existsSync(projectsDir)) {
  processMarkdownFiles(projectsDir, 'projects.json');
}

// Process skills
const skillsDir = path.join(__dirname, '../src/content/skills');
if (fs.existsSync(skillsDir)) {
  processMarkdownFiles(skillsDir, 'skills.json');
}

// Copy about.json as is
const aboutPath = path.join(__dirname, '../src/content/about.json');
if (fs.existsSync(aboutPath)) {
  fs.copyFileSync(
    aboutPath, 
    path.join(outputDir, 'about.json')
  );
  console.log('Copied about.json');
}

console.log('CMS content processing complete.');
