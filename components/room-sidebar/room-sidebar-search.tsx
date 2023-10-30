"use client";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

export const RoomSidebarSearch = ({ rooms }: any) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const params = useParams();

  const gameName = params?.gameName;

  // 단축키 설정
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // 검색 리스트 클릭
  const onClick = (roomId: any) => {
    setOpen(false);
    // router.push(`/${gameName}/chat/${name}`);
    router.push(`/${gameName}/${roomId}`);
  };
  // console.log(rooms);
  // rooms?.map(({ label, status }: any) => {});

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition-"
      >
        <Search className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
        <p className="font-semibold text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition">
          Search
        </p>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-auto">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder={`Search all ${gameName} rooms`} />
        <CommandList>
          <CommandEmpty>No Results found</CommandEmpty>
          <CommandGroup key={"game"}>
            {rooms?.map(({ label, status }: any) => {
              if (!status) return null;

              return (
                <CommandItem
                  key={status.roomId}
                  onSelect={() => onClick(status.roomId)}
                >
                  <span>{status.hostEmail}</span>
                </CommandItem>
              );
            })}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};
