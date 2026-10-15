"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

type FavoritesContextType = {
  favoriteSlugs: string[];
  hydrated: boolean;
  isFavorite: (slug: string) => boolean;
  toggleFavorite: (slug: string) => void;
  removeFavorite: (slug: string) => void;
  clearFavorites: () => void;
};

const STORAGE_KEY = "ashu-estates-favorites";
const FAVORITES_EVENT = "ashu-estates-favorites-change";

const EMPTY_FAVORITES = "[]";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(FAVORITES_EVENT, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(FAVORITES_EVENT, callback);
  };
}

function getSnapshot() {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? EMPTY_FAVORITES;
  } catch {
    return EMPTY_FAVORITES;
  }
}

function getServerSnapshot() {
  return EMPTY_FAVORITES;
}

function parseFavorites(value: string): string[] {
  try {
    const parsed: unknown = JSON.parse(value);

    if (
      Array.isArray(parsed) &&
      parsed.every((item) => typeof item === "string")
    ) {
      return [...new Set(parsed)];
    }
  } catch {
    // Invalid saved data falls back to an empty list.
  }

  return [];
}

function saveFavorites(slugs: string[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
  } catch {
    console.error("Unable to save favorite properties.");
  }

  window.dispatchEvent(new Event(FAVORITES_EVENT));
}

const FavoritesContext = createContext<
  FavoritesContextType | undefined
>(undefined);

type FavoritesProviderProps = {
  children: ReactNode;
};

export function FavoritesProvider({
  children,
}: FavoritesProviderProps) {
  const savedData = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const hydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const favoriteSlugs = useMemo(
    () => parseFavorites(savedData),
    [savedData],
  );

  const isFavorite = useCallback(
    (slug: string) => favoriteSlugs.includes(slug),
    [favoriteSlugs],
  );

  const toggleFavorite = useCallback((slug: string) => {
    const current = parseFavorites(getSnapshot());

    const updated = current.includes(slug)
      ? current.filter((item) => item !== slug)
      : [...current, slug];

    saveFavorites(updated);
  }, []);

  const removeFavorite = useCallback((slug: string) => {
    const current = parseFavorites(getSnapshot());
    saveFavorites(current.filter((item) => item !== slug));
  }, []);

  const clearFavorites = useCallback(() => {
    saveFavorites([]);
  }, []);

  return (
    <FavoritesContext.Provider
      value={{
        favoriteSlugs,
        hydrated,
        isFavorite,
        toggleFavorite,
        removeFavorite,
        clearFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error(
      "useFavorites must be used within FavoritesProvider.",
    );
  }

  return context;
}