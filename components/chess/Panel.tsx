import {
  move,
  lastMove,
  reset,
  gotoPrev,
  gotoNext,
  changeColor,
} from "@/redux/features/chess-slice";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { Chess } from "chess.js";
import { playAudio } from "@/lib/utils";

export const Panel = () => {
  const state = useAppSelector((state) => state.chessReducer);
  const dispatch = useDispatch<AppDispatch>();
  const chess = new Chess(state.history[state.boardIndex]);

  const HandleChangeColor = () => {
    dispatch(changeColor());
  };

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
        const aiFrom = receivedMessage[1].slice(0, 2);
        const aiTo = receivedMessage[1].slice(2, 4);

        if (state.to.some((str) => str.includes("=Q"))) {
          chess.move({ from: aiFrom, to: aiTo, promotion: "q" });
        } else {
          chess.move({ from: aiFrom, to: aiTo });
        }
        dispatch(move(chess.fen()));
        playAudio(chess.history()[0]);

        const last = chess.history({ verbose: true }).at(-1);
        if (last) {
          dispatch(lastMove({ from: last.from, to: last.to }));
        }
      }
    };
  };

  return (
    <div className="flex flex-col bg-slate-300 w-32 ml-4">
      <button onClick={HandleChangeColor}>Change Color</button>
      <button onClick={handleGotoPrevState}>Prev</button>
      <button onClick={handleGotoNextState}>Next</button>
      <button onClick={requestCreateNewGame}>Reset</button>
      <button onClick={requestStockfish}>AI Help</button>
    </div>
  );
};
