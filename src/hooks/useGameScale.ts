import { BASE_HEIGHT, BASE_WIDTH } from "../utils/constants";
import { useEffect, useRef, RefObject } from "react";

export function useGameScale(): RefObject<HTMLDivElement> {
  const gameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const applyZoom = () => {
      const gameEl = gameRef.current;
      if (!gameEl) return;

      const zoomX = window.innerWidth / BASE_WIDTH;
      const zoomY = window.innerHeight / BASE_HEIGHT;
      const zoom = Math.min(zoomX, zoomY);

      // Apply zoom directly
      gameEl.style.zoom = `${zoom}`;
    };

    applyZoom();
    window.addEventListener("resize", applyZoom);

    return () => {
      window.removeEventListener("resize", applyZoom);
    };
  }, []);

  return gameRef;
}
