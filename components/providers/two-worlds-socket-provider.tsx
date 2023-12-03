"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import io from "socket.io-client";

import { AppDispatch, useAppSelector } from "@/redux/store";
import { PaymentTransactionJSON, PlayerIconType, freeze, flushChances, flushPayments, notifyChanceCardAcquistion, notifyPayments, QueuesType, GameStateType, updateGameState, refreshRQ } from "@/redux/features/two-worlds-slice";
import { openModal } from "@/redux/features/modal-slice";

type SocketContextType = {
  socket: any | null;
  isConnected: boolean;
  roomKey: string;
  icon: PlayerIconType | null;
  jailbreakByMoney: () => void;
  tryJailbreakByDice: () => void;
  normallyRollDice: () => void;
  requestBasicIncome: () => void;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
  roomKey: "",
  icon: null,
  jailbreakByMoney: () => {},
  tryJailbreakByDice: () => {},
  normallyRollDice: () => {},
  requestBasicIncome: () => {}
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

export type SyncQueueEventPayload = {
  kind: "notifyChanceCardAcquistion",
  queue: {
    chances: {
      queue: string[],
      processed: number
    },
    payments: {
      queue: {
        cellId: number;
        mandatory: PaymentTransactionJSON | null,
        optional: PaymentTransactionJSON | null
      }[],
      processed: number
    }
  },
  payload: {
    description: string,
    displayName: string
  }
} | {
  kind: "notifyPayments",
  queue: {
    chances: {
      queue: string[],
      processed: number
    },
    payments: {
      queue: {
        cellId: number
        mandatory: PaymentTransactionJSON | null,
        optional: PaymentTransactionJSON | null
      }[],
      processed: number
    }
  },
  payload: {
    type: string,
    name: string,
    maxBuildable: 0 | 1 | 3,
    invoices: {
      mandatory: PaymentTransactionJSON | null,
      optional: PaymentTransactionJSON | null
    }
  }
} | {
  kind: "flushPayments" | "flushChances",
  queue: {
    chances: {
      queue: string[],
      processed: number
    },
    payments: {
      queue: {
        cellId: number
        mandatory: PaymentTransactionJSON | null,
        optional: PaymentTransactionJSON | null
      }[],
      processed: number
    }
  },
  payload: undefined
}

import { Socket } from "socket.io-client";
import { sample } from "lodash";

type ChanceCard = {
    description: string,
    displayName: string
}

export const CHANCE_CARDS: {
    [chanceId: string]: ChanceCard
} = {
    "free-lotto": {
      description: "복권 당첨을 축하드립니다! 100만원을 받습니다.",
      displayName: "복권당첨"
    },
    "scholarship": {
      description: "특별한 당신, 장학금을 받기까지 참 열심히 살았습니다. 수고 많았습니다. 대학(원)으로갑니다. (수업료 무료)",
      displayName: "장학금"
    },
    "discountRent": {
      description: "경기부양을 위해 소비 진작 할인쿠폰이 발행되었습니다. 토지/건물 사용료 50% 감면받습니다.",
      displayName: "임대료 감면"
    },
    "bonus": {
      description: "회사가 증권시장에 상장되었습니다. 다음 차례 출발지를 지나갈 때 성과급 포함 2배의 급여를 받습니다.",
      displayName: "보너스 지급"
    },
    "doubleLotto": {
        description: "복권 게임 시 당첨금 2배가 됩니다.",
        displayName: "곱빼기 복권"
    },
    "limitRents": {
        description: "부동산투기가 심각합니다. 전면적인 임대료 통제정책이 시행됩니다. 1턴 동안 임대료가 면제됩니다.",
        displayName: "임대료 통제",
    }
}

function rollDice() {
  const dice1 = sample([1,2,3,4,5,6])
  const dice2 = sample([1,2,3,4,5,6])

  return {
    dice1, dice2
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
  const [icon, setIcon] = useState<PlayerIconType | null>(null)
  const params = useParams();
  const router = useRouter();
  const user = useSession();
  const dispatch = useDispatch<AppDispatch>();
  const [playerEmail, setPlayerEmail] = useState("")

  const [jailbreakByMoney, setJailbreakByMoney] = useState<() => void>(() => {})
  const [tryJailbreakByDice, setTryJailbreakByDice] = useState<() => void>(() => {})
  const [normallyRollDice, setNormallyRollDice] = useState<() => void>(() => {})
  const [command, setCommand] = useState("")
  const [doubles, setDoubles] = useState(0)

  const [requestBasicIncome, setRequestBasicIncome] = useState<() => void>(() => {})

  useEffect(() => {
    const gameName = params.gameName;
    const roomId = params.roomId;
    const roomKey = `${gameName}:${roomId}`;
    setRoomKey(roomKey);

    const playerEmail = user.data?.user?.email;

    setPlayerEmail((playerEmail ?? null)?.toString() ?? "")

    const socket = io(
      process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:4000",
      {
        withCredentials: true,
      }
    );
    
    socket.on("joinFailed", ({msg}: {msg: string}) => {
      console.log(msg);
    });

    socket.on("connect", () => {
      console.log("Connected to Socket.io server");
      socket.emit("joinRoom", { playerEmail, roomKey });
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from Socket.io server");
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

    socket.on("updateGameState", ({rejoined, gameState, rq}: {rejoined: false, gameState: GameStateType, rq: undefined} | {rejoined: true, gameState: GameStateType, rq: {
      chances: {
        queue: string[];
        processed: number;
      };
      payments: {
        queue: {
          cellId: number;
          mandatory: PaymentTransactionJSON | null;
          optional: PaymentTransactionJSON | null;
        }[];
        processed: number;
      }
    }}) => {
      updateGameState(gameState)
      if(rejoined) {
        dispatch(refreshRQ(rq))
      }
    })


    socket.on("syncQueue", ({kind, queue, payload}: SyncQueueEventPayload) => {
      const chances_queue = ((orig) => {
        return orig.queue.map((value) => ({
          displayCardName: CHANCE_CARDS[value].displayName,
          cardDescription: CHANCE_CARDS[value].description
        }))
      })(queue.chances)
      const queues: QueuesType = {
        chances: {
          queue: chances_queue,
          processed: queue.chances.processed
        },
        payments: queue.payments
      }
      if(kind === "notifyChanceCardAcquistion") {
        dispatch(notifyChanceCardAcquistion({queues,payload}))
      } else if(kind === "notifyPayments") {
        dispatch(notifyPayments({queues,payload}))
      } else if(kind === "flushPayments") {
        dispatch(flushPayments(queues))
      } else {
        dispatch(flushChances(queues))
      }
    })
    
    

    socket.on("turnBegin", ({playerNowEmail, doubles_count, askJailbrak}: {playerNowEmail: string, doubles_count: number, askJailbrak: boolean}) => {
      if(askJailbrak) {
        setCommand("askJailbreak")
      } else {
        setCommand("normal")
      }
      setDoubles(doubles_count)
    })

    socket.on("turnEnd", () => {
      socket.emit("nextTurn", roomKey)
    })

    setSocket(socket);

    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setRequestBasicIncome(() => {
      socket.emit("requestBasicIncome", roomKey)
    })
  }, [socket, roomKey])

  useEffect(() => {
    setJailbreakByMoney(() => {
      socket.emit("jailbreakByMoney", playerEmail)
    })
    setTryJailbreakByDice(() => {
      const {dice1, dice2} = rollDice()
      socket.emit("reportRollDiceResult", {roomKey, playerEmail, dice1, dice2, doubles_count: 0, flag_jailbreak: true})
    })
  }, [socket, playerEmail, roomKey])

  useEffect(() => {
    setNormallyRollDice(() => {
      const {dice1, dice2} = rollDice()
      socket.emit("reportRollDiceResult", {roomKey, playerEmail, dice1, dice2, doubles_count: doubles, flag_jailbreak: false})
    })
  }, [socket, playerEmail, roomKey, doubles])
  

  return (
    <SocketContext.Provider value={{
      socket, isConnected, roomKey, icon,
      jailbreakByMoney, tryJailbreakByDice, normallyRollDice, requestBasicIncome
    }}>
      {children}
    </SocketContext.Provider>
  );
};
