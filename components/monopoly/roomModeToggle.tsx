"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface RoomModeToggleProps {
    setRoomMode: (modeName: ("classic"|"monopol"|"rundown")) => void
}

export interface RoomModeToggleRef {}

export const RoomModeToggle = React.forwardRef<RoomModeToggleRef, RoomModeToggleProps>((prop, ref) => {
  const [modeName, SetModeName] = React.useState<("classic"|"monopol"|"rundown")>("classic")
  React.useEffect(() => {
    prop.setRoomMode(modeName)
  }, [modeName])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="bg-transparent border-0"
          variant="outline"
          size="icon"
        >
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="bottom">
        <DropdownMenuItem onClick={() => SetModeName("classic")}>
          Classic
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => SetModeName("monopol")}>
          Monopol
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => SetModeName("rundown")}>
          Run-Down
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});