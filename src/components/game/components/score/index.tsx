import "./styles.css";
import { getPlayersScore } from "./helpers";
import { TIME_INTERVAL_CHRONOMETER } from "../../../../utils/constants";
import { type PlayerId } from "rune-sdk";
import { useEffect, useState } from "react";
import { useInterval } from "../../../../hooks";
import type { IBackgroud, Player, PlayerScore } from "../../../../interfaces";

interface RenderPlayerProps {
  player: PlayerScore;
  turnID: PlayerId;
}

const RenderPlayer = ({ player, turnID }: RenderPlayerProps) => (
  <div
    className={`game-score-profile ${turnID === player.playerId ? player.color.toLowerCase() : ""}`}
  >
    <img
      src={player.avatarUrl}
      alt={player.displayName}
      title={player.displayName}
    />
  </div>
);

interface ScoreProps {
  players: Player[];
  yourPlayerId: PlayerId;
  turnID: PlayerId;
  hasTurn: boolean;
  startTimer: boolean;
  currentColor: IBackgroud;
  handleInterval: () => void;
}

const Score = ({
  players,
  yourPlayerId,
  turnID,
  hasTurn,
  startTimer = false,
  currentColor,
  handleInterval,
}: ScoreProps) => {
  /**
   * Para el cronometro del turno
   */
  const [countdown, setCountdown] = useState({
    progress: 1,
    isRunning: false,
  });

  /**
   * Efecto que escucha si se indica que se ejecute el timer desde un elemento padre...
   */
  useEffect(
    () => setCountdown({ isRunning: startTimer, progress: 100 }),
    [startTimer]
  );

  /**
   * Ejecuta el cronomentro...
   */
  useInterval(
    () => {
      const newProgress = countdown.progress - 1;

      setCountdown({ ...countdown, progress: newProgress });

      // console.log({ turnID, yourPlayerId, newProgress });

      if (newProgress === 0) {
        /**
         * Se detiene el counter...
         */
        setCountdown({ ...countdown, isRunning: false });

        /**
         * Se Indica al componente padre que el tiempo ha terminado...
         */
        handleInterval();
      }
    },
    countdown.isRunning ? TIME_INTERVAL_CHRONOMETER : null
  );

  const timerStyle = {
    "--timer-progress": `${countdown.progress}% 100%`,
    "--timer-position": hasTurn ? "100% 0" : "0 0",
  } as React.CSSProperties;

  const playersScore = getPlayersScore({ players, yourPlayerId });

  return (
    <div className="game-score">
      <div className="game-score-container">
        <div
          className={`game-score-progress ${currentColor.toLowerCase()}`}
          style={timerStyle}
        >
          <div className="game-score-progress-item">
            <RenderPlayer player={playersScore[0]} turnID={turnID} />
            <div
              className={`game-score-value ${playersScore[0].color.toLowerCase()}`}
            >
              {playersScore[0].score}
            </div>
            <span className="game-score-dot" />
            <div
              className={`game-score-value ${playersScore[1].color.toLowerCase()}`}
            >
              {playersScore[1].score}
            </div>
            <RenderPlayer player={playersScore[1]} turnID={turnID} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Score;
