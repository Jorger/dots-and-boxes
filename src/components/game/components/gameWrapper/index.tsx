import "./styles.css";
import React, { ReactNode } from "react";
import type { TBoardColor } from "../../../../interfaces";
import { EBoardColorWithInitial } from "../../../../utils/constants";
// import { EBoardColor } from "../../../../utils/constants";

type IBackgroud = TBoardColor | "INITIAL";

interface GameWrapperProps {
  currentColor?: IBackgroud;
  children: JSX.Element | JSX.Element[] | ReactNode;
}

const GameWrapper = ({
  currentColor = EBoardColorWithInitial.INITIAL,
  children,
}: GameWrapperProps) => (
  <div className={`game-wrapper ${currentColor.toLowerCase()}`}>{children}</div>
);

export default React.memo(GameWrapper);
