"use client"

import React, { useState, useEffect } from "react"
import { PLAYER_COLORS } from "@/lib/two-worlds"

import {PlayerIconType, PREDEFINED_CELLS, PropertyType, PlayerType, GameStateType, AllStateType } from "@/redux/features/two-worlds-slice"

import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";


import {useSocket} from "@/components/providers/two-worlds-socket-provider"

import {arrayRange} from "@/lib/utils"

export const TwoWorldsControlPanel = ({height}: {height: number}) => {

   
   const dispatch = useDispatch<AppDispatch>();
   const {gameState, roomState, turnState}  = useAppSelector((state) => state.twoWorldsReducer);

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
                     <div style={{backgroundColor: "#8228b1ff", textAlign: "center", height: 50, width:140, alignItems: "center", justifyContent: "center", display: "flex"}}>
                        <p style={{color:"white", fontSize: 13}} onClick={(e) => {
                        
                     }}><strong>산다</strong></p>
                     </div>
                     <div style={{backgroundColor: "#bf47a1ff", textAlign: "center", height: 50, width:140, alignItems: "center", justifyContent: "center", display: "flex"}}>
                        <p style={{color:"white", fontSize: 13}} onClick={(e) => {
                           
                        }}><strong>사지 않는다</strong></p>
                     </div>
                  </div>
                  <div style={{backgroundColor: "#1651beff", textAlign: "center", height: 100, width:140, alignItems: "center", justifyContent: "center", display: "flex", flexDirection: "column"}}>
                     <input style={{height: 15, width: 120}} onChange={(e) => {
                        // setSellCommands(parseSellCommand(e.target.value))
                     }} />
                     <p style={{color:"white", fontSize: 13}} onClick={(e) => {
                        
                     }}><strong>판다</strong></p>
                  </div>
            </div>
         </div>
         <div>
            <p style={{color: "white", textAlign: "center"}}><strong>기본 동작</strong></p>
            <div style={{display: "flex", marginLeft: 20, marginRight: 20}}>
                  <div style={{backgroundColor: "#7bce7dff", textAlign: "center", height: 50, width:140, alignItems: "center", justifyContent: "center", display: "flex"}}>
                     <p style={{color:"white", fontSize: 13}} onClick={(e) => {
                        
                     }}><strong>주사위</strong></p>
                  </div>
                  <div style={{backgroundColor: "#3a9c3cff", textAlign: "center", height: 50, width:140, alignItems: "center", justifyContent: "center", display: "flex"}}
                  onClick={(e) => {
                     
                  }}>
                     <p style={{color:"white", fontSize: 13}}><strong>기본소득</strong></p>
                  </div>
            </div>
         </div>
         <div>
            <p style={{color: "white", textAlign: "center"}}><strong>감옥 동작</strong></p>
            <div style={{display: "flex", marginLeft: 20, marginRight: 20}}>
                  <div style={{backgroundColor: "#ce7b7bff", textAlign: "center", height: 50, width:140, alignItems: "center", justifyContent: "center", display: "flex"}}
                  onClick={(e) => {
                     // tryJailbreakByDice()
                  }}>
                     <p style={{color:"white", fontSize: 13}}><strong>주사위</strong></p>
                  </div>
                  <div style={{backgroundColor: "#9c3a3aff", textAlign: "center", height: 50, width:140, alignItems: "center", justifyContent: "center", display: "flex"}}
                  onClick={(e) => {
                     // jailbreakByMoney()
                  }}>
                     <p style={{color:"white", fontSize: 13}}><strong>보석금 지불</strong></p>
                  </div>
            </div>
         </div>
         <div>
            
         </div>
      </div>
      </>
}