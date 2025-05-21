import styled from 'styled-components';

// Dedicated styled components for the Ufanisi Resort page
export const UfanisiContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
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

export const UfanisiImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  margin-bottom: 2rem;
  display: block;
  
  @media screen and (min-width: 768px) {
    display: block;
  }
`;

export const UfanisiHeading = styled.h2`
  font-size: 1.8rem;
  margin: 2rem 0 1rem;
  color: ${({ theme }) => theme.colors.text};
`;

export const UfanisiTagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
`;

export const UfanisiTag = styled.span`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
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

export const UfanisiToolsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
`;

export const UfanisiTool = styled.span`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
`;

export const UfanisiSectionContent = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
`;

export const UfanisiDetailHeader = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 2rem;
  
  @media screen and (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const UfanisiSideBySide = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 3rem 0;
  
  @media screen and (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    gap: 2rem;
  }
`;

export const UfanisiMobileImageFirst = styled.div`
  width: 100%;
  margin-bottom: 2rem;
  order: 1;
  display: block;
  
  @media screen and (min-width: 768px) {
    width: 45%;
    margin-bottom: 0;
    order: 0; /* Ensure image appears first (left) on desktop */
    display: block !important; /* Force display on desktop */
  }
`;

export const UfanisiMobileTextSecond = styled.div`
  width: 100%;
  order: 2;
  
  @media screen and (min-width: 768px) {
    width: 50%;
    order: 1; /* Ensure text appears second (right) on desktop */
  }
`;

export const UfanisiMobileOnlyImage = styled.div`
  width: 100%;
  margin-bottom: 1rem;
  
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

export const UfanisiDesktopOnlyImage = styled.div`
  display: none;
  
  @media screen and (min-width: 768px) {
    display: block;
    width: 100%;
  }
`;

export const UfanisiHeroContainer = styled.div`
  position: relative;
  margin-bottom: 2rem;
`;

export const UfanisiHeroContent = styled.div`
  width: 100%;
  height: auto;
  position: relative;
`;

export const UfanisiHeroOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.5rem;
  background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0) 100%);
  color: white;
`;

export const UfanisiMobileTitle = styled.div`
  padding: 2rem 0;
  text-align: center;
`;

// Food Delivery App Section styling
export const FoodDeliverySection = styled.div`
  background-color: #1e1e1e; /* Always dark background regardless of theme */
  border-radius: 12px;
  padding: 2rem;
  margin: 3rem 0;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  border: 1px solid #333;
`;

export const FoodDeliveryContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

export const FoodDeliveryTextSection = styled.div`
  flex: 0 0 60%;
  
  @media screen and (max-width: 768px) {
    flex: 1;
    width: 100%;
  }
`;

export const FoodDeliveryImageSection = styled.div`
  flex: 0 0 40%;
  display: flex;
  align-items: center;
  
  @media screen and (max-width: 768px) {
    flex: 1;
    width: 100%;
    margin: 1.5rem 0;
  }
`;

export const FoodDeliveryHeading = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #FF9800; /* Orange color for headings */
  font-weight: 600;
`;

export const FoodDeliverySubheading = styled.h3`
  font-size: 1.4rem;
  margin: 1.5rem 0 1rem;
  color: #FFC107; /* Yellow color for subheadings */
  font-weight: 500;
`;

export const FoodDeliveryContent = styled.p`
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: 1.2rem;
  color: #f8f9fa; /* Always use light text on dark background */
`;

export const FoodDeliveryImage = styled.img`
  display: block;
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
`;
