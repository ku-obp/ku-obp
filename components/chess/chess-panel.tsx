"use client";

import { useDispatch } from "react-redux";
import { Chess } from "chess.js";

import {
  move,
  reset,
  gotoPrev,
  gotoNext,
  changeColor,
} from "@/redux/features/chess-slice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { playAudio } from "@/lib/chess-utils";

export const ChessPanel = () => {
  const state = useAppSelector((state) => state.chessReducer);
  const dispatch = useDispatch<AppDispatch>();
  const chess = new Chess(state.history[state.boardIndex]);

  const requestStockfish = () => {
    const stockfish = new Worker("/worker/stockfish.js");
    stockfish.postMessage(`position fen ${state.history[state.boardIndex]}`);
    stockfish.postMessage("go depth 15");
    stockfish.onmessage = function (event) {
      const receivedMessage = event.data.split(" ");
      if (receivedMessage.includes("bestmove")) {
        const aiFrom = receivedMessage[1].slice(0, 2);
        const aiTo = receivedMessage[1].slice(2, 4);
        chess.move({ from: aiFrom, to: aiTo, promotion: "q" });
        dispatch(move({ fen: chess.fen(), from: aiFrom, to: aiTo }));
        playAudio(chess.history()[0]);
      }
    };
  };

  return (
    <div className="flex flex-col bg-slate-300 w-32">
      <button onClick={() => dispatch(changeColor())}>Change Color</button>
      <button onClick={() => dispatch(gotoPrev())}>Prev</button>
      <button onClick={() => dispatch(gotoNext())}>Next</button>
      <button onClick={() => dispatch(reset())}>Reset</button>
      <button onClick={requestStockfish}>AI Help</button>
    </div>
  );
};
