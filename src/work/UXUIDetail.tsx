import React, { useEffect } from "react";

import Footer from "../components/Footer";
import UXUIProjectDetail from "../components/ProjectDetail/UXUIProjectDetail";
import { uxProjects } from "../data/projects";
import { useParams, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useTheme } from "../contexts/ThemeContext";

const MainContent = styled.main`
  padding: 7rem 1.5rem 4rem 1.5rem;
  margin-top: 10px;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;

// Using ThemeContext directly - no props needed

const UXUIDetail: React.FC = () => {
  // Get theme from context - even though we don't use these variables directly,
  // destructuring them ensures the component subscribes to context changes
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { theme, toggleTheme } = useTheme();
  


  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  
  // Theme is now accessed from context
  
  // Debug location information
  console.log('UXUIDetail - Current location:', location);
  console.log('UXUIDetail - ID param:', id);
  
  // Check if this is the Ufanisi Resort by URL fragment
  const isUfanisiResort = id === 'ufanisi-resort' || 
                          location.pathname.includes('ufanisi-resort') ||
                          location.hash.includes('ufanisi-resort');
  
  console.log('UXUIDetail - Is Ufanisi Resort:', isUfanisiResort);
  
  useEffect(() => {
    // Reload the page if we detect URL issues with Ufanisi Resort
    if (id === 'ufanisi-resort' && !isUfanisiResort) {
      console.log('UXUIDetail - Forcing refresh for Ufanisi Resort');
      window.location.hash = '/work/uxui/ufanisi-resort';
    }
  }, [id, isUfanisiResort]);

  useEffect(() => {
    // Scroll to top immediately with auto behavior to ensure consistent positioning
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [id]);

  return (
    <>

      <MainContent>
        <UXUIProjectDetail projects={uxProjects} />
      </MainContent>
      <Footer />
    </>
  );
};

export default UXUIDetail;
