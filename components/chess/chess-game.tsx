"use client";

import { ChessBoard } from "./chess-board";
import { ChessPanel } from "./chess-panel";

export const ChessGame = ({ updatePlease, receivedData }: any) => {
  return (
    <div className="flex justify-center items-center w-full">
      <div className="flex flex-col justify-center items-center gap-4 w-full">
        <ChessBoard updatePlease={updatePlease} receivedData={receivedData} />
        {/* <ChessPanel /> */}
      </div>
    </div>
  );
};

//  min-[420px]:scale-125 min-[520px]:scale-150 sm:scale-175 md:scale-200 lg:scale-200 max-h-[90%] max-w-[90%]
