import { type PlayerId } from "rune-sdk";
import type { Player, PlayerScore } from "../../../../interfaces";

interface GetPlayersScore {
  players: Player[];
  yourPlayerId: PlayerId;
}

/**
 * Para establecer la posición de los players en el score...
 * @param param0
 * @returns
 */
export const getPlayersScore = ({
  players = [],
  yourPlayerId,
}: GetPlayersScore) => {
  /**
   * Se extrae la información del player que contiene el nombre y el avatar
   */
  const playersScore: PlayerScore[] = players.map(
    ({ playerID, color, score }) => {
      const playerInfo = Rune.getPlayerInfo(playerID);

      return {
        ...playerInfo,
        displayName: playerID === yourPlayerId ? "You" : playerInfo.displayName,
        score,
        color,
      };
    }
  );

  /**
   * Se establece el orden en el cual se renderizará
   */
  const order = playersScore[0].playerId === yourPlayerId ? [0, 1] : [1, 0];

  /**
   * Se devuleve la información a ser renderizada
   */
  return order.map((indice) => playersScore[indice]);
};
