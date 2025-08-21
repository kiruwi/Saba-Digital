import styled from 'styled-components';
import { FaArrowLeft } from 'react-icons/fa';

// Performance optimization - animations commented out per user request
// will-change properties also commented out to prevent unnecessary GPU usage

// Dedicated styled components for the Ufanisi Resort page
export const UfanisiMainContainer = styled.main`
  padding: 7rem 1.5rem 4rem 1.5rem;
  margin-top: 10px;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  opacity: 1;
  /* Animation commented out
  transition: opacity 0.5s ease-in;
  */
`;

export const UfanisiContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  opacity: 1;
  /* Animation commented out
  will-change: opacity, transform;
  animation: fadeIn 0.5s ease-in;
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  */
`;

export const UfanisiTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.text};
`;

export const UfanisiDescription = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.text};
`;

export const UfanisiBackButton = styled.button`
  display: inline-flex;
  align-items: center;
  margin-bottom: 2rem;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-weight: 500;
  cursor: pointer;
  padding: 0;
  
  &:hover {
    text-decoration: underline;
  }
`;

export const BackIcon = styled(FaArrowLeft)`
  margin-right: 0.5rem;
`;

export const UfanisiImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  margin-bottom: 2rem;
  display: block;
  /* Animation commented out
  will-change: transform;
  transition: transform 0.3s ease;
  */
  
  @media screen and (min-width: 768px) {
    display: block;
  }
`;

export const UfanisiHeading = styled.h2`
  font-size: 1.8rem;
  margin: 2rem 0 1rem;
  color: ${({ theme }) => theme.colors.text};
`;

export const UfanisiSectionHeading = styled(UfanisiHeading)`
  margin: 0 0 0.5rem;
`;

export const UfanisiTagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
`;

export const UfanisiTag = styled.span`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white; /* Always white text on primary color buttons */
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
`;

export const UfanisiFeaturesList = styled.ul`
  margin-bottom: 2rem;
  padding-left: 1.5rem;
`;

export const UfanisiFeatureItem = styled.li`
  margin-bottom: 0.5rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.text};
`;

export const UfanisiOrderedList = styled.ol`
  padding-left: 1.25rem;
  line-height: 1.6;
`;

export const UfanisiListItem = styled.li`
  margin-bottom: 0.5rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.text};
`;

export const UfanisiToolsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
`;

export const UfanisiTool = styled.div`
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.cardBackground};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

export const UfanisiSectionContent = styled.div`
  margin-bottom: 3rem;
`;

export const UfanisiSections = styled.div`
  margin-top: 1.5rem;
`;

export const UfanisiSection = styled.div`
  margin-bottom: 1.25rem;
`;

// Side-by-side layout
export const UfanisiSideBySide = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin: 3rem 0;
  
  @media screen and (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
`;

export const UfanisiMobileImageFirst = styled.div`
  width: 100%;
  
  @media screen and (min-width: 768px) {
    width: 50%;
  }
`;

export const UfanisiMobileTextSecond = styled.div`
  width: 100%;
  
  @media screen and (min-width: 768px) {
    width: 50%;
  }
`;

export const UfanisiHeroContainer = styled.div<{ $bgImage?: string }>`
  position: relative;
  height: 50vh;
  min-height: 400px;
  margin-bottom: 2rem;
  background-image: ${({ $bgImage }) => ($bgImage ? `url(${$bgImage})` : 'none')};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  
  @media screen and (min-width: 768px) {
    height: 60vh;
  }
`;

export const UfanisiHeroContent = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 2rem;
  z-index: 2;
  
  @media screen and (min-width: 768px) {
    bottom: 4rem;
    left: 4rem;
  }
`;

export const UfanisiHeroTitle = styled(UfanisiTitle)`
  margin: 0;
  color: white;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.6);
`;

export const UfanisiHeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  z-index: 1;
`;

export const UfanisiDetailHeader = styled.div`
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.text};
`;

export const UfanisiMobileTitle = styled.div`
  padding: 2rem 0;
  text-align: center;
`;

// Food Delivery styled components
export const FoodDeliverySection = styled.section`
  padding: 4rem 0;
  background-color: ${({ theme }) => theme.colors.cardBackground};
  color: ${({ theme }) => theme.colors.text};
`;

export const FoodDeliveryContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  
  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
`;

export const FoodDeliveryTextSection = styled.div`
  padding: 2rem;
  
  @media screen and (min-width: 768px) {
    width: 50%;
  }
`;

export const FoodDeliveryImageSection = styled.div`
  padding: 2rem;
  
  @media screen and (min-width: 768px) {
    width: 50%;
  }
`;

export const FoodDeliveryHeading = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.primary};
`;

export const FoodDeliverySubheading = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.text};
`;

export const FoodDeliveryContent = styled.p`
  margin-bottom: 1.5rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text};
`;

export const FoodDeliveryImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;
