
"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

const KEY = "ashu-estates-compare";
const EVENT = "ashu-estates-compare-change";
const EMPTY = "[]";

export const MAX_COMPARE_PROPERTIES = 3;

function getSnapshot() {
  try {
    return localStorage.getItem(KEY) ?? EMPTY;
  } catch {
    return EMPTY;
  }
}

function getServerSnapshot() {
  return EMPTY;
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(EVENT, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(EVENT, callback);
  };
}

function parse(value: string): string[] {
  try {
    const result: unknown = JSON.parse(value);

    if (
      Array.isArray(result) &&
      result.every((item) => typeof item === "string")
    ) {
      return [...new Set(result)].slice(0, MAX_COMPARE_PROPERTIES);
    }
  } catch {
    // Ignore invalid stored data.
  }

  return [];
}

function save(slugs: string[]) {
  try {
    localStorage.setItem(
      KEY,
      JSON.stringify([...new Set(slugs)].slice(0, MAX_COMPARE_PROPERTIES)),
    );
  } catch {
    console.error("Unable to save comparison properties.");
  }

  window.dispatchEvent(new Event(EVENT));
}

type CompareContextType = {
  compareSlugs: string[];
  hydrated: boolean;
  isCompared: (slug: string) => boolean;
  toggleCompare: (slug: string) => void;
  removeCompare: (slug: string) => void;
  clearCompare: () => void;
};

const CompareContext = createContext<CompareContextType | undefined>(
  undefined,
);

export function CompareProvider({ children }: { children: ReactNode }) {
  const stored = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const hydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const compareSlugs = useMemo(() => parse(stored), [stored]);

  const isCompared = useCallback(
    (slug: string) => compareSlugs.includes(slug),
    [compareSlugs],
  );

  const toggleCompare = useCallback((slug: string) => {
    const current = parse(getSnapshot());

    if (current.includes(slug)) {
      save(current.filter((item) => item !== slug));
    } else if (current.length < MAX_COMPARE_PROPERTIES) {
      save([...current, slug]);
    }
  }, []);

  const removeCompare = useCallback((slug: string) => {
    save(parse(getSnapshot()).filter((item) => item !== slug));
  }, []);

  const clearCompare = useCallback(() => save([]), []);

  return (
    <CompareContext.Provider
      value={{
        compareSlugs,
        hydrated,
        isCompared,
        toggleCompare,
        removeCompare,
        clearCompare,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);

  if (!context) {
    throw new Error("useCompare must be used within CompareProvider.");
  }

  return context;
}
