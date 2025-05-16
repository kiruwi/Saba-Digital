import React, { useState, useEffect } from 'react';

// Helper function to determine the correct base path
function getBasePath() {
  // Check if we're in a GitHub Pages environment
  const isGitHubPages = window.location.hostname.includes('github.io');
  // For GitHub Pages, we need to prefix with the repo name
  return isGitHubPages ? '/Saba-Digital' : '';
}

const CMSDebug = () => {
  const [debugData, setDebugData] = useState({
    projectsData: null,
    projectsError: null,
    fetchAttempted: false,
    dataAvailable: false
  });

  useEffect(() => {
    const checkCMSData = async () => {
      try {
        // Use dynamic base path for GitHub Pages compatibility
        const basePath = getBasePath();
        console.log(`Trying to fetch CMS data from ${basePath}/content-api/projects.json`);
        const response = await fetch(`${basePath}/content-api/projects.json`);
        
        if (!response.ok) {
          throw new Error(`Status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('CMS data successfully fetched:', data);
        
        setDebugData({
          projectsData: data,
          projectsError: null,
          fetchAttempted: true,
          dataAvailable: true
        });
      } catch (error) {
        console.error('Error fetching CMS data:', error);
        setDebugData({
          projectsData: null,
          projectsError: error.toString(),
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
        
        {debugData.dataAvailable && (
          <div>
            <h3>CMS Projects Data:</h3>
            <p>Number of projects: {debugData.projectsData.length}</p>
            <ul>
              {debugData.projectsData.map((project, index) => (
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
