import { BASE_X, BOARD_SIZE, LINE_SIZE, OFFSET, TILE_SIZE } from "./constants";
import type { IBaseLine, TPositions } from "../interfaces";

const calculateVerticalLines = (): IBaseLine[] => {
  return new Array(BOARD_SIZE)
    .fill(null)
    .map((_, row) => {
      return new Array(BOARD_SIZE + 1).fill(null).map((_, col) => ({
        row,
        col,
        left: BASE_X + (TILE_SIZE + LINE_SIZE) * col - OFFSET,
        top: BASE_X + TILE_SIZE * row + LINE_SIZE * (row + 1),
      }));
    })
    .flat();
};

const calculateHorizontalLines = (): IBaseLine[] => {
  return new Array(6)
    .fill(null)
    .map((_, row) => {
      return new Array(5).fill(null).map((_, col) => ({
        row,
        col,
        left: BASE_X + (TILE_SIZE + LINE_SIZE) * col + LINE_SIZE,
        top: BASE_X + TILE_SIZE * row + LINE_SIZE * row,
      }));
    })
    .flat();
};

export const POSITIONS: TPositions = {
  VERTICAL: calculateVerticalLines(),
  HORIZONTAL: calculateHorizontalLines(),
};
