import "./styles.css";
import { getPlayersScore } from "./helpers";
import { Player } from "../../../../interfaces";
import { type PlayerId } from "rune-sdk";

interface RenderPlayerProps {
  displayName: string;
  avatarUrl: string;
}

const RenderPlayer = ({ displayName, avatarUrl }: RenderPlayerProps) => {
  return (
    <div className="game-score-profile">
      <img src={avatarUrl} alt={displayName} title={displayName} />
    </div>
  );
};

interface ScoreProps {
  players: Player[];
  yourPlayerId: PlayerId;
}

// TODO: agregar funcionalidad a este componente
const Score = ({ players, yourPlayerId }: ScoreProps) => {
  const playersScore = getPlayersScore({ players, yourPlayerId });

  return (
    <div className="game-score">
      <div className="game-score-container">
        <div className="game-score-progress">
          <RenderPlayer
            displayName={playersScore[0].displayName}
            avatarUrl={playersScore[0].avatarUrl}
          />
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
          <RenderPlayer
            displayName={playersScore[1].displayName}
            avatarUrl={playersScore[1].avatarUrl}
          />
        </div>
      </div>
    </div>
  );
};

export default Score;
