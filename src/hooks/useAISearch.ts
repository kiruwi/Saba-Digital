import { useState, useMemo } from 'react';
import Fuse from 'fuse.js';
import { allProjects } from '../data/projects';
import type { ProjectType } from '../data/projects';

// Enhanced search result interface for Fuse.js
export interface SearchResult {
  item: SearchableItem;
  score?: number;
  refIndex: number;
}

export interface SearchableItem {
  id: string;
  type: 'project' | 'page' | 'video';
  title: string;
  description: string;
  category: string;
  tags: string[];
  tools?: string[];
  features?: string[];
  url?: string;
  image?: string;
  year?: string | number;
  // Original project data if it's a project
  project?: ProjectType;
}

export interface SearchFilters {
  category?: string;
  year?: number;
  tools?: string[];
  tags?: string[];
}

export const useAISearch = () => {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({});

  // Create comprehensive search index
  const searchIndex = useMemo(() => {
    const searchableItems: SearchableItem[] = [];

    // Add all projects
    allProjects.forEach((project, index) => {
      let allText = `${project.shortDescription} ${project.fullDescription} ${project.fullDescription2 || ''}`;
      if (project.fullDescription3) {
        const description3Text = project.fullDescription3.map(section => `${section.heading} ${section.content}`).join(' ');
        allText += ` ${description3Text}`;
      }

      searchableItems.push({
        id: `project-${index}`,
        type: 'project',
        title: project.title,
        description: allText,
        category: project.category,
        tags: project.tags,
        tools: project.tools,
        features: project.features,
        year: project.year,
        image: project.image,
        project: project
      });
    });

    // Add Ad Design page
    searchableItems.push({
      id: 'page-ad-design',
      type: 'page',
      title: 'Ad Design',
      description: 'Advertising design portfolio showcasing creative advertisements, promotional materials, marketing campaigns, brand advertising, graphic design for advertising, digital ads, print advertisements, marketing graphics, promotional designs',
      category: 'graphics',
      tags: ['Advertising Design', 'Marketing', 'Graphics', 'Brand Advertising', 'Promotional Materials', 'Digital Ads', 'Print Ads', 'Creative Advertising'],
      tools: ['Photoshop', 'Illustrator', 'InDesign'],
      url: '/work/ad-design',
      image: '/images/addesign/Bright Squad cleaners.jpg'
    });

    // Add Motion Graphics page
    searchableItems.push({
      id: 'page-motion-graphics',
      type: 'page',
      title: 'Motion Graphics',
      description: 'Motion graphics portfolio featuring logo animations, video graphics, animated designs, kinetic typography, visual effects, animated logos, promotional videos, brand animations, video editing, after effects animations',
      category: 'video',
      tags: ['Motion Graphics', 'Animation', 'Video Graphics', 'Logo Animation', 'Visual Effects', 'Kinetic Typography', 'Brand Animation', 'Video Editing'],
      tools: ['After Effects', 'Premiere Pro', 'Cinema 4D'],
      url: '/work/motion',
      image: 'https://i.ytimg.com/vi/bS0iYERPlok/hqdefault.jpg'
    });

    // Add individual motion graphics videos
    const videos = [
      { id: 'bS0iYERPlok', title: 'De La Vibes Poster Animation' },
      { id: 'peAWkS10D_w', title: 'REVEL Night Club Australia' },
      { id: 'pTKN6i-oPwQ', title: 'Carrace Liquor Store logo Animation' },
      { id: 'BVneKsVK1aY', title: 'Synnefa Rebrand Logo Animation' }
    ];

    videos.forEach(video => {
      searchableItems.push({
        id: `video-${video.id}`,
        type: 'video',
        title: video.title,
        description: `${video.title} motion graphics animation video logo branding`,
        category: 'video',
        tags: ['Motion Graphics', 'Animation', 'Logo Animation', 'Video'],
        tools: ['After Effects'],
        url: `/work/motion#${video.id}`,
        image: `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`
      });
    });

    return searchableItems;
  }, []);

  // Initialize Fuse.js with comprehensive search options
  const fuse = useMemo(() => {
    const options = {
      includeScore: true,
      threshold: 0.4, // More lenient matching
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 2,
      keys: [
        { name: 'title', weight: 0.3 },
        { name: 'tags', weight: 0.25 },
        { name: 'description', weight: 0.2 },
        { name: 'category', weight: 0.15 },
        { name: 'tools', weight: 0.1 }
      ]
    };

    return new Fuse(searchIndex, options);
  }, [searchIndex]);

  const searchResults = useMemo(() => {
    const trimmedQuery = query.trim().toLowerCase();
    if (!trimmedQuery) return [];

    // Perform fuzzy search first
    const results = fuse.search(trimmedQuery);

    // Ensure each returned item actually contains the raw query terms
    const queryWords = trimmedQuery.split(/\s+/);

    const filtered = results.filter(result => {
      const { title, description, tags = [], tools = [] } = result.item;
      const haystack = (
        `${title} ${description} ${tags.join(' ')} ${tools?.join(' ')}`
      ).toLowerCase();
      // Keep result only if EVERY query word is present in haystack
      return queryWords.every(word => haystack.includes(word));
    });

    return filtered.slice(0, 10).map((result, index) => ({
      item: result.item,
      score: result.score || 0,
      refIndex: index
    }));
  }, [query, fuse]);

  const suggestions = useMemo(() => {
    if (query.length < 2) return [];
    
    const allTerms = new Set<string>();
    
    searchIndex.forEach(item => {
      // Add tags
      item.tags.forEach(tag => {
        if (tag.toLowerCase().includes(query.toLowerCase())) {
          allTerms.add(tag);
        }
      });
      
      // Add tools
      item.tools?.forEach(tool => {
        if (tool.toLowerCase().includes(query.toLowerCase())) {
          allTerms.add(tool);
        }
      });
      
      // Add category if it matches
      if (item.category.toLowerCase().includes(query.toLowerCase())) {
        allTerms.add(item.category);
      }
      
      // Add title if it partially matches
      if (item.title.toLowerCase().includes(query.toLowerCase())) {
        allTerms.add(item.title);
      }
    });
    
    return Array.from(allTerms).slice(0, 5);
  }, [query, searchIndex]);

  const clearSearch = () => {
    setQuery('');
    setFilters({});
  };

  const applyFilter = (newFilters: Partial<SearchFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const removeFilter = (filterKey: keyof SearchFilters) => {
    setFilters(prev => {
      const updated = { ...prev };
      delete updated[filterKey];
      return updated;
    });
  };

  return {
    query,
    setQuery,
    results: searchResults,
    isLoading: false,
    suggestions,
    filters,
    applyFilter,
    removeFilter,
    clearSearch,
    hasResults: searchResults.length > 0,
    searchCount: searchResults.length
  };
};
