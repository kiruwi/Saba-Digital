// src/types.ts

interface DescriptionSection {
  heading: string;
  content: string;
}

export interface ProjectType {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  fullDescription2?: string;
  fullDescription3?: DescriptionSection[] | string;
  image: any; // Using 'any' since it comes from imports
  secondaryImage?: any;
  tags?: string[];
  category?: string;
  features?: string[];
  tools?: string[];
  year?: string;
  technicalDetails?: string;
  additionalDetails?: string;
  designProcess?: string;
  designApproach?: string;
  
  // These are the original fields we had, keeping as optional for compatibility
  description?: string;
  coverImage?: string;
  images?: string[];
  link?: string;
  githubLink?: string;
  
  // For any additional project-specific fields
  [key: string]: any;
}
