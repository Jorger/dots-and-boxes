import { getCurrentColor } from "./helpers";
import { PlayerId } from "rune-sdk";
import { useEffect, useState } from "react";
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
  TBoardColor,
} from "../../interfaces";

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
  // const [uiInteractions, setUi] = useState<IUInteractions>(INITIAL_UI_INTERACTIONS);

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
          console.log("SE HA SELECCIONADO DEL USUARIO");
        }

        console.log("game");
        console.log(game);
        // console.log({ isNewGame });

        // if (action && action.name === "claimCell") selectSound.play()
      },
    });
  }, []);

  if (!game) {
    // Rune only shows your game after an onChange() so no need for loading screen
    return;
  }

  console.log(yourPlayerId);

  const handleSelect = (line: ISelectLine) => {
    if (hasTurn && !isGameOver) {
      Rune.actions.onSelectLine(line);
    }
  };

  // TODO: validar el color "INITIAL", cuando este el counter
  const currentColor: IBackgroud = getCurrentColor({
    players: game.players,
    turnID: game.turnID,
  });

  return (
    <GameWrapper currentColor={currentColor} disableUI={!hasTurn}>
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
