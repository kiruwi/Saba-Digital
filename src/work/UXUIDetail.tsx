import React, { useEffect } from "react";

import Footer from "../components/Footer";
import UXUIProjectDetail from "../components/ProjectDetail/UXUIProjectDetail";
import { uxProjects } from "../data/projects";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import SEO from "../components/SEO";
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const { theme } = useTheme();
  


  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const currentProject = uxProjects.find((project) => project.id === id)
    || (location.pathname.includes('ufanisi-resort')
      ? uxProjects.find((project) => project.id === 'ufanisi-resort')
      : null);
  const canonicalUrl = `https://iancheruiyot.work/work/ux-ui/${id || ''}`.replace(/\/$/, '');
  
  // Theme is now accessed from context
  
  // Debug location information (removed for production)
  
  // Check if this is the Ufanisi Resort by URL fragment
  const isUfanisiResort = id === 'ufanisi-resort' || location.pathname.includes('ufanisi-resort');
  
  // Ufanisi Resort detection logic
  
  useEffect(() => {
    // Reload the page if we detect URL issues with Ufanisi Resort
    if (id === 'ufanisi-resort' && !isUfanisiResort) {
      // Forcing refresh for Ufanisi Resort
      navigate('/work/ux-ui/ufanisi-resort');
    }
  }, [id, isUfanisiResort, navigate]);

  useEffect(() => {
    // Scroll to top immediately with auto behavior to ensure consistent positioning
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [id]);

  return (
    <>
      <SEO
        title={currentProject ? `${currentProject.title} | UX/UI Case Study` : "Project Not Found"}
        description={currentProject?.shortDescription || "The requested UX/UI project could not be found."}
        canonical={canonicalUrl}
        type={currentProject ? 'article' : 'website'}
        noIndex={!currentProject}
      />

      <MainContent>
        <UXUIProjectDetail projects={uxProjects} />
      </MainContent>
      <Footer />
    </>
  );
};

export default UXUIDetail;
