import { type PlayerId } from "rune-sdk";
import type { IBackgroud, Player } from "../../interfaces";

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
