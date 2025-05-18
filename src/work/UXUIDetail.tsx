import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import UXUIProjectDetail from "../components/ProjectDetail/UXUIProjectDetail";
import { uxProjects } from "../data/projects";
import { useParams, useLocation } from "react-router-dom";

const UXUIDetail: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  
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

  return (
    <>
      <Navbar toggle={toggle} isOpen={isOpen} />
      <main style={{ padding: "7rem 1.5rem 4rem 1.5rem", marginTop: "10px", background: "#000", color: "#fff" }}>
        <UXUIProjectDetail projects={uxProjects} />
      </main>
      <Footer />
    </>
  );
};

export default UXUIDetail;
