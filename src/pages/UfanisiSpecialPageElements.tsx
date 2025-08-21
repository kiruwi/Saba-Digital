import styled from 'styled-components';
import { FaArrowLeft } from 'react-icons/fa';

export const SpecialMainContainer = styled.main`
  padding: 7rem 1.5rem 4rem 1.5rem;
  margin-top: 10px;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.text};
`;

export const BackButton = styled.button`
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

export const ProjectImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  margin-bottom: 2rem;
`;

export const Description = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.text};
`;

export const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
`;

export const Tag = styled.span`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white; /* Always white text on primary color buttons */
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
`;

export const SideBySideContainer = styled.div`
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

export const ImageColumn = styled.div`
  width: 100%;
  margin-bottom: 2rem;

  @media screen and (min-width: 768px) {
    width: 45%;
    margin-bottom: 0;
  }
`;

export const TextColumn = styled.div`
  width: 100%;

  @media screen and (min-width: 768px) {
    width: 55%;
  }
`;

export const SectionHeading = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.primary};
`;

export const FeaturesList = styled.ul`
  margin-bottom: 2rem;
  padding-left: 1.5rem;
`;

export const FeatureItem = styled.li`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text};
`;
