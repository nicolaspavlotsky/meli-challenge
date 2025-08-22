import { useEffect, useState, useCallback, useRef } from "react";

// Hook I made to get window size (width actually) for responsive parts.
// I also debounce the resize event to 200ms for performance reasons.
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleResize = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setWindowSize(window.innerWidth);
    }, 200);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [handleResize]);

  return windowSize;
};

export default useWindowSize;
