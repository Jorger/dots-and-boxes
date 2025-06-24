import { COMBINED_DELAY, INITIAL_UI_INTERACTIONS } from "../../utils/constants";
import { getCurrentColor } from "./helpers";
import { PlayerId } from "rune-sdk";
import { useCallback, useEffect, useState } from "react";
import { useWait } from "../../hooks";
import {
  GameWrapper,
  Grid,
  OpponentThinks,
  Score,
  ShowTurn,
  StartCounter,
} from "./components";
import type {
  GameState,
  IBackgroud,
  ISelectLine,
  IUInteractions,
  TBoardColor,
} from "../../interfaces";

const Game = () => {
  /**
   * Guarda el estado del juego (proviene de RUNE)
   */
  const [game, setGame] = useState<GameState>();

  /**
   * Guarda el id del juegador actual de cada sesión...
   */
  const [yourPlayerId, setYourPlayerId] = useState<PlayerId | undefined>();

  /**
   * Para las acciones relacionadas al UI
   */
  const [uiInteractions, setUiInteractions] = useState<IUInteractions>(
    INITIAL_UI_INTERACTIONS
  );

  /**
   * Se cálcula el ID del usuario que tien el turno
   */
  const turnID = game?.turnID || "";

  /**
   * Se indica si el usuario tiene el turno...
   */
  const hasTurn = yourPlayerId === turnID;

  /**
   * Determinar si el juego ha terminado...
   */
  const isGameOver = game?.isGameOver || false;

  /**
   * Efecto que escucha cuando hay cambios en el estado del juego,
   * eventos que vienen del server.
   */
  useEffect(() => {
    Rune.initClient({
      onChange: ({ game, action, yourPlayerId, event }) => {
        /**
         * Determina si se ha reiniciando el juego
         */
        const isNewGame = (event?.name || "") === "stateSync";

        /**
         * Se guarda el estado del juego que proviene del servicio...
         */
        setGame(game);

        /**
         * Indica que es evento inicial cuando inicia el juego
         */
        if (!action) {
          setYourPlayerId(yourPlayerId);
        }

        /**
         * Reiniciar los estados del juego...
         */
        if (isNewGame) {
          setUiInteractions(INITIAL_UI_INTERACTIONS);
        }

        if (action?.name === "onSelectLine") {
          if (game.numBoxesCompleted >= 1) {
            // Se establece el usewait
            const delayUI = COMBINED_DELAY * game.numBoxesCompleted;
            setUiInteractions({
              showCounter: false,
              runEffect: true,
              delayUI,
              disableUI: true,
              isGameOver: game.isGameOver,
            });
          } else {
            setUiInteractions({
              ...INITIAL_UI_INTERACTIONS,
              disableUI: false,
              showCounter: false,
            });
          }
        }
      },
    });
  }, []);

  useWait(
    uiInteractions.runEffect,
    uiInteractions.delayUI,
    // Se usa el useCallback para evitar que la función se genere cada vez que renderiza el componente...
    useCallback(
      () =>
        setUiInteractions((current) => {
          /**
           * Se muestra el modal de game over
           */
          if (current.isGameOver) {
            Rune.showGameOverPopUp();
          }

          return { ...current, disableUI: false };
        }),
      []
    )
  );

  if (!game) {
    // Rune only shows your game after an onChange() so no need for loading screen
    return;
  }

  /**
   * Función que se ejecuta cuando un usuario ha seleccionado una línea,
   * siempre y cuand tenga el turno...
   * @param line 
   */
  const handleSelect = (line: ISelectLine) => {
    if (hasTurn && !isGameOver) {
      setUiInteractions({ ...uiInteractions, disableUI: true });
      Rune.actions.onSelectLine(line);
    }
  };

  /**
   * Función que se ejecuta, una vez se ha terminado el conteo inicial del juego
   */
  const handleEndStartCounter = () => {
    setUiInteractions({ ...uiInteractions, showCounter: false });
  };

  const { showCounter } = uiInteractions;

  // Si se muestra el contador, el color que queda en este caso
  // es el color inicial de fondo
  const currentColor: IBackgroud = showCounter
    ? "INITIAL"
    : getCurrentColor({
        players: game.players,
        turnID: game.turnID,
      });

  /**
   * Desabilita el ui si el estado indica que es así, o si el el usuario no tiene
   * el turno, además si es game over
   */
  const disableUI = uiInteractions.disableUI || !hasTurn || isGameOver;

  return (
    <GameWrapper currentColor={currentColor} disableUI={disableUI}>
      {showCounter && (
        <StartCounter handleEndStartCounter={handleEndStartCounter} />
      )}
      <Score players={game.players} yourPlayerId={yourPlayerId || ""} />
      {!showCounter && !hasTurn && (
        <OpponentThinks currentColor={currentColor as TBoardColor} />
      )}
      <Grid handleSelect={handleSelect} boxes={game.boxes} lines={game.lines} />
      {!showCounter && hasTurn && (
        <ShowTurn currentColor={currentColor as TBoardColor} />
      )}
    </GameWrapper>
  );
};

export default Game;
