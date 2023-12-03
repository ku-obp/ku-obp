"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import io from "socket.io-client";

import { AppDispatch, useAppSelector } from "@/redux/store";
import {  } from "@/redux/features/two-worlds-slice";
import { openModal } from "@/redux/features/modal-slice";
import { over } from "lodash";

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

function areAllMappedToEqual<T, M>(arr: T[], map_fn: (item: T) => M, eq: (a: M, b:M) => boolean = (a,b) => (a === b)): boolean {
  if(arr.length > 0){
    const prevMapped: M[] = []
    for(const mapped of arr.map(map_fn)) {
      const popped = prevMapped.pop()
      if(popped === undefined) {
        prevMapped.push(mapped)
      } else if (mapped === popped) {
        prevMapped.push(mapped)
      } else {
        return false;
      }
    }
  }
  return true;
}


function getResult(myEmail: string | null | undefined, orig: {
  playerEmail: string,
  value: number,
  rank: number
}[]): string {
  if(myEmail === null || myEmail === undefined) {
    return ""
  }
  const copied = Array.from(orig).sort((a,b) => a.rank - b.rank)
  let isFirst = true
  let [prev_value, prev_rank] = [0,0]
  for(let {value, rank} of copied) {
    if(isFirst) {
      [prev_value, prev_rank] = [value, rank]
      isFirst = false
    } else if(prev_value === value) {
      rank = prev_rank
    }
  }
  if(areAllMappedToEqual<
    {
      playerEmail: string,
      value: number,
      rank: number
    }, number
  >(copied,({rank}) => rank)) {
    return "draw"
  }
  else {
    const myIdx = copied.findIndex(({playerEmail}) => playerEmail === myEmail)
    if (myIdx < 0) {
      return ""
    } else {
      return (copied[myIdx].rank === 1) ? "win" : "lose"
    }
  }
}

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
  const state = useAppSelector((state) => state.twoWorldsReducer);

  useEffect(() => {
    const gameName = params.gameName;
    const roomId = params.roomId;
    const roomKey = `${gameName}:${roomId}`;
    setRoomKey(roomKey);

    const playerEmail = user.data?.user?.email;

    const socket = io(
      process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:4000",
      {
        withCredentials: true,
      }
    );
    

    socket.on("joinFailed", () => {
      console.log("Room is full now");
      router.push("/two-worlds");
    });

    socket.on("connect", () => {
      console.log("Connected to Socket.io server");
      socket.emit("joinRoom", { playerEmail, roomKey });
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from Socket.io server");
      dispatch(notifyDisconnect());
    });

    socket.on("endGame", (overall_finances: {
      playerEmail: string,
      value: number
    }[]) => {      
      const result = getResult(user.data?.user?.email,overall_finances.toSorted((a,b) => a.value - b.value).map(({playerEmail,value},index) => ({playerEmail,value,rank: (index + 1)})))

      console.log("game ended.");
      router.push("/two-worlds");
      dispatch(freeze());
      dispatch(
        openModal({
          type: "gameResult",
          data: { result },
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
