import { ChessGame } from "@/components/chess/chess-game";
import { GameRoomHeader } from "@/components/game-room/game-room-header";

interface gameRoomsProps {
  params: {
    gameName: string;
    roomId: number;
  };
}

const ChatRoom = ({ params }: gameRoomsProps) => {
  return (
    <>
      <div className="header bg-white dark:bg-[#313338]">
        <GameRoomHeader gameName={params.gameName} roomId={params.roomId} />
      </div>
      <div className="game bg-white dark:bg-[#313338] flex flex-col h-full justify-center items-center">
        {params.gameName === "chess" && <ChessGame />}
      </div>
    </>
  );
};

export default ChatRoom;
