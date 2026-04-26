// useLocalStorage.ts
import { useState, useEffect } from "react";

// Generic function to get value from localStorage
function getLocalValue<T>(key: string, initValue: T): T {
  if (typeof window === "undefined") return initValue; // SSR check

  const storedValue = localStorage.getItem(key);
  if (storedValue !== null) {
    try {
      return JSON.parse(storedValue) as T;
    } catch {
      return initValue;
    }
  }

  // If initValue is a function, call it
  if (typeof initValue === "function") {
    return (initValue as () => T)();
  }

  return initValue;
}

// Generic hook
function useLocalStorage<T>(key: string, initValue: T) {
  const [value, setValue] = useState<T>(() => getLocalValue(key, initValue));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const; // Return a typed tuple
}

export default useLocalStorage;
