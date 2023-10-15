import { Hash } from "lucide-react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import { RoomSidebarHeader } from "./room-sidebar-header";
import { RoomSidebarSearch } from "./room-sidebar-search";
import { RoomSidebarSection } from "./room-sidebar-section";
import { RoomSidebarItem } from "./room-sidebar-item";

// useParams는 Client Components에서만 작동한다.
// Server Components로 작동하고 싶다면 props로 전달하자.
export const RoomSidebar = async (props: any) => {
  const rooms = await fetch(`${process.env.NEXTAUTH_URL}/api/room/list`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ gameName: props.gameName }),
  })
    .then((response) => response.json())
    .then((json) => json.data?.rows);

  // useMemo
  const chatRooms = rooms?.filter((room: any) => room.type === "chat");
  const gameRooms = rooms?.filter((room: any) => room.type === "game");
  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
      <RoomSidebarHeader />
      <ScrollArea className="flex-1 px-3">
        <div className="mt-2">
          <RoomSidebarSearch data={[]} />
        </div>
        <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2" />
        <RoomSidebarSection label="lobby" rooms={chatRooms} />
        <RoomSidebarSection label="game" rooms={gameRooms} />
      </ScrollArea>
    </div>
  );
};
