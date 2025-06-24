import { randomNumber } from "./utils/randomNumber";
import {
  BOARD_SIZE,
  EBoardColor,
  ELineState,
  ETypeLine,
  TOTAL_BOXES,
} from "./utils/constants";
import {
  calculateIndicesMatrix,
  calculateLinesMatrix,
} from "./utils/calculateIndicesMatrix";
import type {
  ChangeGameState,
  GameState,
  IIndicesMatrix,
  IKeyValue,
  Player,
  TBoardColor,
  TTypeLine,
} from "./interfaces";

// TODO: eliminar una vez hecho las validaciones del caso
// import { TEST_DATA } from "./base_data";
// ETypeLine

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
      score: 0,
    },
    {
      playerID: allPlayerIds[1],
      color: colorPlayer2,
      score: 0,
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
    numBoxesCompleted: 0,
    lines: {
      [ETypeLine.HORIZONTAL]: {},
      [ETypeLine.VERTICAL]: {},
    },
  };

  // return {
  //   playerIds: allPlayerIds,
  //   players,
  //   turnID,
  //   boxes: TEST_DATA.boxes,
  //   isGameOver: false,
  //   numBoxesCompleted: 0,
  //   lines: TEST_DATA.lines,
  // };
};

interface ValidateCompleteLines {
  indices: IIndicesMatrix[];
  delay: number;
  color: TBoardColor;
  game: GameState;
}

const validateCompleteLines = ({
  indices,
  delay,
  color,
  game,
}: ValidateCompleteLines) => {
  // Ahora se debe validar las líneas para saber si hay múltiples cajas
  // que se completan
  for (const { row: boxRow, col: boxCol } of indices) {
    const keyBox: IKeyValue = `${boxRow}-${boxCol}`;

    // La caja no está completa
    if (!game.boxes?.[keyBox]?.isComplete) {
      /**
       * Traer lás lineas que componen la caja y además dejar sólo
       * las líneas que no están ocupadas...
       */
      const boxLines = calculateLinesMatrix(boxRow, boxCol).filter(
        ({ row, col, type }) => {
          const keyLine: IKeyValue = `${row}-${col}`;
          return !game.lines[type][keyLine];
        }
      );

      // Se iteran las líneas y se valida si se puede hacer la caja...
      for (const line of boxLines) {
        /**
         * Se obtienen las cajas que pertecen a la línea...
         */
        const newIndices = calculateIndicesMatrix(
          line.row,
          line.col,
          line.type
        );

        const keyLine: IKeyValue = `${line.row}-${line.col}`;

        /**
         * Se iteran cada una de las cajas y se valida si con la línea se completaría
         * una caja
         */
        const lineCompleteBox =
          newIndices.filter(({ row: newBoxRow, col: newBoxCol }) => {
            const keyBox: IKeyValue = `${newBoxRow}-${newBoxCol}`;
            return game.boxes?.[keyBox]?.counter === 3;
          }).length !== 0;

        /**
         * Ahora como se sabe que con la línea se completa una caja, se marca la línea...
         */
        if (lineCompleteBox) {
          /**
           * Se marca la línea..
           */
          game.lines[line.type][keyLine] = {
            state: ELineState.SELECTED,
            color,
            isCommit: false,
            delay,
          };

          /**
           * Se iteran cada una de las cajas...
           */
          for (const { row: newBoxRow, col: newBoxCol } of newIndices) {
            const keyBox: IKeyValue = `${newBoxRow}-${newBoxCol}`;

            if (!game.boxes[keyBox]) {
              game.boxes[keyBox] = {
                counter: 0,
                isComplete: false,
                isCommit: false,
                delay,
              };
            }
            /**
             * Se incrementa el valor de líneas seleccionadas
             */
            game.boxes[keyBox].counter++;

            /**
             * Se valida la caja completada, al menos debe haber una...
             */
            if (game.boxes[keyBox].counter === 4) {
              game.boxes[keyBox].color = color;
              game.boxes[keyBox].isComplete = true;
              game.boxes[keyBox].delay = delay;
            }
          }

          validateCompleteLines({
            indices: newIndices,
            delay: delay + 1,
            color,
            game,
          });
        }
      }
    }
  }
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

  // console.log(indices);

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
      completeBox = true;
    }
  }

  if (completeBox) {
    validateCompleteLines({
      indices,
      color,
      game,
      delay: 1,
    });

    /**
     * Calcular el score...
     */
    for (let i = 0; i < game.players.length; i++) {
      const playerColor = game.players[i].color;
      /**
       * Traer el número de cajas completadas por jugador
       */
      // TODO: tal vez moverlo a una función...
      const score = Object.keys(game.boxes).filter(
        (key) =>
          game.boxes[key as IKeyValue].isComplete &&
          game.boxes[key as IKeyValue].color === playerColor
      ).length;

      /**
       * Se actualiza el nímero de cajas completas por jugador...
       */
      game.players[i].score = score;
    }
  } else {
    const nextTurnID = allPlayerIds[currentIndex === 0 ? 1 : 0];
    game.turnID = nextTurnID;
  }

  /**
   * Valida si se han hecho múltiples cuadrados...
   */
  game.numBoxesCompleted = Object.keys(game.boxes).filter(
    (key) =>
      game.boxes[key as IKeyValue].isComplete &&
      !game.boxes[key as IKeyValue].isCommit
  ).length;

  /**
   * Guarda el total de las cajas que se han completado, útil para saber
   * si es game over...
   */
  const totalBoxesCompleted = game.players[0].score + game.players[1].score;

  // Si el número de cajas que han completado es igual al total de cajas,
  // entonces se indica que es game over...
  game.isGameOver = totalBoxesCompleted === TOTAL_BOXES;

  if (game.isGameOver) {
    /**
     * Determina el ganador y el perdedor
     */
    const indexWinner = game.players[0].score > game.players[1].score ? 0 : 1;
    const winner = game.playerIds[indexWinner];
    const loser = game.playerIds[indexWinner === 0 ? 1 : 0];

    /**
     * Se establece delayPopUp para así poder controlar la visualización
     * del modal de game over
     */
    Rune.gameOver({
      players: {
        [winner]: "WON",
        [loser]: "LOST",
      },
      delayPopUp: true,
    });
  }
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
