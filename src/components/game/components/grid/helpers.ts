import {
  EBoardColor,
  ELineState,
  ETypeLine,
} from "../../../../utils/constants";
import { indexInsideMatrix } from "../../../../utils/calculateIndicesMatrix";
import type {
  IBoxLine,
  IKeyValue,
  TBoardColor,
  TLineState,
  TStateBoxes,
  TStateLines,
  TTypeLine,
} from "../../../../interfaces";

interface CalculateExtraProps {
  typeLine: TTypeLine;
  lines: TStateLines;
  boxes: TStateBoxes;
  row: number;
  col: number;
}

/**
 * Calcula los props que pueden cambiar para las líneas, en base a la información
 * de las líneas y las cajas...
 * @param param0
 * @returns
 */
export const calculateExtraProps = ({
  typeLine,
  lines,
  boxes,
  row,
  col,
}: CalculateExtraProps) => {
  let state: TLineState = ELineState.ACTIVE;
  let lineColor: TBoardColor = EBoardColor.BLUE;
  let box: IBoxLine | undefined = undefined;
  const keyLine: IKeyValue = `${row}-${col}`;
  let lineDelay = 0;

  /**
   * Si existe una línea se obtiene el estado y el color de la misma...
   */
  if (lines[typeLine][keyLine]) {
    state = lines[typeLine][keyLine].state;
    lineColor = lines[typeLine][keyLine].color;
    lineDelay = lines[typeLine][keyLine].delay;
  }

  /**
   * Se valida si se ha completado una caja/box
   */
  if (
    typeLine === ETypeLine.VERTICAL &&
    indexInsideMatrix(col) &&
    boxes[keyLine]?.isComplete
  ) {
    box = boxes[keyLine];
  }

  return { state, lineColor, box, lineDelay };
};
