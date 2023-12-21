"use client"

import React, { useState, useEffect } from "react"
import { PLAYER_COLORS } from "@/lib/two-worlds"

import copy from 'fast-copy'

import {PlayerIconType, PREDEFINED_CELLS, PropertyType, PlayerType, GameStateType, AllStateType, TurnState, RoomState, initialState } from "@/redux/features/two-worlds-slice"

import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";


import {useSocket} from "@/components/providers/two-worlds-socket-provider"

import {arrayRange} from "@/lib/utils"
import { ChanceCardDisplay } from "./two-worlds-chance-card-display";
import TwoWorldsAction from './two-worlds-action';
import { DicesDisplay } from "./two-worlds-dices";

export const TwoWorldsControlPanel = ({height}: {height: number}) => {

   
   const dispatch = useDispatch<AppDispatch>();

   const allState = useAppSelector((state) => state.twoWorldsReducer);

   const {
      socket, roomId, playerEmail
   } = useSocket()


   

   

    return <>
      <div style={{backgroundColor: "black", width: 300, height: 600, justifyContent: "center", alignItems: "center", display:"flow-root"}}>
         <p style={{color: PLAYER_COLORS[allState.gameState.nowInTurn]}}>현재 턴 : {allState.roomState.playerEmails[allState.gameState.nowInTurn]}</p>
         <DicesDisplay diceCache={allState.turnState.diceCache} scale={0.5} />
         <div style={{margin: 20}}>
            <p style={{color:"white", textAlign: "center"}}><strong>변화 카드</strong></p>
            <ChanceCardDisplay chanceId={allState.turnState.chanceCardDisplay} width={260}/>
         </div>
         <div>
            <p style={{color:"white", textAlign: "center"}}><strong>플레이어 현황</strong></p>
            {copy(allState.gameState.playerStates).map((state) => 
               <>
                  <p style={{color: PLAYER_COLORS[state.icon]}}>{allState.roomState.playerEmails[state.icon]}</p>
                  <p style={{color: PLAYER_COLORS[state.icon]}}>현금 : {state.cash}</p>
                  <p style={{color: PLAYER_COLORS[state.icon]}}>바퀴수 : {state.cycles}</p>
               </>
            )}
         </div>
         <div>
            {(allState.roomState.playerEmails[allState.gameState.nowInTurn] === playerEmail) && <TwoWorldsAction socket={socket} roomId={roomId} playerEmail={playerEmail} />}
         </div>
         {(allState.turnState.prompt === "quirkOfFate") ? <DicesDisplay diceCache={allState.turnState.quirkOfFateDiceCache} scale={0.5} /> : <></>}
      </div>
   </>
}