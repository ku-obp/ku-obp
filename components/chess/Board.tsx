import { Chess } from "chess.js";
import { fenToSquareInfo, playAudio } from "@/lib/utils";
import { Square } from "./Square";
import { move, select, deselect, lastMove } from "@/redux/features/chess-slice";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useCallback, useEffect, useMemo } from "react";

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
      if (state.to.some((str) => str.includes("=Q"))) {
        chess.move({ from, to, promotion: "q" });
      } else {
        chess.move({ from, to });
      }
      dispatch(move(chess.fen()));
      playAudio(chess.history()[0]);

      const last = chess.history({ verbose: true }).at(-1);
      if (last) {
        dispatch(lastMove({ from: last.from, to: last.to }));
      }
    },
    [chess, dispatch, state.to]
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

  useEffect(() => {
    if (state.aiMode && state.turnColor === state.opponentColor) {
      stockfish.postMessage(`position fen ${state.history[state.boardIndex]}`);
      stockfish.postMessage("go depth 15");
      stockfish.onmessage = function (event) {
        const receivedMessage = event.data.split(" ");
        if (receivedMessage.includes("bestmove")) {
          const aiFrom = receivedMessage[1].slice(0, 2);
          const aiTo = receivedMessage[1].slice(2, 4);
          movePiece(aiFrom, aiTo);
        }
      };
    }
  }, [
    movePiece,
    state.aiMode,
    state.boardIndex,
    state.history,
    state.opponentColor,
    state.turnColor,
    stockfish,
  ]);

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
