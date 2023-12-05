"use client";

import { SetStateAction, createContext, useContext, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import io from "socket.io-client";
import { Socket } from "socket.io-client";

import { AppDispatch, useAppSelector } from "@/redux/store";
// import { changeColor, reset } from "@/redux/features/chess-slice";
import { openModal } from "@/redux/features/modal-slice";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

type SocketBrokerContextType = {
  broker: SocketBroker | null;
  isConnected: boolean;
  roomKey: string;
  ord: number;
};

export class SocketBroker {
  socket: Socket
  private ready: boolean;
  private setReady: (value: SetStateAction<boolean>) => void;
  private router: AppRouterInstance;
  
  constructor(socket: Socket, {ready, setReady}: {ready: boolean, setReady: (value: SetStateAction<boolean>) => void}, router: AppRouterInstance = useRouter()) {
    this.socket = socket
    this.ready = ready
    this.setReady = setReady
    this.router = router
  }
  public commitReady() {
    if(!this.ready) {
      this.socket.emit("ready", {ready: true});
      this.setReady(true);
    }
  }
  public backToHome() {
    this.router.push("/monopoly");
  }
}

const SocketBrokerContext = createContext<SocketBrokerContextType>({
  broker: null,
  isConnected: false,
  roomKey: "",
  ord: -1,
});

export const useSocketBroker = () => {
  return useContext(SocketBrokerContext);
};

export const MonopolySocketProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [socket, setSocket] = useState<Socket>(io(
    process.env.NEXT_PUBLIC_MONOPOLY_SOCKET_URL || "http://localhost:9000",
    {
      withCredentials: true,
    }
  ));
  const [isConnected, setIsConnected] = useState(false);
  const [roomKey, setRoomKey] = useState("");
  const [ord, setOrd] = useState(-1);
  const [ready, setReady] = useState(false);
  const params = useParams();
  const router = useRouter();
  const user = useSession();
  const dispatch = useDispatch<AppDispatch>();
  const [broker, setBroker] = useState<SocketBroker | null>(null)

  useEffect(() => {
    const gameName = params.gameName;
    const roomId = params.roomId;
    const roomKey = `${gameName}:${roomId}`;
    setRoomKey(roomKey);

    const playerName = user.data?.user?.name;

    socket.on("joinFailed", () => {
      console.log("Room is full now");
      router.push("/monopoly");
    });

    socket.on("connect", () => {
      console.log("Connected to Socket.io server");
      socket.emit("joinRoom", { playerName, roomKey });
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from Socket.io server");
    });

    socket.on("explosion", () => {
      console.log("You win.");
      router.push("/monopoly");
      dispatch(
        openModal({
          type: "gameResult",
          data: { result: "win" },
        })
      );
    });

    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setBroker(new SocketBroker(socket,{ready, setReady},router))
  }, [socket, ready, router])

  return (
    <SocketBrokerContext.Provider value={{ broker, isConnected, roomKey, ord }}>
      {children}
    </SocketBrokerContext.Provider>
  );
};
