import {
  BOARD_SIZE,
  EBoardColor,
  ELineState,
  ETypeLine,
} from "./utils/constants";
import type {
  ChangeGameState,
  GameState,
  IKeyValue,
  Player,
  TTypeLine,
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
    isGameOver: false,
    lines: {
      [ETypeLine.HORIZONTAL]: {},
      [ETypeLine.VERTICAL]: {},
    },
  };
};

const changeGameState = ({
  line,
  game,
  playerId,
  allPlayerIds,
}: ChangeGameState) => {
  const { type, row, col } = line;
  const inRange = lineInRange(row) && lineInRange(col);

  if (!inRange) {
    throw Rune.invalidAction();
  }

  /**
   * El jugador que está haciendo el proceso
   */
  const player = game.players.find((v) => v.playerID === playerId);
  // Traer las celdas del jugador contrario...
  const currentIndex = allPlayerIds.findIndex((v) => v === playerId);

  if (!player) {
    throw Rune.invalidAction();
  }

  /**
   * Deterina si el usaurio logró completar una caja/box
   */
  let completeBox = false;

  /**
   * Los elementos que ya había sido completados se establece ahora su estado
   * de tipo commit en true, para así indicar que no es de animación...
   */
  // Para las líneas...
  for (const key in game.lines) {
    /**
     * Se castea el tipo ya que key es de tipo string
     */
    const keyDirection = key as TTypeLine;

    /**
     * Se extrae el listado de líneas asociadas al tipo de línea...
     */
    const lines = game.lines[keyDirection];

    /**
     * Se iteran cada una de las líneas, pero sólo
     * las que estén con isCommit false, luego se establece
     * que si es true para que en el ui se establezca
     */
    Object.keys(lines)
      .filter((key) => !lines[key as IKeyValue].isCommit)
      .forEach((key) => {
        game.lines[keyDirection][key as IKeyValue].state = ELineState.COMPLETED;
        game.lines[keyDirection][key as IKeyValue].isCommit = true;
      });
  }

  // Para las cajas/Boxes, se revisa que ya esté complete, además que no se le haya
  // hecho commit en el UI
  Object.keys(game.boxes)
    .filter(
      (key) =>
        game.boxes[key as IKeyValue].isComplete &&
        !game.boxes[key as IKeyValue].isCommit
    )
    .forEach((key) => (game.boxes[key as IKeyValue].isCommit = true));

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
    state: ELineState.SELECTED,
    color,
    isCommit: false,
    delay: 0,
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
        delay: 0,
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
      // TODO: debe validarse cuandos e hacen varias cajas...
      completeBox = true;
    }
  }

  if (!completeBox) {
    const nextTurnID = allPlayerIds[currentIndex === 0 ? 1 : 0];
    game.turnID = nextTurnID;
  }

  /**
   * Generar la data que se enviará para el UI
   */

  // TODO; Por el momento uno
  // const uiElement: IUIElement[] = [];

  // uiElement.push({
  //   type,
  //   row,
  //   col,
  //   color,
  //   boxesComplete: indices.filter(
  //     (box) => game.boxes[`${box.row}-${box.col}`].isComplete
  //   ),
  // });

  // game.uiElement = uiElement;

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
    onSelectLine: (line, { game, playerId, allPlayerIds }) =>
      changeGameState({ line, game, playerId, allPlayerIds }),
  },
});
