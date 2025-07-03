import { IUInteractions } from "../interfaces";

export const BASE_WIDTH = 412;
export const BASE_HEIGHT = 732;
export const BOARD_SIZE = 5;
export const TOTAL_BOXES = BOARD_SIZE ** 2;
export const TILE_SIZE = Math.round(BASE_WIDTH / (BOARD_SIZE + 2));
export const BASE_X = 30;
export const LINE_SIZE = 10;
export const OFFSET = 1;
// En milisegundos
export const TIME_SCALE_UP = 100;
export const TIME_EXPAND_LINE = 150;
export const COMBINED_DELAY = TIME_SCALE_UP + TIME_EXPAND_LINE;
export const TIME_COUNTDOWN = 500;
export const TIME_INTERVAL_CHRONOMETER = 100;

export enum ETypeLine {
  HORIZONTAL = "HORIZONTAL",
  VERTICAL = "VERTICAL",
}

export enum ELineState {
  ACTIVE = "ACTIVE",
  SELECTED = "SELECTED",
  COMPLETED = "COMPLETED",
}

export enum EBoardColor {
  BLUE = "BLUE",
  RED = "RED",
}

export enum EBoardColorWithInitial {
  INITIAL = "INITIAL",
  BLUE = EBoardColor.BLUE,
  RED = EBoardColor.RED,
}

export const INITIAL_UI_INTERACTIONS: IUInteractions = {
  showCounter: true,
  isGameOver: false,
  disableUI: false,
  runEffect: false,
  startTimer: false,
  delayUI: 0,
};

export enum ESounds {
  COUNTER = "COUNTER",
  WHISTLE = "WHISTLE",
  STROKE = "STROKE",
  BOX = "BOX",
}

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
