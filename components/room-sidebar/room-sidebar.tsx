"use client";

import { Hash } from "lucide-react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import { RoomSidebarHeader } from "./room-sidebar-header";
import { RoomSidebarSearch } from "./room-sidebar-search";
import { RoomSidebarSection } from "./room-sidebar-section";
import { RoomSidebarItem } from "./room-sidebar-item";
import { useEffect, useState } from "react";
import { postApi } from "@/apis/api";
import { useParams } from "next/navigation";

// useParams는 Client Components에서만 작동한다.
// Server Components로 작동하고 싶다면 props로 전달하자.
export const RoomSidebar = (props: any) => {
  const [rooms, setRooms] = useState([]);
  const params = useParams();
  const gameName = params.gameName;

  useEffect(() => {
    (async () => {
      const data = await postApi(`/api/game/${gameName}/room/list`, {
        gameName,
      });
      setRooms(data.rooms);
    })();
  }, [gameName]);

  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
      <RoomSidebarHeader />
      <ScrollArea className="flex-1 px-3">
        <div className="mt-2">
          <RoomSidebarSearch
            rooms={rooms?.map(({ hostEmail, roomId }) => ({
              label: "game",
              status: {
                hostEmail,
                roomId,
              },
            }))}
          />
        </div>
        <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2" />
        <RoomSidebarSection
          label="menu"
          rooms={[{ roomId: "1", type: "home", name: "home" }]}
        />
        <RoomSidebarSection label="game" rooms={rooms} />
      </ScrollArea>
    </div>
  );
};
