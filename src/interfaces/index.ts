import { EBoardColor, ELineState, ETypeLine } from "../utils/constants";
import { PlayerId, RuneClient } from "rune-sdk";

export type TTypeLine = keyof typeof ETypeLine;
export type TLineState = keyof typeof ELineState;
export type TBoardColor = keyof typeof EBoardColor;
export type IKeyValue = `${number}-${number}`;

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
}

export interface IBoxLine {
  isComplete: boolean;
  color?: TBoardColor;
}

export type TPositions = Record<TTypeLine, IBaseLine[]>;

export interface IValueBoxes {
  counter: number;
  color?: TBoardColor;
  isComplete: boolean;
  // Para saber si ya se renderizó en la ui
  isCommit: boolean;
}

export type TStateBoxes = Record<IKeyValue, IValueBoxes>;

export interface IValueSelectedLines {
  state: TLineState;
  color: TBoardColor;
  // Por defecto sería false, luego cuando se hace otro evento se pasa a true
  // y de esta manera se sabe que cuando se renderice se debe tomar este valor
  // y no el de uiElement
  isCommit: boolean;
}

export type TSelectedLines = Record<IKeyValue, IValueSelectedLines>;

// Para el estado de las líneas seleccionas en el estado..
export type TStateLines = Record<TTypeLine, TSelectedLines>;

export interface Player {
  playerID: PlayerId;
  color: TBoardColor;
}

export interface IUIElement extends ISelectLine {
  color: TBoardColor;
  boxesComplete: IIndicesMatrix[];
}

export type GameActions = {
  onSelectLine: (line: ISelectLine) => void;
};

export interface GameState {
  playerIds: PlayerId[];
  players: Player[];
  turnID: PlayerId;
  boxes: TStateBoxes;
  lines: TStateLines;
  // devuelve lo que se renderizará en el UI
  uiElement: IUIElement[];
}

export interface ChangeGameState {
  line: ISelectLine;
  game: GameState;
  playerId: PlayerId;
}

export interface IRenderUILine extends ISelectLine {
  color: TBoardColor;
}

export interface IRenderUIBox extends IIndicesMatrix {
  color: TBoardColor;
}

export interface IRenderui {
  line: IRenderUILine;
  boxes: IRenderUIBox;
}

declare global {
  const Rune: RuneClient<GameState, GameActions>;
}

// const test: TStateLines = {
//   HORIZONTAL: {
//     "2-4": {
//       state: "ACTIVE",
//       color: "BLUE",
//     },
//   },
//   VERTICAL: {
//     "4-5": {
//       state: "COMPLETED",
//       color: "BLUE",
//     },
//   },
// };

// export type TSelectedLines

// const row = 2;
// const col = 3;

// const test: TBoxes = {
//   [`${row}-${col}`]: {
//     counter: 0,
//     color: "BLUE",
//     isComplete: false,
//   },
// };

// console.log(test);
