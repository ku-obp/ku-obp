import { Chess } from "chess.js";
import { useState, useEffect } from "react";
import { fenToSquareInfo, playAudio } from "@/lib/utils";
import { Square } from "./Square";
import { move, select, deselect, lastMove } from "@/redux/features/chess-slice";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";

export const Board = () => {
  const dispatch = useDispatch<AppDispatch>();
  const state = useAppSelector((state) => state.chessReducer);
  const chess = new Chess(state.history[state.boardIndex]);

  const selectPiece = (squareId: string) => {
    const possibleMoves = chess
      .moves({ square: squareId as any, verbose: true })
      .map((detail) => detail.to);
    dispatch(select({ from: squareId, possibleMoves }));
  };

  const deselectPiece = () => {
    dispatch(deselect());
  };

  const movePiece = (squareId: string) => {
    if (state.to.some((str) => str.includes("=Q"))) {
      chess.move({ from: state.from, to: squareId, promotion: "q" });
    } else {
      chess.move({ from: state.from, to: squareId });
    }
    dispatch(move(chess.fen()));
    playAudio(chess.history()[0]);

    const last = chess.history({ verbose: true }).at(-1);
    if (last) {
      dispatch(lastMove({ from: last.from, to: last.to }));
    }
  };

  const handleSquareClick = (squareId: string) => {
    if (state.from === squareId) {
      deselectPiece();
    } else if (squareInfo[squareId].color === state.turnColor) {
      selectPiece(squareId);
    } else if (
      squareInfo[squareId].color !== state.turnColor &&
      !state.to.some((str) => str.includes(squareId))
    ) {
      deselectPiece();
    } else if (state.to.some((str) => str.includes(squareId))) {
      movePiece(squareId);
    }
  };

  let board = [];
  const last = state.lastMove[state.boardIndex];
  const squareInfo = fenToSquareInfo(chess.fen());
  // const rows = ["1", "2", "3", "4", "5", "6", "7", "8"]; // 순서 변경
  // const cols = ["h", "g", "f", "e", "d", "c", "b", "a"]; // 순서 변경
  const rows = ["8", "7", "6", "5", "4", "3", "2", "1"];
  const cols = ["a", "b", "c", "d", "e", "f", "g", "h"];
  for (const row of rows) {
    for (const col of cols) {
      const squareId = col.concat(row);
      board.push(
        <Square
          key={squareId}
          squareId={squareId}
          type={squareInfo[squareId].type}
          color={squareInfo[squareId].color}
          selectable={squareInfo[squareId].color === state.turnColor}
          selected={state.from === squareId}
          legalTo={state.to.some((str) => str.includes(squareId))}
          isDark={squareInfo[squareId].isEven}
          lastMoveFrom={last && last.from === squareId}
          lastMoveTo={last && last.to === squareId}
          onClick={() => handleSquareClick(squareId)}
        />
      );
    }
  }

  console.log(state);

  return <div className="w-[800px] h-[800px] grid grid-cols-8">{board}</div>;
};
