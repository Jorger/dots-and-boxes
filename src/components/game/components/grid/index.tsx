import "./styles.css";
import { ELineState } from "../../../../utils/constants";
import { Line } from "..";
import { POSITIONS } from "../../../../utils/calculatePositionsLines";
import type { ISelectLine, TTypeLine } from "../../../../interfaces";

interface GridProps {
  handleSelect: (data: ISelectLine) => void;
}

// box={{ isComplete: true, color: "RED" }}
// lineColor="RED"
const Grid = ({ handleSelect }: GridProps) => (
  <div className="game-grid">
    {Object.keys(POSITIONS).map((type) =>
      POSITIONS[type as TTypeLine].map((data) => {
        // TODO: validar state, lineColor, box
        return (
          <Line
            key={`${type}-${data.row}-${data.col}`}
            type={type as TTypeLine}
            baseLine={data}
            state={ELineState.ACTIVE}
            handleSelect={handleSelect}
          />
        );
      })
    )}
  </div>
);

export default Grid;
