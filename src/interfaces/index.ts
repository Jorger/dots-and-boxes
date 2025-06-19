import { EBoardColor, ELineState, ETypeLine } from "../utils/constants";

export type TTypeLine = keyof typeof ETypeLine;
export type TLineState = keyof typeof ELineState;
export type TBoardColor = keyof typeof EBoardColor;

export interface IBaseLine {
  row: number;
  col: number;
  left: number;
  top: number;
}

export interface IIndicesMatrix {
  row: number;
  col: number;
}

export interface ISelectLine {
  type: TTypeLine;
  row: number;
  col: number;
  indices: IIndicesMatrix[];
}

export interface IBoxLine {
  isComplete: boolean;
  color?: TBoardColor;
}

export type TPositions = Record<TTypeLine, IBaseLine[]>;
