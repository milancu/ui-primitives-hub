import { useEffect, useState } from "react";
import { getItem, setItem } from "@/lib/localStorage.ts";

export function usePersistedState<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const item = getItem(key);
    return (item as T) || initialValue;
  });

  useEffect(() => {
    setItem(key, value);
  }, [value]);

  return [value, setValue] as const;
}
