// src/hooks/useDebounce.ts
import { useEffect, useCallback, useRef } from "react";

export function useDebounce<T extends (...args: any[]) => void>(
  callback: T,
  delay: number,
): (...args: Parameters<T>) => void {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const savedCallback = useRef(callback);
  const latestArgs = useRef<Parameters<T>>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current!);
    };
  }, []);

  return useCallback(
    (...args: Parameters<T>) => {
      latestArgs.current = args;
      clearTimeout(timeoutRef.current!);

      timeoutRef.current = setTimeout(() => {
        if (latestArgs.current) {
          savedCallback.current(...latestArgs.current);
        }
      }, delay);
    },
    [delay]
  );
}