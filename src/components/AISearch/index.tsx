import React, { useState, useRef, useEffect } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useTheme as useStyledTheme } from 'styled-components';
import { useAISearch } from '../../hooks/useAISearch';

import {
  SearchContainer,
  SearchBar,
  SearchInput,
  SearchIcon,
  ClearButton,
  SuggestionsContainer,
  SuggestionItem,
  ResultsContainer,
  ResultCard,
  ResultImage,
  ResultContent,
  ResultTitle,
  ResultDescription,
  ResultTags,
  Tag,
  NoResults,
  LoadingSpinner,
  FilterBar,
  FilterChip,
  SearchStats,
  SearchOverlay
} from './AISearchElements';

interface AISearchProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

export const AISearch: React.FC<AISearchProps> = ({ isOpen, onClose, initialQuery = '' }) => {
  const theme = useStyledTheme();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const {
    query,
    setQuery,
    results,
    isLoading,
    suggestions,
    filters,
    applyFilter,
    removeFilter,
    clearSearch,
    hasResults,
    searchCount
  } = useAISearch();

  // Focus input when search opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      if (initialQuery) {
        setQuery(initialQuery);
      }
    }
  }, [isOpen, initialQuery, setQuery]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'k' && !isOpen) {
        e.preventDefault();
        onClose(); // This will open the search since isOpen is false
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const handleResultClick = (projectId: string, category: string) => {
    onClose();
    // Navigate to project detail page
    navigate(`/work/${category}/${projectId}`);
  };

  const handleClearSearch = () => {
    clearSearch();
    inputRef.current?.focus();
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <SearchOverlay theme={theme} onClick={handleOverlayClick}>
      <SearchContainer theme={theme}>
        <SearchBar theme={theme}>
          <SearchIcon theme={theme}><FiSearch /></SearchIcon>
          <SearchInput
            ref={inputRef}
            type="text"
            placeholder="Search projects..."
            value={query}
            onChange={handleInputChange}
            onFocus={() => setShowSuggestions(true)}
            theme={theme}
          />
          {query && (
            <ClearButton theme={theme} onClick={handleClearSearch}>
              <FiX />
            </ClearButton>
          )}
        </SearchBar>

        {/* Search Suggestions */}
        {showSuggestions && suggestions.length > 0 && (
          <SuggestionsContainer theme={theme}>
            {suggestions.map((suggestion, index) => (
              <SuggestionItem
                key={index}
                theme={theme}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                💡 {suggestion}
              </SuggestionItem>
            ))}
          </SuggestionsContainer>
        )}

        {/* Active Filters */}
        {(filters.category || filters.year || (filters.tools && filters.tools.length > 0)) && (
          <FilterBar theme={theme}>
            {filters.category && (
              <FilterChip theme={theme} onClick={() => removeFilter('category')}>
                Category: {filters.category.toUpperCase()} ✕
              </FilterChip>
            )}
            {filters.year && (
              <FilterChip theme={theme} onClick={() => removeFilter('year')}>
                Year: {filters.year} ✕
              </FilterChip>
            )}
            {filters.tools?.map((tool, index) => (
              <FilterChip
                key={index}
                theme={theme}
                onClick={() => {
                  const newTools = filters.tools?.filter(t => t !== tool);
                  if (newTools?.length === 0) {
                    removeFilter('tools');
                  } else {
                    applyFilter({ tools: newTools });
                  }
                }}
              >
                Tool: {tool} ✕
              </FilterChip>
            ))}
          </FilterBar>
        )}

        {/* Search Results */}
        <ResultsContainer theme={theme}>
          {query && (
            <SearchStats theme={theme}>
              {isLoading ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <LoadingSpinner theme={theme} />
                  AI is analyzing your query...
                </div>
              ) : (
                `Found ${searchCount} result${searchCount !== 1 ? 's' : ''} for "${query}"`
              )}
            </SearchStats>
          )}

          {!isLoading && hasResults && (
            <div>
              {results.slice(0, 8).map((result, index) => {
                const item = result.item;
                const isProject = item.type === 'project';
                const displayTitle = item.title;
                const displayDescription = isProject && item.project ? item.project.shortDescription : item.description;
                const displayImage = item.image || (isProject && item.project ? item.project.image : '');
                
                return (
                  <ResultCard
                    key={item.id}
                    theme={theme}
                    onClick={() => {
                      if (item.url) {
                        // For internal routes, use navigate; for external URLs, open in new tab
                        if (item.url.startsWith('/')) {
                          onClose();
                          navigate(item.url);
                        } else {
                          window.open(item.url, '_blank');
                        }
                      } else if (isProject && item.project) {
                        handleResultClick(item.project.id, item.project.category);
                      }
                    }}
                  >
                    <ResultImage
                      src={displayImage.startsWith('/') ? displayImage : displayImage}
                      alt={displayTitle}
                      theme={theme}
                    />
                    <ResultContent theme={theme}>
                      <ResultTitle theme={theme}>
                        {displayTitle}
                        <span style={{ 
                          fontSize: '12px', 
                          opacity: 0.7, 
                          marginLeft: '8px',
                          textTransform: 'uppercase'
                        }}>
                          {item.category}
                        </span>
                      </ResultTitle>
                      <ResultDescription theme={theme}>
                        {displayDescription}
                      </ResultDescription>
                      <ResultTags theme={theme}>
                        <small style={{ opacity: 0.8, marginRight: '8px' }}>
                          {item.type} • Score: {Math.round((result.score || 0) * 100)}
                        </small>
                        {item.tags.slice(0, 3).map((tag: string, tagIndex: number) => (
                          <Tag key={tagIndex} theme={theme}>
                            {tag}
                          </Tag>
                        ))}
                      </ResultTags>
                    </ResultContent>
                  </ResultCard>
                );
              })}
            </div>
          )}

          {!isLoading && query && !hasResults && (
            <NoResults theme={theme}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🤖</div>
              <h3>No projects found</h3>
              <p>Try searching for:</p>
              <ul style={{ textAlign: 'left', marginTop: '16px' }}>
                <li>"UX design projects"</li>
                <li>"React web development"</li>
                <li>"Brand identity design"</li>
                <li>"3D visualization"</li>
                <li>"Mobile app design"</li>
              </ul>
            </NoResults>
          )}

          {!query && (
            <div style={{ textAlign: 'center', padding: '40px 20px', opacity: 0.7 }}>
              <h3 style={{ margin: '0 0 8px 0', color: theme.colors.text }}>
                AI-Powered Portfolio Search
              </h3>
              <p style={{ color: theme.colors.text, opacity: 0.8 }}>
                Use natural language to find projects, skills, and work samples
              </p>
              <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: '8px', 
                justifyContent: 'center',
                marginTop: '20px'
              }}>
                {['UX Research', 'Ads', 'React Projects', '3D Design', 'Branding', 'Mobile Apps'].map(term => (
                  <FilterChip
                    key={term}
                    theme={theme}
                    onClick={() => setQuery(term.toLowerCase())}
                    style={{ cursor: 'pointer' }}
                  >
                    Try: {term}
                  </FilterChip>
                ))}
              </div>
            </div>
          )}
        </ResultsContainer>
      </SearchContainer>
    </SearchOverlay>
  );
};

export default AISearch;
