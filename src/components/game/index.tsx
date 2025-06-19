import { GameWrapper, Grid } from "./components";
import type { GameState, ISelectLine } from "../../interfaces";

import { useEffect, useState } from "react";
import { PlayerId } from "rune-sdk";
// import { EBoardColor } from "../../utils/constants";

const Game = () => {
  const [game, setGame] = useState<GameState>();
  const [yourPlayerId, setYourPlayerId] = useState<PlayerId | undefined>();
  // const [localState, setLocaState] = useState<IUIElement[]>([]);

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
          console.log(game.uiElement);
          // setLocaState(game.uiElement);
        }

        console.log("game");
        console.log(game);
        // console.log({ isNewGame });

        // if (action && action.name === "claimCell") selectSound.play()
      },
    });
  }, []);

  // useEffect

  if (!game) {
    // Rune only shows your game after an onChange() so no need for loading screen
    return;
  }

  console.log(yourPlayerId);

  const handleSelect = (line: ISelectLine) => {
    Rune.actions.onSelectLine(line);
  };

  // currentColor={EBoardColor.RED}
  return (
    <GameWrapper>
      <Grid handleSelect={handleSelect} />
    </GameWrapper>
  );
};

export default Game;
