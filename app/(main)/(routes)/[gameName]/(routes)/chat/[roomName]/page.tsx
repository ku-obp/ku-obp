import { ChatRoomHeader } from "@/components/chat-room/chat-room-header";

interface ChatRoomsProps {
  params: {
    gameName: string;
    roomName: string;
  };
}

const ChatRoom = ({ params }: ChatRoomsProps) => {
  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatRoomHeader gameName={params.gameName} roomName={params.roomName} />
    </div>
  );
};

export default ChatRoom;
