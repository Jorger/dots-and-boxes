import "./styles.css";
import {
  BOARD_SIZE,
  EBoardColor,
  ELineState,
  ETypeLine,
  LINE_SIZE,
  TILE_SIZE,
} from "../../../../utils/constants";
import React from "react";
import type {
  IBaseLine,
  IBoxLine,
  ISelectLine,
  TBoardColor,
  TLineState,
  TTypeLine,
} from "../../../../interfaces";

interface LineProps {
  type: TTypeLine;
  state: TLineState;
  baseLine: IBaseLine;
  lineColor?: TBoardColor;
  box?: IBoxLine;
  handleSelect: (data: ISelectLine) => void;
}

const Line = ({
  type = ETypeLine.VERTICAL,
  state = ELineState.ACTIVE,
  baseLine,
  lineColor = EBoardColor.BLUE,
  box = { isComplete: false },
  handleSelect,
}: LineProps) => {
  const { left = 0, top = 0, row = 0, col = 0 } = baseLine;
  const { isComplete, color = "" } = box;

  const isVertical = type === ETypeLine.VERTICAL;
  const isLast = col === BOARD_SIZE - (isVertical ? 0 : 1);
  const width = isVertical ? LINE_SIZE : TILE_SIZE;
  const height = isVertical ? TILE_SIZE : LINE_SIZE + 2;

  /**
   * Para saber si se muestra la caja (box)
   */
  const classNameFillingBox = isComplete
    ? `filling-box ${color.toLowerCase()}`
    : "";

  /**
   * Valida si es la última línea que se rendriza
   */
  const classNameLastLine = isLast ? "last" : "";
  /**
   * Se arma la clase para la línea
   */
  const className = `game-line ${classNameFillingBox} ${state.toLowerCase()} ${type.toLowerCase()} ${classNameLastLine}`;

  /**
   * Inline styles para la línea, por defecto la variable css
   * para el color de la línea es vacío.
   */
  const style = {
    width,
    height,
    left,
    top,
    "--line-color": "",
  };

  /**
   * Si la línea está seleccionada, se establece el color de la misma
   * a través de las variable css
   */
  if (state === ELineState.SELECTED) {
    style["--line-color"] =
      `var(${lineColor === EBoardColor.BLUE ? "--line-blue" : "--line-red"})`;
  }

  return (
    <button
      className={className}
      style={style}
      title={`Line ${type}, ${row} - ${col}`}
      disabled={!(state === ELineState.ACTIVE)}
      onClick={() =>
        handleSelect({
          type,
          row,
          col,
        })
      }
    >
      {row}-{col}
    </button>
  );
};

export default React.memo(Line);
