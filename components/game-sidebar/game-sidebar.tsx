import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ModeToggle } from "@/components/mode-toggle";
import { SettingButton } from "@/components/auth/setting-button";

import { GameSidebarAction } from "./game-sidebar-action";
import { GameSidebarItem } from "./game-sidebar-item";

export const GameSidebar = async () => {
  const games = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/game/list`)
    .then((response) => response.json())
    .then((json) => json.data.rows);

  return (
    <div className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22] bg-[#E3E5E8] py-3">
      <GameSidebarAction />
      <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />
      <ScrollArea className="flex-1 w-full">
        {games.map((game: any) => (
          <div key={game.id} className="mb-4">
            <GameSidebarItem
              id={game.id}
              name={game.name}
              imageUrl={game.image_url}
            />
          </div>
        ))}
      </ScrollArea>
      <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />
      <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
        <ModeToggle />
        <SettingButton />
      </div>
    </div>
  );
};
