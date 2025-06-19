import { BOARD_SIZE, EBoardColor, ELineState } from "./utils/constants";
import type {
  ChangeGameState,
  GameState,
  IKeyValue,
  IUIElement,
  Player,
} from "./interfaces";
import { calculateIndicesMatrix } from "./utils/calculateIndicesMatrix";

/**
 * Genera un valor aleatorio dado un rango
 * @param min
 * @param max
 * @returns
 */
const randomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * Validar si el valor de la línea está dentro del rango de las líneas
 * @param index
 * @returns
 */
const lineInRange = (index = 0) => index >= 0 && index <= BOARD_SIZE;

/**
 * Genera la data inicial del juego
 * @param allPlayerIds
 * @returns
 */
const getPlayerData = (allPlayerIds: string[]): GameState => {
  const players: Player[] = [];
  const initialColor = randomNumber(0, 1);
  const colorPlayer1 = initialColor === 0 ? EBoardColor.BLUE : EBoardColor.RED;
  const colorPlayer2 = initialColor === 0 ? EBoardColor.RED : EBoardColor.BLUE;

  players.push(
    {
      playerID: allPlayerIds[0],
      color: colorPlayer1,
    },
    {
      playerID: allPlayerIds[1],
      color: colorPlayer2,
    }
  );

  const turnNumber = randomNumber(0, 1);
  const turnID = allPlayerIds[turnNumber];

  return {
    playerIds: allPlayerIds,
    players,
    turnID,
    boxes: {},
    lines: {
      HORIZONTAL: {},
      VERTICAL: {},
    },
    uiElement: [],
  };
};

const changeGameState = ({ line, game, playerId }: ChangeGameState) => {
  const { type, row, col } = line;
  const inRange = lineInRange(row) && lineInRange(col);

  if (!inRange) {
    throw Rune.invalidAction();
  }

  /**
   * El jugador que está haciendo el proceso
   */
  const player = game.players.find((v) => v.playerID === playerId);

  if (!player) {
    throw Rune.invalidAction();
  }

  /**
   * Se extrae el color del jugador que hizo la jugada
   */
  const color = player.color;

  /**
   * Se genera el key de la línea para así ser almacenada
   */
  const keyLine: IKeyValue = `${row}-${col}`;

  /**
   * Se activa la línea...
   */
  game.lines[type][keyLine] = {
    state: ELineState.ACTIVE,
    color,
    isCommit: false,
  };

  /**
   * Obtener los índices de las cajas que están relacionadas a las línea seleccionada
   */
  const indices = calculateIndicesMatrix(row, col, type);

  /**
   * Se iteran las cajas que estén relacionadas a la línea seleccionada...
   */
  for (const { row: boxRow, col: boxCol } of indices) {
    const keyBox: IKeyValue = `${boxRow}-${boxCol}`;

    /**
     * No existe la caja/box, así que se crea
     */
    if (!game.boxes[keyBox]) {
      game.boxes[keyBox] = {
        counter: 0,
        isComplete: false,
        isCommit: false,
      };
    }

    /**
     * Se incrementa el valor de líneas seleccionadas
     */
    game.boxes[keyBox].counter++;

    /**
     * Se ha completado la caja
     */
    if (game.boxes[keyBox].counter === 4) {
      game.boxes[keyBox].color = color;
      game.boxes[keyBox].isComplete = true;
    }
  }

  /**
   * Generar la data que se enviará para el UI
   */

  // TODO; Por el momento uno
  const uiElement: IUIElement[] = [];

  uiElement.push({
    type,
    row,
    col,
    color,
    boxesComplete: indices.filter(
      (box) => game.boxes[`${box.row}-${box.col}`].isComplete
    ),
  });

  game.uiElement = uiElement;

  // type: TTypeLine;
  //   row: number;
  //   col: number;

  // export interface IUIElement extends ISelectLine {
  //   color: TBoardColor;
  //   indices?: IIndicesMatrix[];
  // }

  // console.log("changeGameState");
  console.log("indices: ", indices);
  // console.log(JSON.parse(JSON.stringify(game)));
  // console.log({ type, row, col, playerId });
};

Rune.initLogic({
  minPlayers: 2,
  maxPlayers: 2,
  setup: (allPlayerIds) => getPlayerData(allPlayerIds),
  actions: {
    onSelectLine: (line, { game, playerId }) => {
      // allPlayerIds
      // console.log("EN onSelectLine");
      // console.log(line);
      // console.log({ game, playerId, allPlayerIds });
      changeGameState({ line, game, playerId });
    },
  },
});
