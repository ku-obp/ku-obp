"use client";

import { useParams } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import io, { Socket } from "socket.io-client";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { changeColor } from "@/redux/features/chess-slice";
import { useSession } from "next-auth/react";

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
  const user = useSession();
  const dispatch = useDispatch<AppDispatch>();
  const state = useAppSelector((state) => state.chessReducer);

  useEffect(() => {
    const gameName = params.gameName;
    const roomId = params.roomId;
    const roomKeyInstance = `${gameName}:${roomId}`;
    setRoomKey(roomKeyInstance);

    const name = user.data?.user?.name;

    const socket = io("http://localhost:4000");
    socket.emit("joinRoom", { roomKeyInstance, name });
    socket.on("color", (data) => {
      setColor(data);
      if (data === "b") {
        dispatch(changeColor());
      }
    });

    socket.on("connect", () => {
      console.log("Connected to Socket.io server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from Socket.io server");
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
