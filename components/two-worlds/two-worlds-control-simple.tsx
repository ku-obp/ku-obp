"use client"

import React, { useState, useEffect } from "react"
import { PLAYER_COLORS, PropertiesRegistry } from "@/lib/two-worlds"

import {PlayerIconType, PREDEFINED_CELLS, DiceType, PropertyType, PlayerType, GameStateType} from "@/redux/features/two-worlds-slice"

import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";


import {useSocket} from "@/components/providers/two-worlds-socket-provider"

import {arrayRange} from "@/lib/utils"

type DicesType = {
   dice1: DiceType,
   dice2: DiceType
}

function isValidDices(dices: [DiceType | 0, DiceType | 0]): boolean {
   return ((dices[0] !== 0) && (dices[1] !== 0))
}


class ControlStatus {
   public get sellables() { return this._sellables }
   public get myPlayer() { return this._myPlayer }
   public get isInTurn() { return this._isInTurn }
   public get now() { return this._now }
   public get myLocation() { return this._myLocation }
   public get propsHere() { return this._propsHere }
   public get skippable() { return this._skippable }
   public get enoughMoneyToConstruct() { return this._enoughMoneyToConstruct }
   public get inJail() { return this._inJail }
   public get ableToJailbreakByDice() { return this._ableToJailbreakByDice }
   public get ableToJailbreakByMoney() { return this._ableToJailbreakByMoney }
   public get requestableForBasicIncome() { return this._requestableForBasicIncome }
   public get normallyRollable() { return this._normallyRollable }

   private readonly _sellables: PropertyType[]
   private readonly _myPlayer: PlayerType | null
   private readonly _isInTurn: boolean
   private readonly _now: string
   private readonly _myLocation: number
   private readonly _propsHere: PropertyType | undefined
   private readonly _skippable: boolean
   private readonly _enoughMoneyToConstruct: boolean
   private readonly _inJail: boolean
   private readonly _ableToJailbreakByDice: boolean
   private readonly _ableToJailbreakByMoney: boolean
   private readonly _requestableForBasicIncome: boolean
   private readonly _normallyRollable: boolean

   public constructor(gameState: GameStateType, playerEmail: string) {
      this._sellables = gameState.properties.filter(p => p.ownerEmail === playerEmail && p.count > 0)
      this._myPlayer = gameState.players.find((player) => player.email === playerEmail) ?? null
      this._isInTurn = this._myPlayer?.icon === gameState.nowInTurn
      this._now = gameState.players.find(p => p.icon === gameState.nowInTurn)?.email ?? ""

      this._myLocation = this._myPlayer?.location ?? 0
      this._propsHere = this._sellables.find(s => s.cellId === this._myLocation)
      this._skippable = (PREDEFINED_CELLS[this._myLocation % 54].isBuildable !== 0) &&
      ((this._propsHere !== undefined && this._propsHere.ownerEmail === playerEmail) || this._propsHere === undefined) 
      this._enoughMoneyToConstruct = this._skippable && (this._myPlayer !== null) && (this._myPlayer.cash >= 300000)
      const _inJail = (this._myPlayer?.location === 9)
      this._inJail = _inJail
      this._ableToJailbreakByDice = this._inJail
      this._ableToJailbreakByMoney = _inJail && (this._myPlayer.cash >= 400000)
      this._requestableForBasicIncome = (gameState.govIncome > 0) && (!this._inJail)
      this._normallyRollable = (!this._inJail)
   }
}

type SellCommandType = {cellId: number, amount: 1 | 2 | 3}

function parseSellCommand(cmd: string): SellCommandType[] {
   const cmdlets = cmd.split(" ")
   const output: SellCommandType[] = []
   for(const cmdlet of cmdlets) {
      if(new RegExp(/(\d+)(-\d+)?/).test(cmdlet)) {
         const params = cmdlet.split("-")
         const cellId = Number.parseInt(params[0])
         const amount = Number.parseInt(params[1])
         if(amount === 1 || amount === 2 || amount === 3) {
            output.push({cellId, amount})
            continue
         } else {
            return []
         }
      }
      else {
         return []
      }
   }
   return output
}


export const TwoWorldsControlPanel = ({height}: {height: number}) => {

   
   const dispatch = useDispatch<AppDispatch>();
   const allState = useAppSelector((state) => state.twoWorldsReducer);

   const {gameState, latestChance, latestPayments, frozen, dices} = allState

   const {
      playerEmail,
      jailbreakByMoney,
      construct,
      sell,
      normallyRollDice,
      requestBasicIncome,
      tryJailbreakByDice,
      skip
   } = useSocket()


   const [controlStatus, setControlStatus] = useState<ControlStatus | null>(null)

   const [sellCommands, setSellCommands] = useState<SellCommandType[]>([])

   useEffect(() => {
      setControlStatus(new ControlStatus(gameState,playerEmail))
   }, [gameState, playerEmail])

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
                     <div style={{backgroundColor: (latestPayments !== null && controlStatus !== null) ? "#8228b1ff" : "#6d6d6d", textAlign: "center", height: 50, width:140, alignItems: "center", justifyContent: "center", display: "flex"}}>
                        <p style={{color:"white", fontSize: 13}} onClick={(e) => {
                        if(latestPayments !== null && controlStatus !== null) {
                           construct(controlStatus.myLocation)
                        }
                     }}><strong>산다</strong></p>
                     </div>
                     <div style={{backgroundColor: (controlStatus !== null && controlStatus.skippable) ? "#bf47a1ff" : "#6d6d6d", textAlign: "center", height: 50, width:140, alignItems: "center", justifyContent: "center", display: "flex"}}>
                        <p style={{color:"white", fontSize: 13}} onClick={(e) => {
                           if(controlStatus !== null && controlStatus.skippable) {
                              skip()
                           }
                        }}><strong>사지 않는다</strong></p>
                     </div>
                  </div>
                  <div style={{backgroundColor: (controlStatus !== null && controlStatus.sellables) ? "#1651beff" : "#6d6d6d", textAlign: "center", height: 100, width:140, alignItems: "center", justifyContent: "center", display: "flex", flexDirection: "column"}}>
                     <input style={{height: 15, width: 120}} onChange={(e) => {
                        setSellCommands(parseSellCommand(e.target.value))
                     }} />
                     <p style={{color:"white", fontSize: 13}} onClick={(e) => {
                        if(controlStatus !== null && controlStatus.sellables) {
                           for(const cmd of sellCommands) {
                              sell(cmd.cellId, cmd.amount)
                           }
                        }
                     }}><strong>판다</strong></p>
                  </div>
            </div>
         </div>
         <div>
            <p style={{color: "white", textAlign: "center"}}><strong>기본 동작</strong></p>
            <div style={{display: "flex", marginLeft: 20, marginRight: 20}}>
                  <div style={{backgroundColor: (controlStatus !== null && controlStatus.normallyRollable) ? "#7bce7dff" : "#6d6d6d", textAlign: "center", height: 50, width:140, alignItems: "center", justifyContent: "center", display: "flex"}}>
                     <p style={{color:"white", fontSize: 13}} onClick={(e) => {
                        if(controlStatus !== null && controlStatus.normallyRollable) {
                           normallyRollDice()
                        }
                     }}><strong>주사위</strong></p>
                  </div>
                  <div style={{backgroundColor: (controlStatus !== null && controlStatus.requestableForBasicIncome) ? "#3a9c3cff" : "#6d6d6d", textAlign: "center", height: 50, width:140, alignItems: "center", justifyContent: "center", display: "flex"}}
                  onClick={(e) => {
                     if(controlStatus !== null && controlStatus.requestableForBasicIncome) {
                        requestBasicIncome()
                     }
                  }}>
                     <p style={{color:"white", fontSize: 13}}><strong>기본소득</strong></p>
                  </div>
            </div>
         </div>
         <div>
            <p style={{color: (controlStatus !== null && controlStatus.ableToJailbreakByDice) ? "white" : "#6d6d6d", textAlign: "center"}}><strong>감옥 동작</strong></p>
            <div style={{display: "flex", marginLeft: 20, marginRight: 20}}>
                  <div style={{backgroundColor: "#ce7b7bff", textAlign: "center", height: 50, width:140, alignItems: "center", justifyContent: "center", display: "flex"}}
                  onClick={(e) => {
                     if(controlStatus !== null && controlStatus.ableToJailbreakByDice) {
                        tryJailbreakByDice()
                     }
                  }}>
                     <p style={{color:"white", fontSize: 13}}><strong>주사위</strong></p>
                  </div>
                  <div style={{backgroundColor: (controlStatus !== null && controlStatus.ableToJailbreakByMoney) ? "#9c3a3aff" : "#6d6d6d", textAlign: "center", height: 50, width:140, alignItems: "center", justifyContent: "center", display: "flex"}}
                  onClick={(e) => {
                     if(controlStatus !== null && controlStatus.ableToJailbreakByMoney) {
                        jailbreakByMoney()
                     }
                  }}>
                     <p style={{color:"white", fontSize: 13}}><strong>보석금 지불</strong></p>
                  </div>
            </div>
         </div>
         <div>
            <p style={{color: "white", textAlign: "center"}}><strong>{isValidDices(dices) && `주사위 : [${dices[0]}], [${dices[1]}]`}</strong></p>
         </div>
      </div>
      </>
}