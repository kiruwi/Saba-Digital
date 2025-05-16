// src/utils/cmsLoader.js

// Function to fetch and parse all project markdown files
export async function getProjects() {
  try {
    // Use a more reliable path that will work in both dev and production
    const response = await fetch('/content-api/projects.json');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const projects = await response.json();
    
    // Process the projects to match your existing data structure
    return projects.map(project => ({
      id: project.slug || project.title.toLowerCase().replace(/\s+/g, '-'),
      title: project.title,
      shortDescription: project.description,
      fullDescription: project.body,
      image: project.image,
      tags: project.technologies || [],
      category: getProjectCategory(project),
      features: parseFeatures(project.body),
      tools: parseTools(project.body),
      year: parseYear(project.body),
      link: project.link || '',
      github: project.github || '',
    }));
  } catch (error) {
    console.error("Error loading CMS projects:", error);
    // Return empty array instead of falling back to hardcoded data
    return [];
  }
}

// Helper function to determine project category based on tags or filename
function getProjectCategory(project) {
  const title = project.title.toLowerCase();
  const technologies = (project.technologies || []).map(tech => tech.toLowerCase());
  
  if (
    title.includes('ui') || 
    title.includes('ux') || 
    technologies.some(tech => tech.includes('design') || tech.includes('ui') || tech.includes('ux'))
  ) {
    return 'ux-ui';
  } else if (
    technologies.some(tech => 
      tech.includes('javascript') || 
      tech.includes('react') || 
      tech.includes('node') || 
      tech.includes('html') || 
      tech.includes('css')
    )
  ) {
    return 'web-dev';
  } else if (
    technologies.some(tech => 
      tech.includes('photoshop') || 
      tech.includes('illustrator') || 
      tech.includes('design') || 
      tech.includes('motion')
    )
  ) {
    return 'graphics';
  }
  
  // Default fallback
  return 'web-dev';
}

// Helper function to parse features from markdown content
function parseFeatures(content) {
  if (!content) return [];
  
  // Look for a section that starts with "## Features" and extract list items
  const featuresMatch = content.match(/## Features\s+([\s\S]*?)(?=##|$)/);
  
  if (featuresMatch && featuresMatch[1]) {
    // Extract bullet points
    const features = featuresMatch[1].match(/- (.*?)(?=\n|$)/g);
    if (features) {
      return features.map(feature => feature.replace('- ', '').trim());
    }
  }
  
  return [];
}

// Helper function to parse tools from markdown content
function parseTools(content) {
  if (!content) return [];
  
  // Look for a section that starts with "## Tools Used" and extract list items
  const toolsMatch = content.match(/## Tools Used\s+([\s\S]*?)(?=##|$)/);
  
  if (toolsMatch && toolsMatch[1]) {
    // Extract bullet points
    const tools = toolsMatch[1].match(/- (.*?)(?=\n|$)/g);
    if (tools) {
      return tools.map(tool => tool.replace('- ', '').trim());
    }
  }
  
  return [];
}

// Helper function to parse year from markdown content
function parseYear(content) {
  if (!content) return '';
  
  // Look for a "Year:" mention
  const yearMatch = content.match(/\*\*Year:\*\* (\d{4})/);
  
  if (yearMatch && yearMatch[1]) {
    return yearMatch[1];
  }
  
  return '';
}

// Function to get UX/UI projects only
export async function getUXProjects() {
  const allProjects = await getProjects();
  return allProjects.filter(project => project.category === 'ux-ui');
}

// Function to get Web Development projects only
export async function getWebProjects() {
  const allProjects = await getProjects();
  return allProjects.filter(project => project.category === 'web-dev');
}

// Function to get Graphics projects only
export async function getGraphicsProjects() {
  const allProjects = await getProjects();
  return allProjects.filter(project => project.category === 'graphics');
}
