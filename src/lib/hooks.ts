"use client";

import { useEffect, useRef, useState, useCallback, useSyncExternalStore } from "react";

interface UseIntersectionOptions {
  threshold?: number | number[];
  rootMargin?: string;
  root?: Element | null;
  freezeOnceVisible?: boolean;
}

export function useIntersectionObserver(
  options: UseIntersectionOptions = {}
): [React.RefCallback<Element>, boolean, IntersectionObserverEntry | undefined] {
  const [isVisible, setIsVisible] = useState(false);
  const [entry, setEntry] = useState<IntersectionObserverEntry>();
  const [element, setElement] = useState<Element | null>(null);
  const frozen = useRef(false);

  const ref = useCallback((node: Element | null) => {
    setElement(node);
  }, []);

  useEffect(() => {
    if (!element) return;
    if (frozen.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setEntry(entry);
        setIsVisible(entry.isIntersecting);
        
        if (entry.isIntersecting && options.freezeOnceVisible) {
          frozen.current = true;
          observer.disconnect();
        }
      },
      {
        threshold: options.threshold ?? 0,
        rootMargin: options.rootMargin ?? "0px",
        root: options.root ?? null,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [element, options.threshold, options.rootMargin, options.root, options.freezeOnceVisible]);

  return [ref, isVisible, entry];
}

function getSnapshotMediaQuery(query: string): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia(query).matches;
}

function getServerSnapshotMediaQuery(): boolean {
  return false;
}

export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (callback) => {
      if (typeof window === "undefined") return () => {};
      const mediaQuery = window.matchMedia(query);
      mediaQuery.addEventListener("change", callback);
      return () => mediaQuery.removeEventListener("change", callback);
    },
    () => getSnapshotMediaQuery(query),
    getServerSnapshotMediaQuery
  );
}

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function useThrottle<T>(value: T, limit: number): T {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastRan = useRef<number>(0);

  useEffect(() => {
    const handler = setTimeout(() => {
      const now = Date.now();
      if (now - lastRan.current >= limit) {
        setThrottledValue(value);
        lastRan.current = now;
      }
    }, limit - (Date.now() - lastRan.current));

    return () => {
      clearTimeout(handler);
    };
  }, [value, limit]);

  return throttledValue;
}

function subscribeLocalStorage(): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", () => {});
  return () => {};
}

function getSnapshotLocalStorage<T>(key: string, initialValue: T): T {
  if (typeof window === "undefined") return initialValue;
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  } catch {
    return initialValue;
  }
}

function getServerSnapshotLocalStorage<T>(_key: string, initialValue: T): T {
  return initialValue;
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void, () => void] {
  const [storedValue, setStoredValue] = useState<T>(() => 
    getSnapshotLocalStorage(key, initialValue)
  );

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  const removeValue = useCallback(() => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(key);
      }
      setStoredValue(initialValue);
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  useSyncExternalStore(
    subscribeLocalStorage,
    () => getSnapshotLocalStorage(key, initialValue),
    () => getServerSnapshotLocalStorage(key, initialValue)
  );

  return [storedValue, setValue, removeValue];
}
