"use client";

import { MessageSquare, Swords, Lock, Home } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { cn, makeUpper } from "@/lib/utils";

interface Props {
  id: number;
  game: string;
  name: string;
  type: string;
}

export const RoomSidebarItem = ({ type, roomId, hostEmail, name }: any) => {
  const params = useParams();
  const router = useRouter();
  const gameName = params.gameName;

  const onClick = () => {
    if (type === "home") {
      router.push(`/${gameName}`);
    } else {
      router.push(`/${gameName}/${roomId}`);
    }
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition",
        params?.roomId === roomId && "bg-zinc-700/20 dark:bg-zinc-700"
      )}
    >
      {type === "home" ? (
        <Home className="flex-shrink-0 w-5 h-5 text-zinc-500 dark:text-zinc-400" />
      ) : (
        <Swords className="flex-shrink-0 w-5 h-5 text-rose-500 dark:text-rose-400" />
      )}
      <div className="w-full flex justify-between">
        <p
          className={cn(
            "line-clamp-1 font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition text-left",
            params?.roomId === roomId &&
              "text-primary dark:text-zinc-200 dark:group-hover:text-white"
          )}
        >
          {hostEmail}
          {name}
        </p>
      </div>
    </button>
  );
};
