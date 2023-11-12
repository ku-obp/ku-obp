"use client";

import { MonopolySocketProvider } from "../providers/monopoly-socket-provider";
import MonopolyWrapper from './monopoly-wrapper';

export const MonopolyWrappedGame = ({username}: {username: string}) => {
  return (
    <div className="flex justify-center items-center w-full">
      <div className="flex flex-col justify-center items-center gap-4 w-full">
        <MonopolySocketProvider>
          <MonopolyWrapper name={username} />
        </MonopolySocketProvider>
      </div>
    </div>
  );
};
