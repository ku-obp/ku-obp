import { RoomSidebarItem } from "./room-sidebar-item";

export const RoomSidebarSection = (props: any) => {
  const rooms = props.rooms;
  return (
    <div className="flex flex-col justify-between mb-2">
      <p className="text-xs uppercase font-semibold text-zinc-500 dark:text-zinc-400 my-2">
        {props.label}
      </p>
      <div className="space-y-[4px]">
        {rooms?.map(({ roomId, hostEmail, type, name }: any) => (
          <RoomSidebarItem
            key={roomId}
            roomId={roomId}
            hostEmail={hostEmail}
            type={type}
            name={name}
          />
        ))}
      </div>
    </div>
  );
};
