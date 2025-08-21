import { useState, useEffect, useCallback } from 'react';
import { persistence } from '../../../utils/persistence';

const FAVORITES_KEY = 'propertyFavorites';

export const useFavorites = () => {
    const [favorites, setFavorites] = useState<Set<string>>(new Set());
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadFavorites = async () => {
            try {
                const storedFavorites = await persistence.getItem(FAVORITES_KEY);
                if (storedFavorites) {
                    setFavorites(new Set(JSON.parse(storedFavorites)));
                }
            } catch (error) {
                console.error("Failed to load favorites:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadFavorites();
    }, []);

    const toggleFavorite = useCallback(async (id: string) => {
        const newFavorites = new Set(favorites);
        if (newFavorites.has(id)) {
            newFavorites.delete(id);
        } else {
            newFavorites.add(id);
        }
        setFavorites(newFavorites);

        try {
            await persistence.setItem(FAVORITES_KEY, JSON.stringify(Array.from(newFavorites)));
        } catch (error) {
            console.error("Failed to save favorites:", error);
            // Revert state if save fails
            setFavorites(favorites);
        }
    }, [favorites]);

    return { favorites, toggleFavorite, isLoading };
};