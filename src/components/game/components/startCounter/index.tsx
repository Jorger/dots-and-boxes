import "./styles.css";
import { TIME_COUNTDOWN } from "../../../../utils/constants";
import { useInterval } from "../../../../hooks";
import { useState } from "react";

interface StartCounterProps {
  handleEndStartCounter: () => void;
}

const StartCounter = ({ handleEndStartCounter }: StartCounterProps) => {
  /**
   * Contador para iniciar el juego...
   */
  const [counterTimer, setCounterTimer] = useState(3);

  /**
   * Se inicia el intervalo...
   */
  useInterval(
    () => {
      const newValue = counterTimer - 1;
      setCounterTimer(newValue);

      if (newValue < 0) {
        handleEndStartCounter();
      }
    },
    counterTimer >= 0 ? TIME_COUNTDOWN : null
  );

  return (
    <div className="game-counter">
      <span key={counterTimer}>{counterTimer > 0 ? counterTimer : "GO!"}</span>
    </div>
  );
};

export default StartCounter;
