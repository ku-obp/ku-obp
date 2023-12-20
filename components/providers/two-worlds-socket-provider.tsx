"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useDispatch, connect } from "react-redux";
import io from "socket.io-client";

import { AppDispatch, useAppSelector } from "@/redux/store";
import { PaymentTransactionJSON, PlayerIconType, PropertyType, GameStateType, updateChanceCardDisplay, showQuirkOfFateStatus, refreshGameState, eraseQuirkOfFateStatus, AllStateType, PlayerType, publishChanceCard, notifyRoomStatus, showDices, flushDices, updatePrompt, updateDoublesCount, updateGameState, TicketType } from "@/redux/features/two-worlds-slice";
import {openModal} from "@/redux/features/modal-slice"

import copy from 'fast-copy'

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

function parseProperty(raw: string): PropertyType {
  const parsed = JSON.parse(raw)
  const {
    ownerIcon,
    count
  } = parsed as PropertyType
  return {
    ownerIcon,
    count
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

    socket.on("refresh", (count: number) => {
      
    })

    socket.on("notifyRoomStatus", (playerEmails: string[], isEndedStringified: string) => {
      const isEnded = JSON.parse(isEndedStringified) as boolean
      dispatch(notifyRoomStatus({playerEmails,isEnded}))
    })
    socket.on("refreshGameState", (playerEmails: string[], isEndedStringified: string, playerStateStrings: string[], cellIds: number[], rawProperties: string, nowInTurn: number, govIncome: number, charityIncome: number, remainingCatastropheTurns: number, remainingPandemicTurns: number, doublesCount: number, diceCache: number, chanceId: string, prompt: string) => {
      const isEnded = JSON.parse(isEndedStringified) as boolean
      console.log(playerStateStrings.length)
      const playerStates: PlayerType[] = playerStateStrings.map((raw) => {
        const parsed = JSON.parse(raw)
        const {
          icon,
          location,
          displayLocation,
          cash,
          cycles,
          university,
          ticketFeeExemption,
          ticketTaxExemption,
          ticketBonus,
          ticketDoubleLotto,
          ticketLawyer,
          ticketFreeHospital,
          remainingJailTurns
        } = parsed
        return {
          icon: icon as number,
          location: location as number,
          displayLocation: displayLocation as number,
          cash: cash as number,
          cycles: cycles as number,
          university: copy(university as string),
          tickets: {
            feeExemption: ticketFeeExemption as number,
            taxExemption: ticketTaxExemption as number,
            bonus: ticketBonus as number,
            doubleLotto: ticketDoubleLotto as number,
            lawyer: ticketLawyer as number,
            freeHospital: ticketFreeHospital as number
          } as TicketType,
          remainingJailTurns: remainingJailTurns as number
        } as PlayerType
      })

      const propertiesJSON = JSON.parse(rawProperties)
      console.log(propertiesJSON)

      const pairs = cellIds.map((cellId) => [cellId, parseProperty(propertiesJSON[`cell${cellId}`] as string)] as [number,PropertyType])
      const properties = new Map<number,PropertyType>(pairs)

      dispatch(refreshGameState(
        {
          playerEmails: playerEmails,
          isEnded: isEnded,
          gs: {
            playerStates: playerStates, properties: properties, nowInTurn: nowInTurn,
            govIncome: govIncome,
            charityIncome: charityIncome,
            remainingCatastropheTurns: remainingCatastropheTurns,
            remainingPandemicTurns: remainingPandemicTurns
          },
          ts: {
            doublesCount: doublesCount,
            diceCache: diceCache,
            quirkOfFateDiceCache: quirkOfFateDiceCache,
            prompt: prompt,
            chanceCardDisplay: chanceId
          }
        }
      ))
    })

    
    socket.on("updateGameState", (playerStateStrings: string[], cellIds: number[], rawProperties: string, nowInTurn: number, govIncome: number, charityIncome: number, remainingCatastropheTurns: number, remainingPandemicTurns: number) => {
      console.log(playerStateStrings.length)
      const playerStates: PlayerType[] = playerStateStrings.map((raw) => {
        const parsed = JSON.parse(raw)
        const {
          icon,
          location,
          displayLocation,
          cash,
          cycles,
          university,
          ticketFeeExemption,
          ticketTaxExemption,
          ticketBonus,
          ticketDoubleLotto,
          ticketLawyer,
          ticketFreeHospital,
          remainingJailTurns
        } = parsed
        return {
          icon: icon as number,
          location: location as number,
          displayLocation: displayLocation as number,
          cash: cash as number,
          cycles: cycles as number,
          university: copy(university as string),
          tickets: {
            feeExemption: ticketFeeExemption as number,
            taxExemption: ticketTaxExemption as number,
            bonus: ticketBonus as number,
            doubleLotto: ticketDoubleLotto as number,
            lawyer: ticketLawyer as number,
            freeHospital: ticketFreeHospital as number
          } as TicketType,
          remainingJailTurns: remainingJailTurns as number
        } as PlayerType
      })

      const propertiesJSON = JSON.parse(rawProperties)
      console.log(propertiesJSON)

      const pairs = cellIds.map((cellId) => [cellId, parseProperty(propertiesJSON[`cell${cellId}`] as string)] as [number,PropertyType])
      const properties = new Map<number,PropertyType>(pairs)

      dispatch(updateGameState({playerStates, properties, nowInTurn,
        govIncome: govIncome,
        charityIncome: charityIncome,
        remainingCatastropheTurns: remainingCatastropheTurns,
        remainingPandemicTurns: remainingPandemicTurns}))
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