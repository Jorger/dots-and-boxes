import { EBoardColor, ELineState, ETypeLine } from "../utils/constants";
import { PlayerId, RuneClient, Player as PlayerRune } from "rune-sdk";

declare global {
  const Rune: RuneClient<GameState, GameActions>;
}

export type TTypeLine = keyof typeof ETypeLine;
export type TLineState = keyof typeof ELineState;
export type TBoardColor = keyof typeof EBoardColor;
export type IKeyValue = `${number}-${number}`;
export type IBackgroud = TBoardColor | "INITIAL";

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
  delay: number;
  // Para saber si ya se renderizó en la ui
  isCommit?: boolean;
}

export type TPositions = Record<TTypeLine, IBaseLine[]>;

export interface IValueBoxes extends IBoxLine {
  counter: number;
}

export type TStateBoxes = Record<IKeyValue, IValueBoxes>;

export interface IValueSelectedLines {
  state: TLineState;
  color: TBoardColor;
  // Valor para la animación en css
  delay: number;
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
  score: number;
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
  isGameOver: boolean;
  numBoxesCompleted: number;
}

export interface ChangeGameState {
  line: ISelectLine;
  game: GameState;
  playerId: PlayerId;
  allPlayerIds: PlayerId[];
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

export interface PlayerScore extends PlayerRune {
  score: number;
  color: TBoardColor;
}

export interface IUInteractions {
  disableUI: boolean;
  runEffect: boolean;
  delayUI: number;
}
