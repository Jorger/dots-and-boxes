import "./styles.css";
import React, { ReactNode } from "react";
import type { TBoardColor } from "../../../../interfaces";
import { EBoardColor } from "../../../../utils/constants";

interface GameWrapperProps {
  currentColor?: TBoardColor;
  children: JSX.Element | JSX.Element[] | ReactNode;
}

const GameWrapper = ({
  currentColor = EBoardColor.BLUE,
  children,
}: GameWrapperProps) => (
  <div className={`game-wrapper ${currentColor.toLowerCase()}`}>{children}</div>
);

export default React.memo(GameWrapper);
