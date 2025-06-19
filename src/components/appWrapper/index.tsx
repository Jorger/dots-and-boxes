import "./styles.css";
import { useGameScale } from "../../hooks";

const AppWrapper = ({ children }: { children: React.ReactNode }) => {
  const gameRef = useGameScale();

  return (
    <div className="container">
      <div className="screen" ref={gameRef}>
        {children}
      </div>
    </div>
  );
};

export default AppWrapper;
