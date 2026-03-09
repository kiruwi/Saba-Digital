import React, { useState, useEffect, useRef } from "react";

import Footer from "../components/Footer/Footer";
import { uxProjects } from "../data/projects";
import { useNavigate } from "react-router-dom";
import ProcessSection from "../components/ProcessSection/ProcessSection";

import { preloadImage, preloadSectionImages } from "../utils/preloadImages";
import {
  UfanisiMainContainer,
  UfanisiContainer,
  UfanisiTitle,
  UfanisiDescription,
  UfanisiBackButton,
  BackIcon,
  UfanisiHeading,
  UfanisiSectionHeading,
  UfanisiTagsContainer,
  UfanisiTag,
  UfanisiFeaturesList,
  UfanisiFeatureItem,
  UfanisiOrderedList,
  UfanisiListItem,
  UfanisiToolsContainer,
  UfanisiTool,
  UfanisiSectionContent,
  UfanisiSections,
  UfanisiSection,
  UfanisiDetailHeader,
  UfanisiSideBySide,
  UfanisiMobileImageFirst,
  UfanisiMobileTextSecond,
  UfanisiHeroContainer,
  UfanisiHeroContent,
  UfanisiHeroOverlay,
  UfanisiHeroTitle,
  UfanisiMobileTitle,
  UfanisiImage,
  // Food Delivery styled components
  FoodDeliverySection,
  FoodDeliveryContainer,
  FoodDeliveryTextSection,
  FoodDeliveryImageSection,
  FoodDeliveryHeading,
  FoodDeliverySubheading,
  FoodDeliveryContent,
  FoodDeliveryImage
} from "./UfanisiResortElements";

const UfanisiResort: React.FC = () => {


  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [, setIsLoaded] = useState(false);
  const [, setIsVisible] = useState(true); // Start visible by default
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Theme context available but not needed in this component
  
  // Set up mobile detection
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIsMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkIsMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Preload images when component mounts
  useEffect(() => {
    // Preload the main project image
    const project = uxProjects.find(p => p.id === "ufanisi-resort");
    if (project?.image) {
      preloadImage(project.image)
        .then(() => {
          setIsLoaded(true);
        })
        .catch(err => {
          if (process.env.NODE_ENV === 'development') {
            // eslint-disable-next-line no-console
            console.warn('Failed to preload main image:', err);
          }
        });
    }

    // Preload other section images
    preloadSectionImages('uxui')
      .then(() => {
        // UXUI section images preloaded
      })
      .catch(err => {
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.warn('Failed to preload UXUI section images:', err);
        }
      });

    // Force visibility after a short delay regardless of scroll position
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);
  
  // Get the Ufanisi Resort project data
  const project = uxProjects.find(p => p.id === "ufanisi-resort");
  
  if (!project) {
    return (
      <>

        <UfanisiMainContainer>
          <UfanisiContainer ref={contentRef}>
            <UfanisiBackButton onClick={() => navigate(-1)}>
              <BackIcon /> Go Back
            </UfanisiBackButton>
            <UfanisiTitle>Project Not Found</UfanisiTitle>
            <UfanisiDescription>The Ufanisi Resort project you're looking for doesn't exist or has been moved.</UfanisiDescription>
          </UfanisiContainer>
        </UfanisiMainContainer>
        <Footer />
      </>
    );
  }

  return (
    <>

      <UfanisiMainContainer>
        <UfanisiContainer>
          <UfanisiBackButton onClick={() => navigate(-1)}>
            <BackIcon /> Go Back
          </UfanisiBackButton>
          
          {/* Hero Image with Title Overlay */}
          <UfanisiHeroContainer $bgImage={project.image}>
            <UfanisiHeroOverlay />
            <UfanisiHeroContent>
              {!isMobile ? (
                <UfanisiHeroTitle>{project.title}</UfanisiHeroTitle>
              ) : (
                <UfanisiMobileTitle>
                  <UfanisiTitle>{project.title}</UfanisiTitle>
                </UfanisiMobileTitle>
              )}
            </UfanisiHeroContent>
          </UfanisiHeroContainer>

          <UfanisiDetailHeader>
            <UfanisiDescription>
              {project.fullDescription}
              <br/><br/>
              {project.fullDescription2}
            </UfanisiDescription>
          </UfanisiDetailHeader>

          {/* Structured sections */}
          {project.fullDescription3 && Array.isArray(project.fullDescription3) && (
            <UfanisiSections>
              {project.fullDescription3.map((section, index) => (
                <UfanisiSection key={`sec-${index}`}>
                  <UfanisiSectionHeading>{section.heading}</UfanisiSectionHeading>
                  {section.heading === 'My Design Process' ? (
                    (() => {
                      let parts = section.content.split('\n').map(s => s.trim()).filter(Boolean);
                      if (parts.length <= 1) {
                        parts = section.content
                          .split(/(?=\b\d+\.[\s\S]?)/g)
                          .map(s => s.trim())
                          .filter(Boolean);
                      }
                      return (
                        <UfanisiOrderedList>
                          {parts.map((item, i) => (
                            <UfanisiListItem key={`proc-${i}`}>{item.replace(/^\d+\.\s*/, '')}</UfanisiListItem>
                          ))}
                        </UfanisiOrderedList>
                      );
                    })()
                  ) : (
                    <UfanisiSectionContent>{section.content}</UfanisiSectionContent>
                  )}
                </UfanisiSection>
              ))}
            </UfanisiSections>
          )}
          
          {/* Desktop content (use same layout as mobile so image reliably shows) */}
          {!isMobile && (
            <UfanisiSideBySide>
              <UfanisiMobileImageFirst>
                <UfanisiImage
                  src={require('../assets/projects/ux-ui/u-r.jpg')}
                  alt="Previous design issues"
                />
              </UfanisiMobileImageFirst>
              <UfanisiMobileTextSecond>
                <UfanisiHeading>My Design Transformation</UfanisiHeading>
                <UfanisiSectionContent>
                  My previous design suffered from fundamental flaws in typography and layout that I needed to address. My original interface 
                  featured a chaotic mix of font families,I had combined serif, sans-serif, and decorative fonts without clear purpose. 
                  Font weights varied randomly throughout sections, which created visual confusion and made content hierarchy unclear.
                </UfanisiSectionContent>
                <UfanisiSectionContent>
                  Spacing was problematic throughout my first attempt, with inconsistent margins and padding that failed to create logical 
                  relationships between elements. My excessive reliance on center alignment for nearly all elements created an 
                  unbalanced layout that ignored natural reading patterns and made scanning difficult for users.
                </UfanisiSectionContent>
                <UfanisiSectionContent>
                  User-unfriendly elements were abundant in my initial work, buttons lacked proper affordances, interactive elements had insufficient 
                  contrast, and the navigation required users to hunt for basic functions. This second project served as a refresher for me, allowing me to 
                  implement a consistent type system, thoughtful spacing hierarchy, and intuitive interaction patterns in my redesign.
                </UfanisiSectionContent>
              </UfanisiMobileTextSecond>
            </UfanisiSideBySide>
          )}
          
          {/* Mobile-only content */}
          {isMobile && (
            <UfanisiSideBySide>
              <UfanisiMobileImageFirst>
                <UfanisiImage 
                   src={require('../assets/projects/ux-ui/u-r.jpg')} 
                   alt="Previous design issues" 
                 />
              </UfanisiMobileImageFirst>
              <UfanisiMobileTextSecond>
                <UfanisiHeading>My Design Transformation</UfanisiHeading>
              <UfanisiSectionContent>
                My previous design suffered from fundamental flaws in typography and layout that I needed to address. My original interface 
                featured a chaotic mix of font families,I had combined serif, sans-serif, and decorative fonts without clear purpose. 
                Font weights varied randomly throughout sections, which created visual confusion and made content hierarchy unclear.
              </UfanisiSectionContent>
              <UfanisiSectionContent>
                Spacing was problematic throughout my first attempt, with inconsistent margins and padding that failed to create logical 
                relationships between elements. My excessive reliance on center alignment for nearly all elements created an 
                unbalanced layout that ignored natural reading patterns and made scanning difficult for users.
              </UfanisiSectionContent>
              <UfanisiSectionContent>
                User-unfriendly elements were abundant in my initial work, buttons lacked proper affordances, interactive elements had insufficient 
                contrast, and the navigation required users to hunt for basic functions. This second project served as a refresher for me, allowing me to 
                implement a consistent type system, thoughtful spacing hierarchy, and intuitive interaction patterns in my redesign.
              </UfanisiSectionContent>
              </UfanisiMobileTextSecond>
            </UfanisiSideBySide>
          )}
          
          {/* Process Section */}
          <ProcessSection />

          {/* Food Delivery App Section with distinct styling */}
          <FoodDeliverySection>
            <FoodDeliveryContainer>
              <FoodDeliveryTextSection>
                <FoodDeliveryHeading>Ufanisi Resort Food Delivery App</FoodDeliveryHeading>
                <FoodDeliveryContent>
                  I can't lie, food delivery app projects excite me because food matters for your well-being. For many, eating isn't just fuel, it's a passion. As a self confessed foodie, I dive into anything food related. So for my first Google UX Design Certificate project, I had to pick this one
                </FoodDeliveryContent>
                <FoodDeliveryContent>
                  Join me on this creative journey as I share how I breathed new life into Ufanisi Resort's food delivery app, taking you from my initial terrible UI Designs, to the final polished interface!
                </FoodDeliveryContent>
                
                <FoodDeliverySubheading>The Challenge</FoodDeliverySubheading>
                <FoodDeliveryContent>
                  Let's be real, we're all rushing around these days! I've watched friends struggle to find time to cook at home, me included, and some can't even squeeze in a visit to a restaurant. We wanted to solve this everyday problem: how can busy people get delicious food without disrupting their packed schedules in the town of Kisii?
                </FoodDeliveryContent>
                
                <FoodDeliverySubheading>The Goal</FoodDeliverySubheading>
                <FoodDeliveryContent>
                  I set out to create something I'd actually love for the people of Kisii to use, a super intuitive app, that makes ordering food from Ufanisi Resort as easy and enjoyable as possible. No more hungry moments when you're stuck working late!
                </FoodDeliveryContent>
                
                <FoodDeliverySubheading>My Role</FoodDeliverySubheading>
                <FoodDeliveryContent>
                  I wore the UX Designer hat throughout this project, pouring my creativity into every aspect from the first rough sketches to the final polished product. It was a hands-on labor of love from start to finish!
                </FoodDeliveryContent>
              </FoodDeliveryTextSection>
              
              <FoodDeliveryImageSection>
                <FoodDeliveryImage 
                  src="./assets/projects/ux-ui/ufanisi.jpg" 
                  alt="Ufanisi Resort Food Delivery App" 
                />
              </FoodDeliveryImageSection>
            </FoodDeliveryContainer>
          </FoodDeliverySection>

          {/* Features and Tools Sections */}
          <UfanisiTagsContainer>
            {project.tags.map((tag, index) => (
              <UfanisiTag key={index}>{tag}</UfanisiTag>
            ))}
          </UfanisiTagsContainer>
          
          <UfanisiHeading>Features</UfanisiHeading>
          <UfanisiFeaturesList>
            {project.features?.map((feature, index) => (
              <UfanisiFeatureItem key={index}>{feature}</UfanisiFeatureItem>
            ))}
          </UfanisiFeaturesList>
          
          <UfanisiHeading>Tools Used</UfanisiHeading>
          <UfanisiToolsContainer>
            {project.tools?.map((tool, index) => (
              <UfanisiTool key={index}>{tool}</UfanisiTool>
            ))}
          </UfanisiToolsContainer>
        </UfanisiContainer>
      </UfanisiMainContainer>
      <Footer />
    </>
  );
};

export default UfanisiResort;
