"use client";

import { useState } from "react";
import { Board } from "@/components/chess/Board";

const startFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

type State = {
  boardIndex: number;
  history: string[];
  turnColor: "w" | "b";
};

const initialState: State = {
  boardIndex: 0,
  history: [startFen],
  turnColor: "w",
};

const ChessGame = () => {
  const [state, setState] = useState(initialState);

  const handleChessMove = (fen: string) => {
    setState((prevState) => ({
      ...prevState,
      boardIndex: prevState.boardIndex + 1,
      history: [...prevState.history.slice(0, prevState.boardIndex + 1), fen],
      turnColor: prevState.turnColor === "w" ? "b" : "w",
    }));
  };

  const handleGotoPrevState = () => {
    if (state.boardIndex > 0) {
      setState((prevState) => ({
        ...prevState,
        boardIndex: prevState.boardIndex - 1,
        turnColor: prevState.turnColor === "w" ? "b" : "w",
      }));
    }
  };

  const handleGotoNextState = () => {
    if (state.boardIndex < state.history.length - 1) {
      setState((prevState) => ({
        ...prevState,
        boardIndex: prevState.boardIndex + 1,
        turnColor: prevState.turnColor === "w" ? "b" : "w",
      }));
    }
  };

  const requestCreateNewGame = () => {
    setState(initialState);
  };

  const requestStockfish = () => {
    const stockfish = new Worker("stockfish.js");
    stockfish.postMessage(`position fen ${state.history[state.boardIndex]}`);
    stockfish.postMessage("go depth 15");
    stockfish.onmessage = function (event) {
      const receivedMessage = event.data.split(" ");
      if (receivedMessage.includes("bestmove")) {
        console.log(receivedMessage);
      }
    };
  };

  return (
    <div className="flex justify-center items-center h-screen bg-chessboard-black">
      <Board
        onMove={handleChessMove}
        fen={state.history[state.boardIndex]}
        turnColor={state.turnColor}
      />
      <div className="flex flex-col bg-slate-300 w-32 ml-4">
        <button onClick={handleGotoPrevState}>Prev</button>
        <button onClick={handleGotoNextState}>Next</button>
        <button onClick={requestCreateNewGame}>Reset</button>
        <button onClick={requestStockfish}>AI</button>
      </div>
    </div>
  );
};

export default ChessGame;
