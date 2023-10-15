import { Swords } from "lucide-react";

import { MobileToggle } from "@/components/mobile-toggle";

export const GameRoomHeader = ({ gameName, roomId }: any) => {
  return (
    <div className="text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2">
      <MobileToggle gameName={gameName} />
      <Swords className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mr-2" />
      <p className="font-semibold text-md text-black dark:text-white">
        {roomId}
      </p>
      <div className="ml-auto flex items-center">Something</div>
    </div>
  );
};
