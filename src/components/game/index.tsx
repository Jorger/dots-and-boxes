import { getCurrentColor } from "./helpers";
import { PlayerId } from "rune-sdk";
import { useCallback, useEffect, useState } from "react";
import {
  GameWrapper,
  Grid,
  OpponentThinks,
  Score,
  ShowTurn,
} from "./components";
import type {
  GameState,
  IBackgroud,
  ISelectLine,
  IUInteractions,
  TBoardColor,
} from "../../interfaces";
import { useWait } from "../../hooks";
import { COMBINED_DELAY, INITIAL_UI_INTERACTIONS } from "../../utils/constants";

// IUInteractions
// import { INITIAL_UI_INTERACTIONS } from "../../utils/constants";
// import { EBoardColor } from "../../utils/constants";

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
      onChange: ({ game, action, yourPlayerId }) => {
        /**
         * Determina si se ha reiniciando el juego
         */
        // event
        // const isNewGame = (event?.name || "") === "stateSync";

        setGame(game);

        if (!action) {
          setYourPlayerId(yourPlayerId);
        }

        if (action?.name === "onSelectLine") {
          // console.log("SE HA SELECCIONADO DEL USUARIO", game.numBoxesCompleted);

          if (game.numBoxesCompleted >= 1) {
            // Se establece el usewait
            const delayUI = COMBINED_DELAY * game.numBoxesCompleted;
            // console.log({ yourPlayerId, delayUI });
            setUiInteractions({
              runEffect: true,
              delayUI,
              disableUI: true,
            });
          } else {
            // console.log("INGRESA ACÁ POR QUE NO HIZO CAJA");
            setUiInteractions({ ...INITIAL_UI_INTERACTIONS, disableUI: false });
          }
        }

        console.log("game");
        console.log(game);
        // console.log({ isNewGame });

        // if (action && action.name === "claimCell") selectSound.play()
      },
    });
  }, []);

  useWait(
    uiInteractions.runEffect,
    uiInteractions.delayUI,
    // Se usa el useCallback para evitar que la función se genere cada vez que renderiza el componente...
    useCallback(
      () => setUiInteractions({ ...INITIAL_UI_INTERACTIONS, disableUI: false }),
      []
    )
  );

  if (!game) {
    // Rune only shows your game after an onChange() so no need for loading screen
    return;
  }

  // console.log(yourPlayerId);

  const handleSelect = (line: ISelectLine) => {
    if (hasTurn && !isGameOver) {
      setUiInteractions({ ...INITIAL_UI_INTERACTIONS, disableUI: true });
      Rune.actions.onSelectLine(line);
    }
  };

  // TODO: validar el color "INITIAL", cuando este el counter
  const currentColor: IBackgroud = getCurrentColor({
    players: game.players,
    turnID: game.turnID,
  });

  /**
   * Desabilita el ui si el estado indica que es así, o si el el usuario no tiene
   * el turno, además si es game over
   */
  const disableUI = uiInteractions.disableUI || !hasTurn || isGameOver;

  // console.log({ yourPlayerId, disableUI });

  return (
    <GameWrapper currentColor={currentColor} disableUI={disableUI}>
      <Score players={game.players} yourPlayerId={yourPlayerId || ""} />
      {!hasTurn && (
        <OpponentThinks currentColor={currentColor as TBoardColor} />
      )}
      <Grid handleSelect={handleSelect} boxes={game.boxes} lines={game.lines} />
      {hasTurn && <ShowTurn currentColor={currentColor as TBoardColor} />}
    </GameWrapper>
  );
};

export default Game;
