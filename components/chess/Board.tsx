import { Chess } from "chess.js";
import { useState, useEffect } from "react";
import { fenToSquareInfo, playAudio } from "@/lib/utils";
import { Square } from "./Square";

interface BoardProps {
  onMove: (fen: string) => void;
  fen: string;
  turnColor: "w" | "b";
}

const startFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
const initialState = {
  from: "",
  to: [] as string[],
  turnColor: "w",
  lastMoveFrom: "",
  lastMoveTo: "",
};

export const Board = ({ onMove, fen, turnColor }: BoardProps) => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    if (fen === startFen) {
      setState(initialState);
    }
  }, [fen]);

  useEffect(() => {
    setState((prevState) => ({ ...prevState, turnColor }));
  }, [turnColor]);

  const chess = new Chess(fen);

  const selectPiece = (squareId: string) => {
    const possibleMoves = chess
      .moves({ square: squareId as any, verbose: true })
      .map((detail) => detail.to);
    setState((prevState) => ({
      ...prevState,
      from: squareId,
      to: possibleMoves,
    }));
  };

  const deselectPiece = () => {
    setState((prevState) => ({
      ...prevState,
      from: "",
      to: [],
    }));
  };

  const movePiece = (squareId: string) => {
    if (state.to.some((str) => str.includes("=Q"))) {
      chess.move({ from: state.from, to: squareId, promotion: "q" });
    } else {
      chess.move({ from: state.from, to: squareId });
    }

    const lastMove = chess.history({ verbose: true }).at(-1);
    if (lastMove) {
      setState((prevState) => ({
        ...prevState,
        lastMoveFrom: lastMove.from,
        lastMoveTo: lastMove.to,
      }));
    }

    onMove(chess.fen());
    playAudio(chess.history()[0]);

    setState((prevState) => ({
      ...prevState,
      turnColor: prevState.turnColor === "w" ? "b" : "w",
      to: [],
      from: "",
    }));
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
  const squareInfo = fenToSquareInfo(fen);
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
          lastMoveFrom={state.lastMoveFrom === squareId}
          lastMoveTo={state.lastMoveTo === squareId}
          onClick={() => handleSquareClick(squareId)}
        />
      );
    }
  }

  return <div className="w-[800px] h-[800px] grid grid-cols-8">{board}</div>;
};
