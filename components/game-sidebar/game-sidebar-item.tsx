"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { ActionTooltip } from "@/components/action-tooltip";

interface NavigationItemProps {
  id: string;
  imageUrl: string;
  name: string;
}

export const GameSidebarItem = ({
  id,
  imageUrl,
  name,
}: NavigationItemProps) => {
  const params = useParams();
  const router = useRouter();

  const onClick = () => {
    // if (name === "chess") {
    router.push(`/${name}`);
    // } else {
    //   alert("더미 메뉴입니다. 지금은 체스만 가능합니다.");
    // }
  };

  return (
    <ActionTooltip side="right" align="center" label={name}>
      <button onClick={onClick} className="group relative flex items-center">
        <div
          className={cn(
            "absolute lefft-0 bg-primary rounded-r-full transition-all w-[4px]",
            params?.serverId !== id && "group-hover:h-[20px]",
            params?.serverId === id ? "h-[36px]" : "h-[8px]"
          )}
        />
        <div
          className={cn(
            "relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden",
            params?.serverId === id &&
              "bg-primary/10 text-primary rounded-[16px]"
          )}
        >
          <Image fill src={imageUrl} alt="Channel" sizes="100px" />
        </div>
      </button>
    </ActionTooltip>
  );
};
