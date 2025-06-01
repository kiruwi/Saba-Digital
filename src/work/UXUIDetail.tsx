import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import UXUIProjectDetail from "../components/ProjectDetail/UXUIProjectDetail";
import { uxProjects } from "../data/projects";
import { useParams, useLocation } from "react-router-dom";
import styled from "styled-components";

const MainContent = styled.main`
  padding: 7rem 1.5rem 4rem 1.5rem;
  margin-top: 10px;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;

interface UXUIDetailProps {
  currentTheme: any;
  toggleTheme: () => void;
}

const UXUIDetail: React.FC<UXUIDetailProps> = ({ currentTheme, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  
  // Theme is now passed as props
  
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
      <Navbar toggle={toggle} isOpen={isOpen} currentTheme={currentTheme} toggleTheme={toggleTheme} />
      <MainContent>
        <UXUIProjectDetail projects={uxProjects} />
      </MainContent>
      <Footer />
    </>
  );
};

export default UXUIDetail;
