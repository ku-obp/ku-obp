import { reset, gotoPrev, gotoNext } from "@/redux/features/chess-slice";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";

export const Panel = () => {
  const state = useAppSelector((state) => state.chessReducer);

  const dispatch = useDispatch<AppDispatch>();

  const handleGotoPrevState = () => {
    if (state.boardIndex > 0) {
      dispatch(gotoPrev());
    }
  };

  const handleGotoNextState = () => {
    if (state.boardIndex < state.history.length - 1) {
      dispatch(gotoNext());
    }
  };

  const requestCreateNewGame = () => {
    dispatch(reset());
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
    <div className="flex flex-col bg-slate-300 w-32 ml-4">
      <button onClick={handleGotoPrevState}>Prev</button>
      <button onClick={handleGotoNextState}>Next</button>
      <button onClick={requestCreateNewGame}>Reset</button>
      <button onClick={requestStockfish}>AI</button>
    </div>
  );
};
