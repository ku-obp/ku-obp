"use client";

import { useDispatch } from "react-redux";
import { Chess } from "chess.js";

import { select, deselect } from "@/redux/features/chess-slice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { fenToSquareInfo, playAudio } from "@/lib/chess-utils";

import { ChessSquare } from "./chess-square";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";

export const ChessBoard = () => {
  const params = useParams();
  const gameName = params.gameName;
  const roomId = params.roomId;
  const user = useSession();

  const dispatch = useDispatch<AppDispatch>();
  const state = useAppSelector((state) => state.chessReducer);
  console.log(state);

  const chess = new Chess(state.history[state.boardIndex]);

  const selectPiece = (squareId: string) => {
    const possibleMoves = chess
      .moves({ square: squareId as any, verbose: true })
      .map((detail) => detail.to);
    dispatch(select({ from: squareId, possibleMoves }));
  };

  const movePiece = async (from: string, to: string) => {
    try {
      chess.move({ from, to, promotion: "q" });
    } catch {
      return;
    }

    await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/game/${gameName}/room/${roomId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gameName,
          roomId,
          fen: chess.fen(),
          from,
          to,
          userEmail: user.data?.user?.email,
        }),
      }
    );
    playAudio(chess.history()[0]);
  };

  const handleSquareClick = (squareId: string) => {
    if (state.from === squareId) {
      dispatch(deselect());
    } else if (
      squareInfo[squareId].color === state.turnColor &&
      state.playerColor === state.turnColor
    ) {
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

  let board = [];
  const squareInfo = fenToSquareInfo(chess.fen());
  const last = state.lastMove[state.boardIndex];

  let rows, cols;
  if (state.playerColor === "b") {
    rows = ["1", "2", "3", "4", "5", "6", "7", "8"];
    cols = ["h", "g", "f", "e", "d", "c", "b", "a"];
  } else {
    rows = ["8", "7", "6", "5", "4", "3", "2", "1"];
    cols = ["a", "b", "c", "d", "e", "f", "g", "h"];
  }

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const squareId = cols[col].concat(rows[row]);
      board.push(
        <ChessSquare
          key={squareId}
          squareId={squareId}
          type={squareInfo[squareId].type}
          color={squareInfo[squareId].color}
          selectable={
            squareInfo[squareId].color === state.turnColor &&
            state.playerColor === state.turnColor
          }
          selected={state.from === squareId}
          legalTo={state.to.some((str) => str.includes(squareId))}
          isDark={squareInfo[squareId].isEven}
          lastMoveFrom={last && last.from === squareId}
          lastMoveTo={last && last.to === squareId}
          onClick={() => handleSquareClick(squareId)}
          y={row}
          x={col}
        />
      );
    }
  }

  return (
    <div
      style={{ width: "min(75%, 70vh)", maxWidth: "800px" }}
      className="relative"
    >
      <div className="pb-[100%]"></div>
      {board}
    </div>
  );
};
