import "./styles.css";
import {
  BOARD_SIZE,
  COMBINED_DELAY,
  EBoardColor,
  ELineState,
  ETypeLine,
  LINE_SIZE,
  TILE_SIZE,
  TIME_EXPAND_LINE,
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
  lineDelay?: number;
  box?: IBoxLine;
  handleSelect: (data: ISelectLine) => void;
}

const Line = ({
  type = ETypeLine.VERTICAL,
  state = ELineState.ACTIVE,
  baseLine,
  lineColor = EBoardColor.BLUE,
  lineDelay = 0,
  box = { isComplete: false, delay: 0 },
  handleSelect,
}: LineProps) => {
  const { left = 0, top = 0, row = 0, col = 0 } = baseLine;
  const {
    isComplete: isBoxComplete,
    color: boxColor = "",
    delay: boxDealy = 0,
    isCommit: isBoxCommit,
  } = box;

  const isVertical = type === ETypeLine.VERTICAL;
  const isLast = col === BOARD_SIZE - (isVertical ? 0 : 1);
  const width = isVertical ? LINE_SIZE : TILE_SIZE;
  const height = isVertical ? TILE_SIZE : LINE_SIZE + 2;

  /**
   * Para saber si se muestra la caja (box)
   */
  const classNameFillingBox = isBoxComplete
    ? `filling-box ${boxColor.toLowerCase()} ${!isBoxCommit ? "animate" : ""}`
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
    "--line-delay": "",
    "--box-delay": "",
  };

  /**
   * Si la línea está seleccionada, se establece el color de la misma
   * a través de las variable css
   */
  if (state === ELineState.SELECTED) {
    style["--line-color"] =
      `var(${lineColor === EBoardColor.BLUE ? "--line-blue" : "--line-red"})`;

    /**
     * Tiempo de espera para hacer la animación de la línea...
     */
    style["--line-delay"] = `${lineDelay * COMBINED_DELAY}ms`;
  }

  if (isBoxComplete && !isBoxCommit) {
    /**
     * Tiempo de espera para hacer la animación de la caja
     */
    const animationBoxDelay = TIME_EXPAND_LINE + COMBINED_DELAY * boxDealy;
    style["--box-delay"] = `${animationBoxDelay}ms`;
  }

  const title = `${type} Line, ${row} - ${col}`;

  return (
    <button
      className={className}
      style={style}
      title={title}
      disabled={!(state === ELineState.ACTIVE)}
      onClick={() =>
        handleSelect({
          type,
          row,
          col,
        })
      }
    />
  );
};

export default React.memo(Line);
