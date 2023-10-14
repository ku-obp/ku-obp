import { redirect } from "next/navigation";
// import { UserButton } from "@clerk/nextjs";

import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ModeToggle } from "@/components/mode-toggle";
// import { currentProfile } from "@/lib/current-profile";
// import { db } from "@/lib/db";

import { NavigationAction } from "./navigation-action";
import { NavigationItem } from "./navigation-item";

// 서버 컴포넌트이므로 async를 붙인다.
export const NavigationSidebar = async () => {
  // const profile = await currentProfile();

  // if (!profile) {
  //   return redirect("/");
  // }

  const servers = [
    { id: "1", name: "chess", imageUrl: "/assets/icons/chess.png" },
    { id: "2", name: "mafia", imageUrl: "/assets/icons/mafia.png" },
    { id: "3", name: "monopoly", imageUrl: "/assets/icons/monopoly.png" },
    { id: "4", name: "tic-tac-toe", imageUrl: "/assets/icons/tic-tac-toe.png" },
    { id: "5", name: "checkers", imageUrl: "/assets/icons/checkers.png" },
    {
      id: "6",
      name: "chinese-checkers",
      imageUrl: "/assets/icons/chinese-checkers.png",
    },
    { id: "7", name: "maze", imageUrl: "/assets/icons/maze.png" },
    { id: "8", name: "shogi", imageUrl: "/assets/icons/shogi.png" },
    { id: "9", name: "gomoku", imageUrl: "/assets/icons/gomoku.png" },
  ];

  return (
    <div className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22] bg-[#E3E5E8] py-3">
      <NavigationAction />
      <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />
      <ScrollArea className="flex-1 w-full">
        {servers.map((server) => (
          <div key={server.id} className="mb-4">
            <NavigationItem
              id={server.id}
              name={server.name}
              imageUrl={server.imageUrl}
            />
          </div>
        ))}
      </ScrollArea>
      <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
        <ModeToggle />
        {/* <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "h-[48px] w-[48px]",
            },
          }}
        /> */}
      </div>
    </div>
  );
};
