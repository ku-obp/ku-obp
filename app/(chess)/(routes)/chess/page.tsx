"use client";

import { Board } from "@/components/chess/Board";
import { Panel } from "@/components/chess/Panel";

const Chess = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-chessboard-black">
      <Board />
      <Panel />
    </div>
  );
};

export default Chess;
