"use client"

import React, { useState, useEffect } from "react"
import { PLAYER_COLORS, PropertiesRegistry } from "@/lib/two-worlds"

import {PlayerIconType, PREDEFINED_CELLS} from "@/redux/features/two-worlds-slice"

import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";


import {useSocket} from "@/components/providers/two-worlds-socket-provider"

import {arrayRange} from "@/lib/utils"

type Ability = {
   ableToRequestBasicIncome: boolean,
   inJail: boolean,
   jailbreakByMoney: boolean,
   construct: boolean,
   purchase: boolean,
   sell: boolean
}

export const TwoWorldsControlPanel = ({height}: {height: number}) => {

   
   const dispatch = useDispatch<AppDispatch>();
   const allState = useAppSelector((state) => state.twoWorldsReducer);

   const {gameState, latestChance, latestPayments, frozen} = allState

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

   const [controllable, setControllble] = useState<boolean>(false)

   const [myLocation, setMyLocation] = useState(0)

   const [abilities, setAbilities] = useState<Ability>({
      ableToRequestBasicIncome: false,
      inJail: false,
      jailbreakByMoney: false,
      purchase: false,
      construct: false,
      sell: false
   })

   const [now, setNow] = useState("")

   useEffect(() => {
      setMyLocation(gameState.players.find((player) => player.email === playerEmail)?.location ?? 0)
   }, [gameState, playerEmail])

   useEffect(() => {
      const nowInTurnPlayer = gameState.players.find(({icon}) => icon === gameState.nowInTurn)
      if(nowInTurnPlayer === undefined) {
         setControllble(false)
         setNow("")
      } else {
         setControllble((nowInTurnPlayer.email === playerEmail) && !frozen && isTurnBegin)
         setNow(nowInTurnPlayer.email)
      }
   }, [gameState, playerEmail, frozen, isTurnBegin])

   useEffect(() => {
      const ab: Ability = (() => {
         const inJail = ((player) => {
            return (player !== undefined) && PREDEFINED_CELLS[player.location].type === "jail"
         })(gameState.players.find((player) => player.email === playerEmail))
         const jailbreakByMoney = ((player) => {
            return (player !== undefined) && player.cash >= 400000
         })(gameState.players.find((player) => player.email === playerEmail)) && inJail
         const ableToRequestBasicIncome = (!inJail) && (gameState.govIncome > 0)

         if(latestPayments !== null) {
            return (() => {
               if(latestPayments.type === "industrial" || latestPayments.type === "land") {
               const construct = (gameState.properties.find((p) => (
                  (p.cellId === latestPayments.cellId) &&
                  (p.ownerEmail === playerEmail) &&
                  (p.count < PREDEFINED_CELLS[latestPayments.cellId].isBuildable)
               )) !== undefined) || (gameState.properties.find((p) => p.cellId === latestPayments.cellId) === undefined)
               const purchase = ((player) => {
                  return (player !== undefined) && (latestPayments.optional !== null) && (player.cash >= latestPayments.optional.pickByIcon(player.icon))
               })(gameState.players.find((player) => player.email === playerEmail)) && construct
               const sell = (gameState.properties.find((p) => (
                  (p.cellId === latestPayments.cellId) &&
                  (p.ownerEmail === playerEmail)
               )) !== undefined)
               return {
                  construct,
                  purchase,
                  sell,
                  inJail,
                  jailbreakByMoney,
                  ableToRequestBasicIncome
               }
               } else {
                  return {
                     construct: false,
                     purchase: false,
                     sell: false,
                     inJail,
                     jailbreakByMoney,
                     ableToRequestBasicIncome
                  }
               }
            })()
         } else {
            return {
               construct: false,
               purchase: false,
               sell: false,
               inJail,
               jailbreakByMoney,
               ableToRequestBasicIncome
            }
         }
      })()
      setAbilities(ab)
   },[gameState, playerEmail, latestPayments])
    

    return (
        <svg
   viewBox="0 0 415.99704 887.18"
   version="1.1"
   height={height}
   xmlns="http://www.w3.org/2000/svg">
  <defs
     id="defs10">
    <rect
       x="56.150632"
       y="368.00261"
       width="127.85067"
       height="82.066309"
       id="rect12433" />
    <clipPath
       id="clippath">
      <polygon
         points="754.54,59.68 689.59,22.18 689.59,97.18 "
         id="polygon4"
         strokeWidth={"0px"}
         fill={"None"} />
    </clipPath>
    <clipPath
       id="clippath-1">
      <polygon
         points="289.59,22.18 224.64,59.68 289.59,97.18 "
         id="polygon7"
         strokeWidth={"0px"}
         fill={"None"} />
    </clipPath>
  </defs>
  <rect
     style={{fill: "#000000", fillOpacity: 1, strokeWidth: 1.33333, strokeLinejoin: "round", strokeDasharray: "2.66667, 2.66667"}}
     id="rect3017"
     width="415.99704"
     height="887.17999"
     x="0"
     y="0" />
  <text
     xmlSpace={"preserve"}
     style={{fontWeight:"bold", fontSize:"15px", fontFamily:"KoPubDotumPB-KSCpc-EUC-H, KoPubDotum_Pro", fill:"#ffffff", fillOpacity:1,strokeWidth:1,strokeLinejoin:"round",strokeDasharray: "2, 2" }}
     x="207.27319"
     y="38.482819"
     id="text6245"><tspan
       id="tspan6243"
       x="207.27319"
       y="38.482819"
       style={{textAlign:"center",textAnchor:"middle"}}>{(now === "") ? "변화카드" : `${now}의 변화카드`}</tspan></text>
  <text
     xmlSpace={"preserve"}
     style={{fontWeight:"bold", fontSize:"21.3333px", fontFamily:"KoPubDotumPB-KSCpc-EUC-H, KoPubDotum_Pro", fill:"#ffffff",fillOpacity:1,strokeWidth:1.33333,strokeLinejoin:"round",strokeDasharray:"2.66667, 2.66667"}}
     x="207.27319"
     y="300.53247"
     id="text6389"><tspan
       id="tspan6387"
       x="207.27319"
       y="300.53247"
       style={{textAlign:"center",textAnchor:"middle"}}>거래창</tspan></text>
  <text
     xmlSpace={"preserve"}
     style={{fontWeight:"bold", fontSize:"21.3333px", fontFamily:"KoPubDotumPB-KSCpc-EUC-H, KoPubDotum_Pro", fill:"#ffffff",fillOpacity:1,strokeWidth:1.33333,strokeLinejoin:"round",strokeDasharray:"2.66667, 2.66667"}}
     x="207.27319"
     y="562.58203"
     id="text6410"><tspan
       id="tspan6408"
       x="207.27319"
       y="562.58203"
       style={{textAlign:"center",textAnchor:"middle"}}>기본 동작</tspan></text>
   
   {(abilities.inJail && controllable) ? (<g id="inJail" transform="translate(0,74.791133)" onClick={(e) => {tryJailbreakByDice()}}>
 <rect
    style={{fill:"#ce7b7b",fillOpacity:1,strokeWidth:0.298809,strokeLinejoin:"round",strokeDasharray:"0.597621, 0.597621"}}
    id="rect6866"
    width="178.21074"
    height="104.01198"
    x="29.787781"
    y="674.70758" />
 <text
    xmlSpace={"preserve"}
    style={{fontWeight:"bold", fontSize:"35.6238px", fontFamily:"KoPubDotumPB-KSCpc-EUC-H, KoPubDotum_Pro", textAlign:"center",textAnchor:"middle",fill:"#9c3a3a",fillOpacity:1,strokeWidth:2.22649,strokeLinejoin:"round",strokeDasharray:"4.45299, 4.45299"}}
    x="120.53186"
    y="742.11401"
    id="text6870"><tspan
      id="tspan6868"
      x="120.53186"
      y="742.11401"
      style={{fill:"#9c3a3a",fillOpacity:1,strokeWidth:2.22649}}>주사위</tspan></text>
</g>) : (<g id="NotInJail"
  transform="translate(0,74.791133)">
 <rect
    style={{fill:"#a4a4a4",fillOpacity:1,strokeWidth:0.298809,strokeLinejoin:"round",strokeDasharray:"0.597621, 0.597621"}}
    id="rect12955"
    width="178.21074"
    height="104.01198"
    x="29.787781"
    y="674.70758" />
 <text
    xmlSpace={"preserve"}
    style={{fontWeight:"bold", fontSize:"35.6238px", fontFamily:"KoPubDotumPB-KSCpc-EUC-H, KoPubDotum_Pro", textAlign:"center",textAnchor:"middle",fill:"#6b6b6b",fillOpacity:1,strokeWidth:2.22649,strokeLinejoin:"round",strokeDasharray:"4.45299, 4.45299"}}
    x="120.53186"
    y="742.11401"
    id="text12959"><tspan
      id="tspan12957"
      x="120.53186"
      y="742.11401"
      style={{fill:"#6b6b6b",fillOpacity:1,strokeWidth:2.22649}}>주사위</tspan></text>
</g>)}
   
   {(controllable && !abilities.inJail) ? (<><g id="normalRollDice"
     transform="translate(0,-87.216517)" onClick={(e) => {
      normallyRollDice()
     }}>
    <rect
       style={{fill:"#7bce7d",fillOpacity:1,strokeWidth:0.31216,strokeLinejoin:"round",strokeDasharray:"0.624324, 0.624324"}}
       id="rect6414"
       width="178.21074"
       height="113.51444"
       x="29.787781"
       y="669.95636" />
    <text
       xmlSpace={"preserve"}
       style={{fontWeight:"bold", fontSize:"35.6238px", fontFamily:"KoPubDotumPB-KSCpc-EUC-H, KoPubDotum_Pro", textAlign:"center",textAnchor:"middle",fill:"#3a9c3c",fillOpacity:1,strokeWidth:2.22649,strokeLinejoin:"round",strokeDasharray:"4.45299, 4.45299"}}
       x="120.53186"
       y="742.11401"
       id="text6528"><tspan
         id="tspan6526"
         x="120.53186"
         y="742.11401"
         style={{strokeWidth:2.22649}}>주사위</tspan></text>
  </g>
  </>) : (<><g id="unableNormalRollDice"
     transform="translate(0,-87.216517)">
    <rect
       style={{fill:"#a4a4a4",fillOpacity:1,strokeWidth:0.31216,strokeLinejoin:"round",strokeDasharray:"0.624324, 0.624324"}}
       id="rect6414"
       width="178.21074"
       height="113.51444"
       x="29.787781"
       y="669.95636" />
    <text
       xmlSpace={"preserve"}
       style={{fontWeight:"bold", fontSize:"35.6238px", fontFamily:"KoPubDotumPB-KSCpc-EUC-H, KoPubDotum_Pro", textAlign:"center",textAnchor:"middle",fill:"#6b6b6b",fillOpacity:1,strokeWidth:2.22649,strokeLinejoin:"round",strokeDasharray:"4.45299, 4.45299"}}
       x="120.53186"
       y="742.11401"
       id="text6528"><tspan
         id="tspan6526"
         x="120.53186"
         y="742.11401"
         style={{strokeWidth:2.22649}}>주사위</tspan></text>
  </g>
  </>)}

  {(abilities.ableToRequestBasicIncome && controllable) ? (<g id="ableToRequestBasicIncome"
     transform="translate(0,-87.216517)" onClick={(e) => {requestBasicIncome()}}>
    <rect
       style={{fill:"#3a9c3c",fillOpacity:1,strokeWidth:0.312161,strokeLinejoin:"round",strokeDasharray:"0.624324, 0.624324"}}
       id="rect6416"
       width="178.21074"
       height="113.51454"
       x="207.99852"
       y="669.9563" />
    <text
       xmlSpace={"preserve"}
       style={{fontWeight:"bold", fontSize:"35.6238px", fontFamily:"KoPubDotumPB-KSCpc-EUC-H, KoPubDotum_Pro", textAlign:"center",textAnchor:"middle",fill:"#7bce7d",fillOpacity:1,strokeWidth:2.22649,strokeLinejoin:"round",strokeDasharray:"4.45299, 4.45299"}}
       x="298.74258"
       y="718.78992"
       id="text6532"><tspan
         id="tspan6530"
         x="298.74258"
         y="718.78992"
         style={{fill:"#7bce7d",fillOpacity:1,strokeWidth:2.22649}}>기본</tspan><tspan
         x="298.74258"
         y="763.31964"
         style={{fill:"#7bce7d",fillOpacity:1,strokeWidth:2.22649}}
         id="tspan6843">소득</tspan></text>
  </g>) : (<g id="unableToRequestBasicIncome"
     transform="translate(0,-87.216517)" >
    <rect
       style={{fill:"#6b6b6b",fillOpacity:1,strokeWidth:0.312161,strokeLinejoin:"round",strokeDasharray:"0.624324, 0.624324"}}
       id="rect6856"
       width="178.21074"
       height="113.51453"
       x="207.99852"
       y="669.9563" />
    <text
       xmlSpace={"preserve"}
       style={{fontWeight:"bold", fontSize:"35.6238px", fontFamily:"KoPubDotumPB-KSCpc-EUC-H, KoPubDotum_Pro", textAlign:"center",textAnchor:"middle",fill:"#a4a4a4",fillOpacity:1,strokeWidth:2.22649,strokeLinejoin:"round",strokeDasharray:"4.45299, 4.45299"}}
       x="298.74258"
       y="718.78992"
       id="text6862"><tspan
         id="tspan6858"
         x="298.74258"
         y="718.78992"
         style={{fill:"#a4a4a4",fillOpacity:1,strokeWidth:2.22649}}>기본</tspan><tspan
         x="298.74258"
         y="763.31964"
         style={{fill:"#a4a4a4",fillOpacity:1,strokeWidth:2.22649}}
         id="tspan6860">소득</tspan></text>
  </g>)}
  
  {(abilities.jailbreakByMoney && controllable) ? (<g id="emoughMoneyToJailbreak"
     transform="translate(0,74.791133)" onClick={(e) => {jailbreakByMoney()}}>
    <rect
       style={{fill:"#9c3a3a",fillOpacity:1,strokeWidth:0.29881,strokeLinejoin:"round",strokeDasharray:"0.597621, 0.597621"}}
       id="rect6874"
       width="178.21074"
       height="104.01198"
       x="207.99852"
       y="674.70758" />
    <text
       xmlSpace={"preserve"}
       style={{fontWeight:"bold", fontSize:"35.6238px", fontFamily:"KoPubDotumPB-KSCpc-EUC-H, KoPubDotum_Pro", textAlign:"center",textAnchor:"middle",fill:"#ce7b7b",fillOpacity:1,strokeWidth:2.22649,strokeLinejoin:"round",strokeDasharray:"4.45299, 4.45299"}}
       x="298.74258"
       y="718.78992"
       id="text6880"><tspan
         x="298.74258"
         y="718.78992"
         style={{fill:"#ce7b7b",fillOpacity:1,strokeWidth:2.22649}}
         id="tspan6878">현금</tspan><tspan
         x="298.74258"
         y="763.31964"
         style={{fill:"#ce7b7b",fillOpacity:1,strokeWidth:2.22649}}
         id="tspan7106">지불</tspan></text>
  </g>) : (<g id="notEnoughMoneyToJailbreakOrNotInJail"
     transform="translate(0,74.791133)">
    <rect
       style={{fill:"#6b6b6b",fillOpacity:1,strokeWidth:0.29881,strokeLinejoin:"round",strokeDasharray:"0.597622, 0.597622"}}
       id="rect7935"
       width="178.21074"
       height="104.01202"
       x="207.99852"
       y="674.70758" />
    <text
       xmlSpace={"preserve"}
       style={{fontWeight:"bold", fontSize:"35.6238px", fontFamily:"KoPubDotumPB-KSCpc-EUC-H, KoPubDotum_Pro", textAlign:"center",textAnchor:"middle",fill:"#a4a4a4",fillOpacity:1,strokeWidth:2.22649,strokeLinejoin:"round",strokeDasharray:"4.45299, 4.45299"}}
       x="298.74258"
       y="718.78992"
       id="text7945"><tspan
         x="298.74258"
         y="718.78992"
         style={{fill:"#a4a4a4",fillOpacity:1,strokeWidth:2.22649}}
         id="tspan7941">현금</tspan><tspan
         x="298.74258"
         y="763.31964"
         style={{fill:"#a4a4a4",fillOpacity:1,strokeWidth:2.22649}}
         id="tspan7943">지불</tspan></text>
  </g>)}
  
  
  {(abilities.purchase && controllable) ? (<g id="EnoughMoneyToBuy"
     transform="translate(0,-18.325151)" onClick={(e) => {
      if(latestPayments !== null) {
         construct(myLocation)
      }
     }}>
    <rect
       style={{fill:"#8228b1",fillOpacity:1,strokeWidth:0.299178,strokeLinejoin:"round",strokeDasharray:"0.59836, 0.59836"}}
       id="rect12553"
       width="178.21074"
       height="104.26929"
       x="29.787781"
       y="339.01529" />
    <text
       xmlSpace={"preserve"}
       style={{fontWeight:"bold", fontSize:"21.3333px", fontFamily:"KoPubDotumPB-KSCpc-EUC-H, KoPubDotum_Pro", fill:"#ffffff",fillOpacity:1,strokeWidth:1.33333,strokeLinejoin:"round",strokeDasharray:"2.66667, 2.66667"}}
       x="118.5459"
       y="397.80591"
       id="text12557"><tspan
         id="tspan12555"
         x="118.5459"
         y="397.80591"
         style={{textAlign:"center",textAnchor:"middle"}}>산다</tspan></text>
  </g>) : (<g id="AlreadyOwnedOrNotEnoughMoneyToBuy"
     transform="translate(0,-18.325151)">
    <rect
       style={{fill:"#6d6d6d",fillOpacity:1,strokeWidth:0.299178,strokeLinejoin:"round",strokeDasharray:"0.59836, 0.59836"}}
       id="rect13059"
       width="178.21074"
       height="104.26929"
       x="29.787781"
       y="339.01529" />
    <text
       xmlSpace={"preserve"}
       style={{fontWeight:"bold", fontSize:"21.3333px", fontFamily:"KoPubDotumPB-KSCpc-EUC-H, KoPubDotum_Pro", fill:"#ffffff",fillOpacity:1,strokeWidth:1.33333,strokeLinejoin:"round",strokeDasharray:"2.66667, 2.66667"}}
       x="118.5459"
       y="397.80591"
       id="text13063"><tspan
         id="tspan13061"
         x="118.5459"
         y="397.80591"
         style={{textAlign:"center",textAnchor:"middle"}}>산다</tspan></text>
  </g>)}
  
  
  {(abilities.construct && controllable) ? (<g id="skip"
     transform="translate(0,-18.325151)">
    <rect
       style={{fill:"#bf47a1",fillOpacity:1,strokeWidth:0.299178,strokeLinejoin:"round",strokeDasharray:"0.59836, 0.59836"}}
       id="rect6391"
       width="178.21074"
       height="104.26929"
       x="29.787781"
       y="443.28461" />
    <text
       xmlSpace={"preserve"}
       style={{fontWeight:"bold", fontSize:"21.3333px", fontFamily:"KoPubDotumPB-KSCpc-EUC-H, KoPubDotum_Pro", fill:"#ffffff",fillOpacity:1,strokeWidth:1.33333,strokeLinejoin:"round",strokeDasharray:"2.66667, 2.66667"}}
       x="118.54591"
       y="502.07523"
       id="text12665"><tspan
         id="tspan12663"
         x="118.54591"
         y="502.07523"
         style={{textAlign:"center",textAnchor:"middle"}}>사지 않는다</tspan></text>
  </g>) : (<g id="NotBuyable"
     transform="translate(0,-18.325151)">
    <rect
       style={{fill:"#838383",fillOpacity:1,strokeWidth:0.299178,strokeLinejoin:"round",strokeDasharray:"0.59836, 0.59836"}}
       id="rect13067"
       width="178.21074"
       height="104.26929"
       x="29.787781"
       y="443.28461" />
    <text
       xmlSpace={"preserve"}
       style={{fontWeight:"bold", fontSize:"21.3333px", fontFamily:"KoPubDotumPB-KSCpc-EUC-H, KoPubDotum_Pro", fill:"#ffffff",fillOpacity:1,strokeWidth:1.33333,strokeLinejoin:"round",strokeDasharray:"2.66667, 2.66667"}}
       x="118.54591"
       y="502.07523"
       id="text13071"><tspan
         id="tspan13069"
         x="118.54591"
         y="502.07523"
         style={{textAlign:"center",textAnchor:"middle"}}>사지 않는다</tspan></text>
  </g>)}

  {(abilities.sell && controllable) ? (<g id="ableToSell" onClick={(e) => {
   
  }}>
    <rect
       style={{fill:"#1651be",fillOpacity:1,strokeWidth:0.423102,strokeLinejoin:"round",strokeDasharray:"0.846209, 0.846209"}}
       id="rect12551"
       width="178.21074"
       height="208.53859"
       x="207.99852"
       y="320.69016" />
    <text
       xmlSpace={"preserve"}
       style={{fontWeight:"bold", fontSize:"21.3333px", fontFamily:"KoPubDotumPB-KSCpc-EUC-H, KoPubDotum_Pro", fill:"#ffffff",fillOpacity:1,strokeWidth:1.33333,strokeLinejoin:"round",strokeDasharray:"2.66667, 2.66667"}}
       x="296.75665"
       y="429.14783"
       id="text13079"><tspan
         id="tspan13077"
         x="296.75665"
         y="429.14783"
         style={{textAlign:"center",textAnchor:"middle",fill:"#ffffff",fillOpacity:1}}>판다</tspan></text>
  </g>) : (<g id="unableToSell">
    <rect
       style={{fill:"#6a6a6a",fillOpacity:1,strokeWidth:0.423102,strokeLinejoin:"round",strokeDasharray:"0.846209, 0.846209"}}
       id="rect13193"
       width="178.21074"
       height="208.53859"
       x="207.99852"
       y="320.69016" />
    <text
       xmlSpace={"preserve"}
       style={{fontWeight:"bold", fontSize:"21.3333px", fontFamily:"KoPubDotumPB-KSCpc-EUC-H, KoPubDotum_Pro", fill:"#ffffff",fillOpacity:1,strokeWidth:1.33333,strokeLinejoin:"round",strokeDasharray:"2.66667, 2.66667"}}
       x="296.75665"
       y="429.14783"
       id="text13197"><tspan
         id="tspan13195"
         x="296.75665"
         y="429.14783"
         style={{textAlign:"center",textAnchor:"middle",fill:"#ffffff",fillOpacity:1}}>판다</tspan></text>
  </g>)}
  
  
  <text
     xmlSpace={"preserve"}
     style={{fontWeight:"bold", fontSize:"21.3333px", fontFamily:"KoPubDotumPB-KSCpc-EUC-H, KoPubDotum_Pro", fill:"#ffffff",fillOpacity:1,strokeWidth:1.33333,strokeLinejoin:"round",strokeDasharray:"2.66667, 2.66667"}}
     x="207.27319"
     y="729.34088"
     id="text12848"><tspan
       id="tspan12846"
       x="207.27319"
       y="729.34088"
       style={{textAlign:"center",textAnchor:"middle"}}>석방 동작</tspan></text>
  
  <g id="chanceCard">
    <rect
     style={{fill:"#d14a2a",fillOpacity:1,strokeWidth:0.499951,strokeLinejoin:"round",strokeDasharray:"0.999906, 0.999906"}}
     id="rect9417"
     width="357.17761"
     height="145.27768"
     x="29.031631"
     y="111.25308" />
     <rect
     style={{fill:"#e4c48d",fillOpacity:1,strokeWidth:0.300865,strokeLinejoin:"round",strokeDasharray:"0.601734, 0.601734"}}
     id="rect17160"
     width="357.17761"
     height="52.612598"
     x="29.031631"
     y="58.64048" />
    {(latestChance !== null) ? (
    <>
      <text
      xmlSpace={"preserve"}
      style={{fontWeight:"bold", fontSize:"21.3333px", fontFamily:"KoPubDotumPB-KSCpc-EUC-H, KoPubDotum_Pro", fill:"#d14a2a",fillOpacity:1,strokeWidth:1.33333,strokeLinejoin:"round",strokeDasharray:"2.66667, 2.66667"}}
      x="207.27319"
      y="90.694153"
      id="text23024"><tspan
        id="tspan23022"
        x="207.27319"
        y="90.694153"
        style={{textAlign:"center",textAnchor:"middle",fill:"#d14a2a",fillOpacity:1}}>{latestChance.displayCardName}</tspan></text>
    <text
      xmlSpace={"preserve"}
      style={{fontStyle:"normal",fontVariant:"normal",fontWeight:"normal", fontStretch:"normal",fontFamily:"KoPubBatangPM-KSCpc-EUC-H, KoPubBatang_Pro", fill:"#ffffff",fillOpacity:1,strokeWidth:1.33333,strokeLinejoin:"round",strokeDasharray:"2.66667, 2.66667"}}
      x="207.27319"
      y="175.60068"
      id="text23804"><tspan
        id="tspan23802"
        x="207.27319"
        y="175.60068"
        style={{textAlign:"center",textAnchor:"middle"}}>{latestChance.cardDescription}</tspan></text></>) : (
        <>
      <text
      xmlSpace={"preserve"}
      style={{fontWeight:"bold", fontSize:"21.3333px", fontFamily:"KoPubDotumPB-KSCpc-EUC-H, KoPubDotum_Pro", fill:"#d14a2a",fillOpacity:1,strokeWidth:1.33333,strokeLinejoin:"round",strokeDasharray:"2.66667, 2.66667"}}
      x="207.27319"
      y="90.694153"
      id="text23024"><tspan
        id="tspan23022"
        x="207.27319"
        y="90.694153"
        style={{textAlign:"center",textAnchor:"middle",fill:"#d14a2a",fillOpacity:1}}>(카드명)</tspan></text>
    <text
      xmlSpace={"preserve"}
      style={{fontStyle:"normal",fontVariant:"normal",fontWeight:"normal", fontStretch:"normal",fontFamily:"KoPubBatangPM-KSCpc-EUC-H, KoPubBatang_Pro", fill:"#ffffff",fillOpacity:1,strokeWidth:1.33333,strokeLinejoin:"round",strokeDasharray:"2.66667, 2.66667"}}
      x="207.27319"
      y="175.60068"
      id="text23804"><tspan
        id="tspan23802"
        x="207.27319"
        y="175.60068"
        style={{textAlign:"center",textAnchor:"middle"}}>(내용)</tspan></text>
    </>)}
  </g>
</svg>
    )
}