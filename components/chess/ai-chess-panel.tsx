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
import {
  ArrowLeft,
  ArrowRight,
  GitPullRequestDraft,
  HelpCircle,
  ListRestart,
  Paintbrush,
} from "lucide-react";
import { ActionTooltip } from "../action-tooltip";

export const AiChessPanel = () => {
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
    <div className="flex gap-2 bottom-8 flex-row w-1/4 justify-center">
      {/* <div className="pb-[100%]"></div> */}
      <ActionTooltip side="bottom" align="center" label="change color">
        <button onClick={() => dispatch(changeColor())}>
          <Paintbrush className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
        </button>
      </ActionTooltip>
      <ActionTooltip side="bottom" align="center" label="go to previous state">
        <button onClick={() => dispatch(gotoPrev())}>
          <ArrowLeft className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
        </button>
      </ActionTooltip>
      <ActionTooltip side="bottom" align="center" label="go to next state">
        <button onClick={() => dispatch(gotoNext())}>
          <ArrowRight className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
        </button>
      </ActionTooltip>
      <ActionTooltip side="bottom" align="center" label="reset">
        <button onClick={() => dispatch(reset())}>
          <ListRestart className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
        </button>
      </ActionTooltip>
      <ActionTooltip side="bottom" align="center" label="ai recommendation">
        <button onClick={requestStockfish}>
          <HelpCircle className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
        </button>
      </ActionTooltip>
      <ActionTooltip side="bottom" align="center" label="ai level control">
        <button onClick={() => console.log("control")}>
          <GitPullRequestDraft className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
        </button>
      </ActionTooltip>
    </div>
  );
};
