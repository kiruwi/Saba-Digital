import React, { useState, useRef, useEffect, useCallback } from 'react';
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

// Helper function for route segments
const toRouteSegment = (cat: string) => {
  switch (cat) {
    case 'uxui': return 'ux-ui';
    case 'webdev': return 'web-dev';
    default: return cat;
  }
};

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
  const [selectedResultIndex, setSelectedResultIndex] = useState(-1);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  
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
    searchCount,
    highlightMatch
  } = useAISearch();

  // Helper functions - useCallback for functions used in useEffect dependencies
  const handleSuggestionClick = useCallback((suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    setSelectedSuggestionIndex(-1);
    inputRef.current?.focus();
  }, [setQuery]);

  const handleResultClick = useCallback((projectId: string, category: string) => {
    onClose();
    // Navigate to project detail page using correct route segment for category
    const segment = toRouteSegment(category);
    navigate(`/work/${segment}/${projectId}`);
  }, [onClose, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setShowSuggestions(true);
    setSelectedResultIndex(-1);
    setSelectedSuggestionIndex(-1);
  };

  const handleClearSearch = () => {
    clearSearch();
    inputRef.current?.focus();
  };

  // Focus input when search opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      if (initialQuery) {
        setQuery(initialQuery);
      }
    }
  }, [isOpen, initialQuery, setQuery]);

  // Handle keyboard shortcuts and navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (showSuggestions && suggestions.length > 0) {
          setSelectedSuggestionIndex(prev => 
            prev < suggestions.length - 1 ? prev + 1 : 0
          );
        } else if (hasResults) {
          setSelectedResultIndex(prev => 
            prev < Math.min(results.length - 1, 7) ? prev + 1 : 0
          );
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (showSuggestions && suggestions.length > 0) {
          setSelectedSuggestionIndex(prev => 
            prev > 0 ? prev - 1 : suggestions.length - 1
          );
        } else if (hasResults) {
          setSelectedResultIndex(prev => 
            prev > 0 ? prev - 1 : Math.min(results.length - 1, 7)
          );
        }
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (showSuggestions && selectedSuggestionIndex >= 0) {
          handleSuggestionClick(suggestions[selectedSuggestionIndex]);
        } else if (hasResults && selectedResultIndex >= 0) {
          const result = results[selectedResultIndex];
          const item = result.item;
          if (item.url) {
            if (item.url.startsWith('/')) {
              onClose();
              navigate(item.url);
            } else {
              window.open(item.url, '_blank');
            }
          } else if (item.type === 'project' && item.project) {
            handleResultClick(item.project.id, item.project.category);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, showSuggestions, suggestions, hasResults, results, selectedResultIndex, selectedSuggestionIndex, navigate, handleResultClick, handleSuggestionClick]);

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
                onMouseEnter={() => setSelectedSuggestionIndex(index)}
                style={{
                  backgroundColor: selectedSuggestionIndex === index ? 
                    (theme.theme === 'dark' ? 'rgba(45, 182, 112, 0.2)' : 'rgba(45, 182, 112, 0.1)') : 
                    'transparent',
                  outline: selectedSuggestionIndex === index ? '2px solid ' + theme.colors.primary : 'none',
                }}
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
                    onMouseEnter={() => setSelectedResultIndex(index)}
                    style={{
                      backgroundColor: selectedResultIndex === index ? 
                        (theme.theme === 'dark' ? 'rgba(45, 182, 112, 0.1)' : 'rgba(45, 182, 112, 0.05)') : 
                        'transparent',
                      outline: selectedResultIndex === index ? '2px solid ' + theme.colors.primary : 'none',
                      transform: selectedResultIndex === index ? 'scale(1.02)' : 'scale(1)',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <ResultImage
                      src={displayImage.startsWith('/') ? displayImage : displayImage}
                      alt={displayTitle}
                      theme={theme}
                    />
                    <ResultContent theme={theme}>
                      <ResultTitle theme={theme}>
                        <span dangerouslySetInnerHTML={{ 
                          __html: highlightMatch(displayTitle, query) 
                        }} />
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
                        <span dangerouslySetInnerHTML={{ 
                          __html: highlightMatch(displayDescription || '', query) 
                        }} />
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
              <div style={{ marginTop: '20px', fontSize: '14px', opacity: 0.7 }}>
                💡 Tip: Use ↑↓ arrow keys to navigate results, Enter to select
              </div>
            </NoResults>
          )}

          {!query && (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              {/* <h3 style={{ margin: '0 0 8px 0', color: theme.colors.text }}>
                AI-Powered Portfolio Search
              </h3>
              <p style={{ color: theme.colors.text, opacity: 0.8 }}>
                Use natural language to find projects, skills, and work samples
              </p> */}
              <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: '8px', 
                justifyContent: 'center',
                marginTop: '20px'
              }}>
                {['UX Research', 'Ads', 'Website', '3D', 'Branding', 'Motion'].map(term => (
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
