"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import io from "socket.io-client";

import { AppDispatch, useAppSelector } from "@/redux/store";
import { changeColor, reset } from "@/redux/features/chess-slice";
import { openModal } from "@/redux/features/modal-slice";

type SocketContextType = {
  socket: any | null;
  isConnected: boolean;
  roomKey: string;
  color: string;
};

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
  roomKey: "",
  color: "",
});

export const useSocket = () => {
  return useContext(SocketContext);
};

export const ChessSocketProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [socket, setSocket] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [roomKey, setRoomKey] = useState("");
  const [color, setColor] = useState("");
  const params = useParams();
  const router = useRouter();
  const user = useSession();
  const dispatch = useDispatch<AppDispatch>();
  const state = useAppSelector((state) => state.chessReducer);

  useEffect(() => {
    const gameName = params.gameName;
    const roomId = params.roomId;
    const roomKey = `${gameName}:${roomId}`;
    setRoomKey(roomKey);

    const playerName = user.data?.user?.name;

    const socket = io(
      process.env.NEXT_PUBLIC_CHESS_SOCKET_URL || "http://localhost:4000",
      {
        withCredentials: true,
      }
    );
    socket.on("color", (data) => {
      dispatch(reset());
      setColor(data);
      if (data === "b") {
        dispatch(changeColor());
      }
    });

    socket.on("joinFailed", () => {
      console.log("Room is full now");
      router.push("/chess");
    });

    socket.on("connect", () => {
      console.log("Connected to Socket.io server");
      socket.emit("joinRoom", { playerName, roomKey });
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from Socket.io server");
      dispatch(reset());
    });

    socket.on("explosion", () => {
      console.log("You win.");
      router.push("/chess");
      dispatch(reset());
      dispatch(
        openModal({
          type: "gameResult",
          data: { result: "win" },
        })
      );
    });

    setSocket(socket);

    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected, roomKey, color }}>
      {children}
    </SocketContext.Provider>
  );
};
