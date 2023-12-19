"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useDispatch, connect } from "react-redux";
import io from "socket.io-client";

import { AppDispatch, useAppSelector } from "@/redux/store";
import { PaymentTransactionJSON, PlayerIconType, PropertyType, GameStateType, updateGameState, updateChanceCardDisplay, showQuirkOfFateStatus, eraseQuirkOfFateStatus, AllStateType, PlayerType, publishChanceCard, notifyRoomStatus, showDices, flushDices, updatePrompt, updateDoublesCount } from "@/redux/features/two-worlds-slice";
import {openModal} from "@/redux/features/modal-slice"

type TwoWorldsContextType = {
  socket: any | null;
  isConnected: boolean;
  roomId: string;
  icon: PlayerIconType | null;
  playerEmail: string;
  isTurnBegin: boolean;
}

const TwoWorldsContext = createContext<TwoWorldsContextType>({
  socket: null,
  isConnected: false,
  roomId: "",
  icon: null,
  playerEmail: "",
  isTurnBegin: false
})

export const useSocket = () => {
  return useContext(TwoWorldsContext);
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

export function rollDice() {
  const dice1 = sample([1,2,3,4,5,6])
  const dice2 = sample([1,2,3,4,5,6])

  return {
    dice1, dice2
  }
}


import { getSingleString } from "@/lib/utils";

export const TwoWorldsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [socket, setSocket] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [icon, setIcon] = useState<PlayerIconType | null>(null)
  const params = useParams();
  const router = useRouter();
  const user = useSession();
  const dispatch = useDispatch<AppDispatch>();
  const [playerEmail, setPlayerEmail] = useState("")

  const [sell, setSell] = useState<(cellId: number, amount: 1 | 2 | 3) => void>((cellId: number, amount: 1 | 2 | 3) => {})

  const [isTurnBegin, setIsTurnBegin] = useState<boolean>(false)

  const [jailbreakByMoney, setJailbreakByMoney] = useState<() => void>(() => {})
  const [tryJailbreakByDice, setTryJailbreakByDice] = useState<() => void>(() => {})
  const [normallyRollDice, setNormallyRollDice] = useState<() => void>(() => {})
  const [command, setCommand] = useState("")
  const [construct, setConstruct] = useState<(cellId: number) => void>((cellId: number) => {})

  const [requestBasicIncome, setRequestBasicIncome] = useState<() => void>(() => {})
  const [skip, setSkip] = useState<() => void>(() => {})

  useEffect(() => {
    setRoomId(getSingleString(params.roomId))
    setPlayerEmail(String((user.data?.user?.email) || ""))

    const socket = io(
      process.env.NEXT_PUBLIC_TWO_WORLDS_SOCKET_URL || "http://localhost:11000",
      {
        withCredentials: true,
      }
    );
    
    socket.on("joinFailed", ({msg}: {msg: string}) => {
      console.log(`${playerEmail} Failed to join the room: ${msg}`);
    });

    socket.on("joinSucceed", () => {
      console.log('Succeeded to join the room')
    })

    socket.on("connect", () => {
      console.log(`${playerEmail} Connected to Socket.io server`);
      socket.emit("joinRoom", { roomId: params.roomId });
    });


    socket.on("disconnect", () => {
      console.log("Disconnected from Socket.io server");
    });

    
    socket.on("notifyRoomStatus", (playerEmails: string[], isEnded: boolean) => {
      dispatch(notifyRoomStatus({playerEmails,isEnded}))
    })

    socket.on("updateGameState", (playerStates: string,
      properties: string,
      nowInTurn: number,
      govIncome: number,
      charityIncome: number,
      remainingCatastropheTurns: number,
      remainingPandemicTurns: number) => {
      const playerStates_parsed = JSON.parse(playerStates)
      const properties_parsed = JSON.parse(properties)
      
      const playerStatesPostprocessed = playerStates_parsed.map((state: any) => {
        return {
          icon: state.icon,
          location: state.location,
          displayLocation: state.displayLocation,
          cash: state.cash,
          cycles: state.cycles,
          university: state.univertisy,
          tickets: {
            feeExemption: state.tickets.feeExemption,
            taxExemption: state.tickets.taxExemption,
            bonus: state.tickets.bonus,
            doubleLotto: state.tickets.doubleLotto,
            lawyer: state.tickets.lawyer,
            freeHospital: state.tickets.freeHospital
          },
          remainingJailTurns: state.remainingJailTurns
        } as PlayerType
      })
      
      const propertiesPostprocessed = properties_parsed.map((prop: any) => {
        return [prop.cellId as number,{
          ownerIcon: prop.ownerIcon,
          count: prop.count
        } as PropertyType]
      })

      const gameState: GameStateType = {
        charityIncome,
        govIncome,
        nowInTurn,
        sidecars: {
          catastrophe: remainingCatastropheTurns,
          pandemic: remainingPandemicTurns
        },
        playerStates: Array.from(playerStatesPostprocessed),
        properties: new Map<number, PropertyType>(propertiesPostprocessed)
      }

      dispatch(updateGameState(gameState))
    })

    socket.on("showQuirkOfFateStatus", (dice1: number, dice2: number) => {
      dispatch(showQuirkOfFateStatus({dice1, dice2}))
    })

    socket.on("updateChanceCardDisplay", (chanceId: string) => {
      dispatch(publishChanceCard(chanceId))
    })

    socket.on("updateDoublesCount", (doublesCount: number) => {
      dispatch(updateDoublesCount(doublesCount))
    })

    socket.on("showDices", (diceCache: number) => {
      dispatch(showDices(diceCache))
    })

    socket.on("flushDices", () => {
      dispatch(flushDices())
    })


    socket.on("updatePrompt", (prompt: string) => {
      dispatch(updatePrompt(prompt))
    })





    socket.on("endGame", (overall_finances: {
      playerEmail: string,
      value: number
    }[]) => {
      
      const result = getResult(user.data?.user?.email,Array.from(overall_finances).sort((a,b) => a.value - b.value).map(({playerEmail,value},index) => ({playerEmail,value,rank: (index + 1)})))

      console.log("game ended.");
      router.push("/two-worlds");
      // dispatch(freeze());
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


  useEffect(() => {}, [])
  

  return (
    <TwoWorldsContext.Provider value={{
      socket, isConnected, roomId, icon, playerEmail, isTurnBegin
    }}>
      {children}
    </TwoWorldsContext.Provider>
  );
};