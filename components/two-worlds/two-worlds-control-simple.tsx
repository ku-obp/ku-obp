"use client"

import React, { useState, useEffect } from "react"
import { PLAYER_COLORS, PropertiesRegistry } from "@/lib/two-worlds"

import {PlayerIconType, PREDEFINED_CELLS, DiceType} from "@/redux/features/two-worlds-slice"

import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";


import {useSocket} from "@/components/providers/two-worlds-socket-provider"

import {arrayRange} from "@/lib/utils"

type DicesType = {
   dice1: DiceType,
   dice2: DiceType
}


export const TwoWorldsControlPanel = ({height}: {height: number}) => {

   
   const dispatch = useDispatch<AppDispatch>();
   const allState = useAppSelector((state) => state.twoWorldsReducer);

   const {gameState, latestChance, latestPayments, dicesDisplay, frozen} = allState

   const {socket,
        isConnected,
        roomKey,
        icon,
        jailbreakByMoney,
        tryJailbreakByDice,
        normallyRollDice,
        requestBasicIncome,
        playerEmail,
        construct,
        isTurnBegin,
        sell
   } = useSocket()

   const sellables = gameState.properties.filter(p => p.ownerEmail === playerEmail && p.count > 0)
   const myPlayer = gameState.players.find((player) => player.email === playerEmail)
   const isInTurn = myPlayer?.icon === gameState.nowInTurn
   const now = gameState.players.find(p => p.icon === gameState.nowInTurn)?.email ?? ""

   const myLocation = myPlayer?.location ?? 0
   const props_here = sellables.filter(s => s.cellId === myLocation)
   const skippable = (PREDEFINED_CELLS[myLocation % 54].isBuildable !== 0) &&
   ((props_here.length > 0 && props_here[0].ownerEmail === playerEmail) || props_here.length === 0) 
   const enoughMoneyToConstruct = skippable && (myPlayer !== undefined) && (myPlayer.cash >= 300000)
   
   const inJail = (myPlayer?.location === 9)
   const ableToJailbreakByDice = inJail
   const ableToJailbreakByMoney = inJail && (myPlayer !== undefined) && (myPlayer.cash >= 400000)
   const requestableForBasicIncome = (gameState.govIncome > 0) && (!inJail)
   const normallyRollable = (!inJail)

   const [dices, setDices] = useState<DicesType | null>(null)

   useEffect(() => {
      if (dicesDisplay[0] === 0 || dicesDisplay[1] === 0) {
         setDices(null)
      } else {
         setDices({
            dice1: dicesDisplay[0],
            dices2: dicesDisplay[1]
         })
      }
   }, [dicesDisplay])


    return <>
      <div style={{backgroundColor: "black", width: 300, height: 600, justifyContent: "center", alignItems: "center", display:"flow-root"}}>
         <div style={{margin: 20}}>
            <p style={{color:"white", textAlign: "center"}}><strong>변화 카드</strong></p>
            <div>
                  <div style={{backgroundColor: "#e4c48d", textAlign: "center", height: 30, alignItems: "center", justifyContent: "center", display: "flex"}}>
                     <p style={{color:"#d14a2a"}}><strong>카드명</strong></p>
                  </div>
                  <div style={{backgroundColor: "#d14a2a", textAlign: "center", height: 105, alignItems: "center", justifyContent: "center", display: "flex"}}>
                     <p style={{color:"white", fontSize: 13}}>설명</p>
                  </div>
            </div>
         </div>
         <div>
            <p style={{color:"white", textAlign: "center"}}><strong>거래</strong></p>
            <div style={{display: "flex", marginLeft: 20, marginRight: 20}}>
                  <div style={{display: "flex", flexDirection: "column"}}>
                     <div style={{backgroundColor: "#8228b1ff", textAlign: "center", height: 50, width:140, alignItems: "center", justifyContent: "center", display: "flex"}}
                     onClick={(e) => {
                        if(latestPayments !== null) {
                           construct(myLocation)
                        }
                     }}>
                        <p style={{color:"white", fontSize: 13}}><strong>산다</strong></p>
                     </div>
                     <div style={{backgroundColor: "#bf47a1ff", textAlign: "center", height: 50, width:140, alignItems: "center", justifyContent: "center", display: "flex"}}>
                        <p style={{color:"white", fontSize: 13}}><strong>사지 않는다</strong></p>
                     </div>
                  </div>
                  <div style={{backgroundColor: "#1651beff", textAlign: "center", height: 100, width:140, alignItems: "center", justifyContent: "center", display: "flex"}}
                  onClick={(e) => {

                  }}>
                     <p style={{color:"white", fontSize: 13}}><strong>판다</strong></p>
                  </div>
            </div>
         </div>
         <div>
            <p style={{color:"white", textAlign: "center"}}><strong>기본 동작</strong></p>
            <div style={{display: "flex", marginLeft: 20, marginRight: 20}} onClick={(e) => {
               normallyRollDice()
            }}>
                  <div style={{backgroundColor: "#7bce7dff", textAlign: "center", height: 50, width:140, alignItems: "center", justifyContent: "center", display: "flex"}}>
                     <p style={{color:"white", fontSize: 13}}><strong>주사위</strong></p>
                  </div>
                  <div style={{backgroundColor: "#3a9c3cff", textAlign: "center", height: 50, width:140, alignItems: "center", justifyContent: "center", display: "flex"}}
                  onClick={(e) => {requestBasicIncome()}}>
                     <p style={{color:"white", fontSize: 13}}><strong>기본소득</strong></p>
                  </div>
            </div>
         </div>
         <div>
            <p style={{color:"white", textAlign: "center"}}><strong>감옥 동작</strong></p>
            <div style={{display: "flex", marginLeft: 20, marginRight: 20}}>
                  <div style={{backgroundColor: "#ce7b7bff", textAlign: "center", height: 50, width:140, alignItems: "center", justifyContent: "center", display: "flex"}}
                  onClick={(e) => {tryJailbreakByDice()}}>
                     <p style={{color:"white", fontSize: 13}}><strong>주사위</strong></p>
                  </div>
                  <div style={{backgroundColor: "#9c3a3aff", textAlign: "center", height: 50, width:140, alignItems: "center", justifyContent: "center", display: "flex"}}
                  onClick={(e) => {jailbreakByMoney()}}>
                     <p style={{color:"white", fontSize: 13}}><strong>보석금 지불</strong></p>
                  </div>
            </div>
         </div>
         <div>
            <p style={{color: "white", textAligh: "center"}}><strong>{dices !== null && `주사위 : [${dices.dice1}], [${dices.dice2}]`}</strong></p>
         </div>
      </div>
      </>
}