import { BOARD_SIZE, ETypeLine } from "../../utils/constants";
import { randomNumber } from "../../utils/randomNumber";
import { type PlayerId } from "rune-sdk";
import type {
  IBackgroud,
  IKeyValue,
  ISelectLine,
  Player,
  TStateLines,
} from "../../interfaces";

interface GetCurrentData {
  players: Player[];
  turnID: PlayerId;
}

/**
 * Devuleve el usuario actual dependiendo del turno...
 * @param param0
 * @returns
 */
export const getCurretPlayer = ({ players = [], turnID }: GetCurrentData) =>
  players.find((v) => v.playerID === turnID);

/**
 * Devuleve el color actual del usuario que está jugando...
 * @param param0
 */
export const getCurrentColor = (data: GetCurrentData) => {
  let currentColor: IBackgroud = "INITIAL";

  /**
   * Se obtiene el jugado atual..
   */
  const currentPlayer = getCurretPlayer(data);

  if (currentPlayer) {
    currentColor = currentPlayer.color;
  }

  return currentColor;
};

/**
 * Generar la selección aleatoria de una línea, útil cuando se acaba el tiempo
 * @param lines
 * @returns
 */
export const generateRandomLine = (lines: TStateLines): ISelectLine | null => {
  const MAX_ATTEMPTS = 500;
  let attempts = 0;

  const line: ISelectLine = {
    type: ETypeLine.HORIZONTAL,
    row: 0,
    col: 0,
  };

  while (attempts < MAX_ATTEMPTS) {
    // Seleccionar el tipo de linea aleatoriemante
    line.type =
      randomNumber(0, 1) === 1 ? ETypeLine.HORIZONTAL : ETypeLine.VERTICAL;

    // Determinar el límite dependiendo del tipo de línea
    const maxRow =
      line.type === ETypeLine.HORIZONTAL ? BOARD_SIZE : BOARD_SIZE - 1;

    const maxCol =
      line.type === ETypeLine.HORIZONTAL ? BOARD_SIZE - 1 : BOARD_SIZE;

    // Generar la posición aleatoria
    line.row = randomNumber(0, maxRow);
    line.col = randomNumber(0, maxCol);

    const keyLine: IKeyValue = `${line.row}-${line.col}`;

    // Si la línea no ha sido seleccionada, se devuelve...
    if (!lines[line.type][keyLine]) {
      return line;
    }

    /**
     * Para evitar que se quede en un ciclo infinito...
     */
    attempts++;
  }

  console.warn("generateRandomLine: Max attempts reached. Board may be full.");
  return null; // Retorna null si no se ha encontrado una línea...
};
