import { clsx, type ClassValue } from "clsx";
import { useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function useHighlightRerender(color: string) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.classList.add(color);
      const timeout = setTimeout(() => {
        ref.current?.classList.remove(color);
      }, 500);

      return () => clearTimeout(timeout);
    }
  });

  return ref;
}
