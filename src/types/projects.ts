// src/types/projects.ts
export interface DescriptionSection {
  heading: string;
  content: string;
}

export interface ProjectBase {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  fullDescription2?: string;
  fullDescription3?: DescriptionSection[];
  image: string;
  additionalImages?: string[];
  tags: string[];
  category: 'uxui' | 'webdev' | 'graphics';
  features?: string[];
  tools: string[];
  year: string;
  technologies?: string[];
  liveUrl?: string;
  githubUrl?: string;
  behanceUrl?: string;
}

export interface UXUIProject extends ProjectBase {
  category: 'uxui';
  features: string[];
}

export interface WebDevProject extends ProjectBase {
  category: 'webdev';
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export interface GraphicsProject extends ProjectBase {
  category: 'graphics';
  behanceUrl?: string;
}

export type Project = UXUIProject | WebDevProject | GraphicsProject;
