import "./styles.css";
import { EBoardColor } from "../../../../utils/constants";
import type { TBoardColor } from "../../../../interfaces";

interface ShowTurnProps {
  currentColor: TBoardColor;
}

const ShowTurn = ({ currentColor = EBoardColor.BLUE }: ShowTurnProps) => (
  <div className="game-turn">
    <div className={`game-turn-label ${currentColor.toLowerCase()}`}>
      Your turn
    </div>
  </div>
);

export default ShowTurn;
