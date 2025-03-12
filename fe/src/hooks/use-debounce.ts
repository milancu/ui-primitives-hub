// src/hooks/useDebounce.ts
import { useEffect, useCallback, useRef } from "react";

export function useDebounce<T extends (...args: any[]) => void>(
  callback: T,
  delay: number,
): (...args: Parameters<T>) => void {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const callbackRef = useRef(callback);
  const isMountedRef = useRef(true);

  // Aktualizace callbacku při změně
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Cleanup efekt pro unmount
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      clearTimeout(timeoutRef.current!);
    };
  }, []);

  return useCallback(
    (...args: Parameters<T>) => {
      clearTimeout(timeoutRef.current!);

      timeoutRef.current = setTimeout(() => {
        if (isMountedRef.current) {
          callbackRef.current(...args);
        }
      }, delay);
    },
    [delay],
  );
}
