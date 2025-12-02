import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Listing } from '../features/listings/types';

interface SearchResult {
  url: string;
  site: string;
}

interface SearchContextValue {
  searchResults: SearchResult[];
  setSearchResults: (results: SearchResult[]) => void;
  apiListings: Listing[];
  setApiListings: (listings: Listing[]) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  clearSearch: () => void;
}

const SearchContext = createContext<SearchContextValue | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [apiListings, setApiListings] = useState<Listing[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const clearSearch = () => {
    setSearchResults([]);
    setApiListings([]);
    setSearchQuery('');
  };

  return (
    <SearchContext.Provider value={{
      searchResults,
      setSearchResults,
      apiListings,
      setApiListings,
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
