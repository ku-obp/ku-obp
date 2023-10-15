"use client";

import { Hash } from "lucide-react";

export const ChatWelcome = ({ roomName }: any) => {
  return (
    <div className="space-y-2 px-4 mb-4">
      <div className="h-[75px] w-[75px] rounded-full bg-zinc-500 dark:bg-zinc-700 flex items-center justify-center">
        <Hash className="h-12 w-12 text-white" />
      </div>
      <p className="text-xl md:text-3xl font-bold">{`Welcome to #${roomName}`}</p>
      <p className="text-zinc-600 dark:text-zinc-400 text-sm">
        {`This is the start of the #${roomName} channel.`}
      </p>
    </div>
  );
};
