import styled from 'styled-components';
import { FaArrowLeft } from 'react-icons/fa';
import {
  ProjectDetailHeader,
  DetailDescription,
  SideBySideContainer,
} from '../components/ProjectCard/ProjectCardElements';

export const UfanisiMain = styled.main`
  padding: 7rem 1.5rem 4rem 1.5rem;
  margin-top: 10px;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;

export const TitleStrip = styled.div`
  padding: 2rem 0;
  background-color: ${({ theme }) => theme.colors.cardBackground};
  text-align: center;
  margin-bottom: 2rem;
`;

export const FullWidthHeader = styled(ProjectDetailHeader)`
  width: 100%;
  max-width: 100%;
`;

export const MultiColumnDescription = styled(DetailDescription)`
  column-count: 1;
  column-gap: 2rem;

  @media (min-width: 1024px) {
    column-count: 2;
  }
`;

export const Para = styled.p<{ $isHeading?: boolean; $mt?: string; $mb?: string }>`
  margin-top: ${({ $mt }) => $mt ?? '0'};
  margin-bottom: ${({ $mb }) => $mb ?? '0'};
  font-weight: ${({ $isHeading }) => ($isHeading ? 'bold' : 'normal')};
  font-size: ${({ $isHeading }) => ($isHeading ? '1.1rem' : 'inherit')};
  color: ${({ $isHeading, theme }) => ($isHeading ? theme.colors.primary : 'inherit')};
`;

export const SectionBlock = styled.div`
  margin-top: 1.5rem;
`;

export const BlockMB = styled.div`
  margin-bottom: 0.75rem;
`;

export const NumberedList = styled.ol`
  padding-left: 1.25rem;
  line-height: 1.6;
`;

export const MultiColP = styled.p`
  column-count: 1;
  column-gap: 2rem;

  @media (min-width: 1024px) {
    column-count: 2;
  }
`;

export const SpacedSideBySideContainer = styled(SideBySideContainer)`
  margin-top: 3rem;
  margin-bottom: 3rem;
`;

export const SectionHeading = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

export const BodyP = styled.p<{ $mb?: string }>`
  line-height: 1.6;
  margin-bottom: ${({ $mb }) => $mb ?? '1rem'};
`;

export const InfoSection = styled.div`
  margin-top: 2rem;
`;

export const BackIcon = styled(FaArrowLeft)`
  margin-right: 0.5rem;
`;
