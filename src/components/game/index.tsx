import { GameWrapper, Grid } from "./components";
import type { ISelectLine } from "../../interfaces";

import { GameState } from "../../logic";
import { useEffect, useState } from "react";
import { PlayerId } from "rune-sdk";

const Game = () => {
  const [game, setGame] = useState<GameState>();
  const [yourPlayerId, setYourPlayerId] = useState<PlayerId | undefined>();

  useEffect(() => {
    Rune.initClient({
      onChange: ({ game, yourPlayerId }) => {
        setGame(game);
        setYourPlayerId(yourPlayerId);

        // console.log("game");
        console.log(game);

        // if (action && action.name === "claimCell") selectSound.play()
      },
    });
  }, []);

  if (!game) {
    // Rune only shows your game after an onChange() so no need for loading screen
    return;
  }

  console.log(yourPlayerId);

  const handleSelect = (data: ISelectLine) => {
    console.log(data);
  };

  return (
    <GameWrapper>
      <Grid handleSelect={handleSelect} />
    </GameWrapper>
  );
};

export default Game;
