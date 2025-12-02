import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface SearchResult {
  url: string;
  site: string;
}

interface SearchContextValue {
  searchResults: SearchResult[];
  setSearchResults: (results: SearchResult[]) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  clearSearch: () => void;
}

const SearchContext = createContext<SearchContextValue | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const clearSearch = () => {
    setSearchResults([]);
    setSearchQuery('');
  };

  return (
    <SearchContext.Provider value={{
      searchResults,
      setSearchResults,
      searchQuery,
      setSearchQuery,
      clearSearch
    }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearchContext must be used within SearchProvider');
  }
  return context;
};

export type { SearchResult };
