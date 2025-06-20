import type { IBaseLine, TPositions } from "../interfaces";
import {
  BASE_X,
  BOARD_SIZE,
  ETypeLine,
  LINE_SIZE,
  OFFSET,
  TILE_SIZE,
} from "./constants";

const calculateVerticalLines = (): IBaseLine[] =>
  new Array(BOARD_SIZE)
    .fill(null)
    .map((_, row) =>
      new Array(BOARD_SIZE + 1).fill(null).map((_, col) => ({
        row,
        col,
        left: BASE_X + (TILE_SIZE + LINE_SIZE) * col - OFFSET,
        top: BASE_X + TILE_SIZE * row + LINE_SIZE * (row + 1),
      }))
    )
    .flat();

const calculateHorizontalLines = (): IBaseLine[] =>
  new Array(BOARD_SIZE + 1)
    .fill(null)
    .map((_, row) =>
      new Array(BOARD_SIZE).fill(null).map((_, col) => ({
        row,
        col,
        left: BASE_X + (TILE_SIZE + LINE_SIZE) * col + LINE_SIZE,
        top: BASE_X + TILE_SIZE * row + LINE_SIZE * row,
      }))
    )
    .flat();

export const POSITIONS: TPositions = {
  [ETypeLine.VERTICAL]: calculateVerticalLines(),
  [ETypeLine.HORIZONTAL]: calculateHorizontalLines(),
};
