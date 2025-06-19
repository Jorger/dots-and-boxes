import { BOARD_SIZE, ETypeLine } from "./constants";
import type { IIndicesMatrix, TTypeLine } from "../interfaces";

export const indexInsideMatrix = (index = 0) =>
  index >= 0 && index <= BOARD_SIZE - 1;

export const calculateIndicesMatrix = (
  row = 0,
  col = 0,
  type: TTypeLine = ETypeLine.HORIZONTAL
) => {
  const indices: IIndicesMatrix[] = [];

  const isVertical = type === ETypeLine.VERTICAL;
  const prevIndex = isVertical ? col - 1 : row - 1;
  const nextIndex = isVertical ? col : row;

  if (indexInsideMatrix(prevIndex)) {
    indices.push(
      isVertical ? { row, col: prevIndex } : { row: prevIndex, col }
    );
  }

  if (indexInsideMatrix(nextIndex)) {
    indices.push({ row, col });
  }

  return indices;
};
