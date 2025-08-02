import React, { useState, useEffect } from 'react';

// Types for CMS project data
interface CMSProject {
  title: string;
  description: string;
  // Add other project properties as needed
  [key: string]: any;
}

interface DebugData {
  projectsData: CMSProject[] | null;
  projectsError: string | null;
  fetchAttempted: boolean;
  dataAvailable: boolean;
}

// Helper function to determine the correct base path
function getBasePath(): string {
  // Check if we're in a GitHub Pages environment
  const isGitHubPages = window.location.hostname.includes('github.io');
  // For GitHub Pages, we need to prefix with the repo name
  return isGitHubPages ? '/Saba-Digital' : '';
}

const CMSDebug: React.FC = () => {
  const [debugData, setDebugData] = useState<DebugData>({
    projectsData: null,
    projectsError: null,
    fetchAttempted: false,
    dataAvailable: false
  });

  useEffect(() => {
    const checkCMSData = async (): Promise<void> => {
      try {
        // Use dynamic base path for GitHub Pages compatibility
        const basePath = getBasePath();
        // Fetching CMS data
        const response = await fetch(`${basePath}/content-api/projects.json`);
        
        if (!response.ok) {
          throw new Error(`Status: ${response.status}`);
        }
        
        const data: CMSProject[] = await response.json();
        // CMS data successfully fetched
        
        setDebugData({
          projectsData: data,
          projectsError: null,
          fetchAttempted: true,
          dataAvailable: true
        });
      } catch (error) {
        // Log CMS errors only in development
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.error('Error fetching CMS data:', error);
        }
        setDebugData({
          projectsData: null,
          projectsError: error instanceof Error ? error.toString() : 'Unknown error',
          fetchAttempted: true,
          dataAvailable: false
        });
      }
    };
    
    checkCMSData();
  }, []);

  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#f0f0f0', 
      border: '1px solid #ccc',
      margin: '20px 0',
      maxHeight: '400px',
      overflowY: 'auto'
    }}>
      <h2>CMS Data Debug</h2>
      
      <div>
        <h3>Status:</h3>
        <p>Fetch attempted: {debugData.fetchAttempted ? 'Yes' : 'No'}</p>
        <p>Data available: {debugData.dataAvailable ? 'Yes' : 'No'}</p>
        
        {debugData.projectsError && (
          <div style={{ color: 'red' }}>
            <h3>Error:</h3>
            <p>{debugData.projectsError}</p>
          </div>
        )}
        
        {debugData.dataAvailable && debugData.projectsData && (
          <div>
            <h3>CMS Projects Data:</h3>
            <p>Number of projects: {debugData.projectsData.length}</p>
            <ul>
              {debugData.projectsData.map((project: CMSProject, index: number) => (
                <li key={index}>
                  <strong>{project.title}</strong> - {project.description}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default CMSDebug;
