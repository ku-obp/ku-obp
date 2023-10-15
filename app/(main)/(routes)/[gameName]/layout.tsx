import { RoomSidebar } from "@/components/room-sidebar/room-sidebar";

const GameLayout = (props: any) => {
  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-60 z-20 flex-col inset-y-0 fixed">
        <RoomSidebar gameName={props.params?.gameName} />
      </div>
      <main className="h-full md:pl-60">{props.children}</main>
    </div>
  );
};

export default GameLayout;
