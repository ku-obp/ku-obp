"use client"

import React, { useState, useEffect } from "react"
import { PLAYER_COLORS } from "@/lib/two-worlds"

import {PlayerIconType, PREDEFINED_CELLS, PropertyType, PlayerType, GameStateType, AllStateType } from "@/redux/features/two-worlds-slice"

import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";


import {useSocket} from "@/components/providers/two-worlds-socket-provider"

import {arrayRange} from "@/lib/utils"
import { ChanceCardDisplay } from "./two-worlds-chance-card-display";
import TwoWorldsAction from './two-worlds-action';
import { DicesDisplay } from "./two-worlds-dices";

export const TwoWorldsControlPanel = ({height}: {height: number}) => {

   
   const dispatch = useDispatch<AppDispatch>();
   const {gameState, roomState, turnState}  = useAppSelector((state) => state.twoWorldsReducer);

   const {
      socket, roomId, playerEmail
   } = useSocket()


   

   

    return <>
      <div style={{backgroundColor: "black", width: 300, height: 600, justifyContent: "center", alignItems: "center", display:"flow-root"}}>
         <p style={{color: PLAYER_COLORS[gameState.nowInTurn]}}>현재 턴 : {roomState.playerEmails[gameState.nowInTurn]}</p>
         <DicesDisplay diceCache={turnState.diceCache} scale={0.75} />
         <div style={{margin: 20}}>
            <p style={{color:"white", textAlign: "center"}}><strong>변화 카드</strong></p>
            <ChanceCardDisplay chanceId={""} width={260}/>
         </div>
         <div>
            <p style={{color:"white", textAlign: "center"}}><strong>플레이어 현황</strong></p>
            {gameState.playerStates.map((state) => 
               <>
                  <p style={{color: PLAYER_COLORS[state.icon]}}>{roomState.playerEmails[state.icon]}</p>
                  <p style={{color: PLAYER_COLORS[state.icon]}}>현금 : {state.cash}</p>
                  <p style={{color: PLAYER_COLORS[state.icon]}}>바퀴수 : {state.cycles}</p>
               </>
            )}
         </div>
         <div>
            <TwoWorldsAction socket={socket} roomId={roomId} playerEmail={playerEmail} />
         </div>
         {turnState.prompt === "quirkOfFate" && <DicesDisplay diceCache={turnState.quirkOfFateDiceCache} scale={0.75} />}
      </div>
   </>
}