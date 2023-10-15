"use client";

import { makeUpper } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import { useParams } from "next/navigation";

export const RoomSidebarHeader = () => {
  const params: any = useParams();
  return (
    <button className="w-full text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition">
      {makeUpper(params.gameName)} Server
      {/* <ChevronLeft className="h-5 w-5 ml-auto" /> */}
    </button>
  );
};
