import { BOARD_SIZE, ETypeLine } from "./constants";
import type { IIndicesMatrix, ISelectLine, TTypeLine } from "../interfaces";

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

/**
 * Dada la posición de la matriz, devuelve las líneas que lo conforman
 * @param row
 * @param col
 */
export const calculateLinesMatrix = (row = 0, col = 0) => {
  const top: ISelectLine = {
    row,
    col,
    type: ETypeLine.HORIZONTAL,
  };

  const bottom: ISelectLine = {
    row: row + 1,
    col,
    type: ETypeLine.HORIZONTAL,
  };

  const left: ISelectLine = {
    row,
    col,
    type: ETypeLine.VERTICAL,
  };

  const right: ISelectLine = {
    row,
    col: col + 1,
    type: ETypeLine.VERTICAL,
  };

  return [top, bottom, left, right];
};
