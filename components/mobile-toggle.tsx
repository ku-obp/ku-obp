import { Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { GameSidebar } from "@/components/game-sidebar/game-sidebar";
import { RoomSidebar } from "@/components/room-sidebar/room-sidebar";
import { Button } from "@/components/ui/button";

export const MobileToggle = ({ gameName }: { gameName: string }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 flex gap-0 lg:hidden">
        <div className="w-[72px]">
          <GameSidebar />
        </div>
        <RoomSidebar gameName={gameName} />
      </SheetContent>
    </Sheet>
  );
};
