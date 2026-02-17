import { useEffect, useRef, useState } from "react";

/**
 * Triggers a one-time "reveal" when the element enters the viewport.
 * Use with class "reveal-in-view" and add that class when visible is true.
 */
export function useScrollReveal(threshold = 0.1, rootMargin = "0px 0px -40px 0px") {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold, rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, visible };
}
