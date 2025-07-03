import {
  BASE_HEIGHT,
  BASE_WIDTH,
  TILE_SIZE,
  LINE_SIZE,
  TIME_SCALE_UP,
  TIME_EXPAND_LINE,
} from "./constants";

/**
 * Listado de variables css que se crean a partir de las contantes creadas en JS/TS
 */
document.documentElement.style.setProperty("--base-height", `${BASE_HEIGHT}px`);
document.documentElement.style.setProperty("--base-width", `${BASE_WIDTH}px`);
document.documentElement.style.setProperty("--tile-size", `${TILE_SIZE}px`);
document.documentElement.style.setProperty("--line-size", `${LINE_SIZE}px`);
document.documentElement.style.setProperty(
  "--time-scale-up",
  `${TIME_SCALE_UP}ms`
);
document.documentElement.style.setProperty(
  "--time-expand-line",
  `${TIME_EXPAND_LINE}ms`
);
