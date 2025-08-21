
import React from 'react';
import './SearchBar.css';
import { SearchIcon } from '../Icons/SearchIcon';
import { LoadingSpinnerIcon } from '../Icons/LoadingSpinnerIcon';

interface SearchBarProps {
    query: string;
    onQueryChange: (value: string) => void;
    onSearch: (e: React.FormEvent) => void;
    placeholder?: string;
    className?: string;
    isLoading?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
    query,
    onQueryChange,
    onSearch,
    placeholder = "What can I help you find...",
    className = '',
    isLoading = false
}) => {
    return (
        <form className={`search-bar-form ${className}`} onSubmit={onSearch}>
            <div className="search-bar-wrapper">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => onQueryChange(e.target.value)}
                    placeholder={placeholder}
                    className="search-bar-input"
                    disabled={isLoading}
                />
                <button type="submit" className="search-bar-button" aria-label="Search" disabled={isLoading}>
                    {isLoading ? <LoadingSpinnerIcon /> : <SearchIcon />}
                </button>
            </div>
        </form>
    );
};

export default SearchBar;