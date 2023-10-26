import { AiChessGame } from "@/components/chess/ai-chess-game";
import { GameRoomHeader } from "@/components/game-room/game-room-header";

interface gameRoomsProps {
  params: {
    gameName: string;
  };
}

const AiGame = ({ params }: gameRoomsProps) => {
  return (
    <>
      <div className="header bg-white dark:bg-[#313338]">
        <GameRoomHeader gameName={params.gameName} />
      </div>
      <div className="game bg-white dark:bg-[#313338] flex flex-col flex-grow justify-center items-center">
        {params.gameName === "chess" && <AiChessGame />}
      </div>
    </>
  );
};

export default AiGame;
