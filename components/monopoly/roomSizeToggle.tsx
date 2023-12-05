"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface RoomSizeToggleProps {
    setRoomMaxSize: (size: (2|3|4|5|6)) => void
}

export interface RoomSizeToggleRef {}

export const RoomSizeToggle = React.forwardRef<RoomSizeToggleRef, RoomSizeToggleProps>((prop, ref) => {
  const [maxSize, SetMaxSize] = React.useState<(2|3|4|5|6)>(6)
  React.useEffect(() => {
    prop.setRoomMaxSize(maxSize)
  }, [maxSize])
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="bg-transparent border-0"
          variant="outline"
          size="icon"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="bottom">
        <DropdownMenuItem onClick={() => SetMaxSize(2)}>
          2
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => SetMaxSize(3)}>
          3
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => SetMaxSize(4)}>
          4
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => SetMaxSize(5)}>
          5
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => SetMaxSize(6)}>
          6
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});