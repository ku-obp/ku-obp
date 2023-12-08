import { GameRoomHeader } from "@/components/game-room/game-room-header";
import { RoomSidebar } from "@/components/room-sidebar/room-sidebar";

const GameLayout = (props: any) => {
  return (
    <>
      <GameRoomHeader gameName={props.params?.gameName} />
      {/* <div className="hidden lg:flex h-full w-60 z-20 flex-col inset-y-0 fixed">
        <RoomSidebar gameName={props.params?.gameName} />
      </div> */}
      {/* <main className="h-full lg:pl-60 flex flex-col">{props.children}</main> */}
      <main className="h-full flex flex-col">{props.children}</main>
    </>
  );
};

export default GameLayout;
