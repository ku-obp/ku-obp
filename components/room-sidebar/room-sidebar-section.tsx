import { RoomSidebarItem } from "./room-sidebar-item";

export const RoomSidebarSection = (props: any) => {
  return (
    <div className="flex flex-col justify-between mb-2">
      <p className="text-xs uppercase font-semibold text-zinc-500 dark:text-zinc-400 my-2">
        {props.label}
      </p>
      <div className="space-y-[4px]">
        {props.rooms?.map((room: any) => (
          <RoomSidebarItem
            key={room.id}
            id={room.id}
            game={room.game}
            name={room.name}
            type={room.type}
          />
        ))}
      </div>
    </div>
  );
};
