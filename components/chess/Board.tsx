import { useCallback, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { Chess } from "chess.js";

import { move, select, deselect } from "@/redux/features/chess-slice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { fenToSquareInfo, playAudio } from "@/lib/utils";

import { Square } from "./Square";

export const Board = () => {
  const dispatch = useDispatch<AppDispatch>();
  const state = useAppSelector((state) => state.chessReducer);
  const chess = useMemo(() => {
    return new Chess(state.history[state.boardIndex]);
  }, [state.boardIndex, state.history]);
  const stockfish = useMemo(() => {
    return new Worker("stockfish.js");
  }, []);

  const selectPiece = (squareId: string) => {
    const possibleMoves = chess
      .moves({ square: squareId as any, verbose: true })
      .map((detail) => detail.to);
    dispatch(select({ from: squareId, possibleMoves }));
  };

  const movePiece = useCallback(
    (from: string, to: string) => {
      chess.move({ from, to, promotion: "q" });
      dispatch(move({ fen: chess.fen(), from, to }));
      playAudio(chess.history()[0]);
    },
    [chess, dispatch]
  );

  const handleSquareClick = (squareId: string) => {
    if (state.from === squareId) {
      dispatch(deselect());
    } else if (squareInfo[squareId].color === state.turnColor) {
      selectPiece(squareId);
    } else if (
      squareInfo[squareId].color !== state.turnColor &&
      !state.to.some((str) => str.includes(squareId))
    ) {
      dispatch(deselect());
    } else if (state.to.some((str) => str.includes(squareId))) {
      movePiece(state.from, squareId);
    }
  };

  const aiTurn = state.aiMode && state.turnColor === state.opponentColor;
  useEffect(() => {
    if (aiTurn) {
      stockfish.postMessage(`position fen ${state.history[state.boardIndex]}`);
      stockfish.postMessage("go depth 15");
      stockfish.onmessage = (event) => {
        const receivedMessage = event.data.split(" ");
        if (aiTurn && receivedMessage.includes("bestmove")) {
          const aiFrom = receivedMessage[1].slice(0, 2);
          const aiTo = receivedMessage[1].slice(2, 4);
          movePiece(aiFrom, aiTo);
        }
      };
    }
  }, [movePiece, aiTurn, state.boardIndex, state.history, stockfish]);

  let board = [];
  const last = state.lastMove[state.boardIndex];
  const squareInfo = fenToSquareInfo(chess.fen());
  let rows, cols;
  if (state.playerColor === "b") {
    rows = ["1", "2", "3", "4", "5", "6", "7", "8"];
    cols = ["h", "g", "f", "e", "d", "c", "b", "a"];
  } else {
    rows = ["8", "7", "6", "5", "4", "3", "2", "1"];
    cols = ["a", "b", "c", "d", "e", "f", "g", "h"];
  }
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

  return <div className="w-[800px] h-[800px] grid grid-cols-8">{board}</div>;
};
