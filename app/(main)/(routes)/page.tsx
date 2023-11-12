import { GameRoomHeader } from "@/components/game-room/game-room-header";
import { MobileToggle } from "@/components/mobile-toggle";

export default function Home() {
  return (
    <>
      <GameRoomHeader gameName={"home"} />
      <div className="flex flex-col justify-center items-center h-full gap-4">
        <p className="text-3xl md:text-5xl font-bold text-rose-500">
          Open Boardgame Project
        </p>
      </div>
    </>
  );
}
