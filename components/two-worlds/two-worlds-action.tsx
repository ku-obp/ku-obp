'use client'

import React, { useState, useEffect } from "react"

import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";


import {useSocket} from "@/components/providers/two-worlds-socket-provider"

import {arrayRange} from "@/lib/utils"
import { PlayerType } from "@/redux/features/two-worlds-slice";


const TwoWorldsAction = ({roomId, socket, playerEmail}: {roomId: string, socket: any, playerEmail: string}) => {
    
    const dispatch = useDispatch<AppDispatch>();
    const {gameState, roomState, turnState}  = useAppSelector((state) => state.twoWorldsReducer);

    const [usingDoubleLotto, setUsingDoubleLotto] = useState<boolean>(false)
    const [duringLotto, setDuringLotto] = useState<boolean>(false)
    const [doubleLottoAvailable, setDoubleLottoAvailability] = useState<boolean>(false)

    const [myState, setMyState] = useState<PlayerType | null>(null)

    const [purchaseAmount, setPurchaseAmount] = useState<string>("")

    const [trafficJamTarget, setTrafficJamTarget] = useState<string>("0")

    const [tradeGive, setTradeGive] = useState<string>("0")
    const [tradeGet, setTradeGet] = useState<string>("0")

    const [extinctionTarget, setExtinctionTarget] = useState<string>("0")

    const [quickMoveDest, setQuickMoveDest] = useState<string>("")

    const [greenNewDealTarget, setGreenNewDealTarget] = useState<string>("0")

    const [sellTarget, setSellTarget] = useState<string>("0")
    const [sellAmount, setSellAmount] = useState<string>("0")

    const [alreadyClicked, setAlreadyClicked] = useState<boolean>(false)


    useEffect(() => {
        const nowInTurn = gameState.nowInTurn
        if (roomState.playerEmails[nowInTurn] === playerEmail) {
            setDoubleLottoAvailability(gameState.playerStates[nowInTurn].tickets.doubleLotto > 0)
        } else {
            setDoubleLottoAvailability(false)
        }
    }, [gameState, roomState, playerEmail])

    useEffect(() => {
        if(turnState.prompt !== "tryLotto") {
            setUsingDoubleLotto(false)
            setDuringLotto(false)
        }

        setAlreadyClicked(false)

    }, [turnState.prompt])

    return <div style={{margin: 20}}>
        <>
        {
            (turnState.prompt === "tryLotto") ? <>
                <p style={{color: "white", textAlign: "center"}}><strong>로또</strong></p>
                <div>
                    <div>
                        <input type="checkbox" name="check" value="doubleLotto" disabled={duringLotto || !doubleLottoAvailable} onChange={(e) => {
                            setUsingDoubleLotto(e.target.checked)
                        }} defaultChecked={false}/>
                        <label htmlFor="doubleLotto">더블로또 찬스 발동</label>
                    </div>
                    <button onClick={(e) => {
                        setDuringLotto(true)
                        if (!alreadyClicked) { socket.emit("tryLotto", {roomId: roomId, usingDoubleLotto: usingDoubleLotto}) }
                        setAlreadyClicked(true)
                    }}>도전!</button>
                    <button onClick={(e) => {
                        if(!alreadyClicked) {
                            socket.emit("skip", {roomId: roomId})
                        }
                        setAlreadyClicked(true)
                    }}>건너뛴다</button>
                </div>
            </> : (turnState.prompt === "purchase") ? <>
                <p style={{color: "white", textAlign: "center"}}><strong>건설</strong></p>
                <div>
                    <input type="text" onChange={(e) => {
                        setPurchaseAmount(e.target.value)                        
                    }} defaultValue={"0"} />
                    <button onClick={(e) => {
                        console.log(purchaseAmount)
                        if(purchaseAmount === "1") {
                            if (!alreadyClicked) { socket.emit("purchase", {roomId: roomId, amount: "1"}) }
                            setAlreadyClicked(true)
                        } else if(purchaseAmount === "2") {
                            if (!alreadyClicked) { socket.emit("purchase", {roomId: roomId, amount: "2"}) }
                            setAlreadyClicked(true)
                        } else if(purchaseAmount === "3") {
                            if (!alreadyClicked) { socket.emit("purchase", {roomId: roomId, amount: "3"}) }
                            setAlreadyClicked(true)
                        }
                        
                    }}>산다</button>
                    <button onClick={(e) => {
                        if(!alreadyClicked){
                            socket.emit("skip", {roomId: roomId})
                        }
                        
                        setAlreadyClicked(true)
                    }}>건너뛴다</button>
                </div>
            </> : (turnState.prompt === "jail") ? <>
                <p style={{color: "white", textAlign: "center"}}><strong>감옥</strong></p>
                <div>
                <button onClick={(e) => {
                        if (!alreadyClicked) { socket.emit("tryJailExitByDice", {roomId: roomId}) }
                        setAlreadyClicked(true)
                    }}>주사위로 시도한다</button>
                    <button onClick={(e) => {
                        if (!alreadyClicked) { socket.emit("jailExitByCash", {roomId: roomId}) }
                        setAlreadyClicked(true)
                    }} disabled={
                        gameState.playerStates[gameState.nowInTurn].cash < 400000
                    }>40만을 지불한다</button>
                    <button onClick={(e) => {
                        if (!alreadyClicked) { socket.emit("jailExitThanksToLawyer", {roomId: roomId}) }
                        setAlreadyClicked(true)
                    }} disabled={
                        gameState.playerStates[gameState.nowInTurn].tickets.lawyer <= 0
                    }>인권변호사의 도움을 받는다</button>
                </div>
            </> : (turnState.prompt === "trafficJam") ? <>
                <p style={{color: "white", textAlign: "center"}}><strong>교통정체</strong></p>
                <input type="text" onChange={(e) => {
                    if(e.target.value.length === 2 && /([0-4]\d)|(5[0-4])/g.test(e.target.value)) {
                        setTrafficJamTarget(parseInt(e.target.value).toString())
                    } else if (e.target.value.length === 1 && /\d/g.test(e.target.value)) {
                        setTrafficJamTarget(parseInt(e.target.value).toString())
                    } else {
                        setTrafficJamTarget("0")
                    }
                }} defaultValue={"0"} />
                <button onClick={(e) => {
                    if(trafficJamTarget !== "0") {
                        if (!alreadyClicked) { socket.emit("trafficJam", {roomId: roomId, target: trafficJamTarget}) }
                        setAlreadyClicked(true)
                    }
                }}>건물을 날린다</button>
            </> : (turnState.prompt === "trade") ? <>
                <p style={{color: "white", textAlign: "center"}}><strong>도시 교환</strong></p>
                <input type="text" onChange={(e) => {
                    const tokens = e.target.value.split(",")
                    if (tokens.length === 2) {
                        const tgive = tokens[0]
                        const tget = tokens[1]

                        if(tgive.length === 2 && /([0-4]\d)|(5[0-4])/g.test(tgive)) {
                            setTradeGive(parseInt(tgive).toString())
                        } else if (e.target.value.length === 1 && /\d/g.test(tgive)) {
                            setTradeGive(parseInt(tgive).toString())
                        } else {
                            setTradeGive("0")
                        }

                        if(tget.length === 2 && /([0-4]\d)|(5[0-4])/g.test(tget)) {
                            setTradeGet(parseInt(tget).toString())
                        } else if (tget.length === 1 && /\d/g.test(tget)) {
                            setTradeGet(parseInt(tget).toString())
                        } else {
                            setTradeGet("0")
                        }
                    }
                }} defaultValue={"0,0"} />
                <button onClick={(e) => {
                    if(tradeGet !== "0" && tradeGive !== "0") {
                        if (!alreadyClicked) { socket.emit("trade", {roomId: roomId, toGive: `${tradeGive}`, toGet: `${tradeGet}`}) }
                        setAlreadyClicked(true)
                    }
                }}>교환한다</button>
            </> : (turnState.prompt === "extinction") ? <>
                <p style={{color: "white", textAlign: "center"}}><strong>인구소멸</strong></p>
                <input type="text" onChange={(e) => {
                    if(e.target.value.length === 2 && /(0\d)|(1[0-2])/g.test(e.target.value)) {
                        setExtinctionTarget(parseInt(e.target.value).toString())
                    } else if (e.target.value.length === 1 && /\d/g.test(e.target.value)) {
                        setExtinctionTarget(parseInt(e.target.value).toString())
                    } else {
                        setExtinctionTarget("0")
                    }
                }} defaultValue={"00"} />
                <button onClick={(e) => {
                    if(extinctionTarget !== "0") {
                        if (!alreadyClicked) { socket.emit("extinction", {roomId: roomId, targetGroup: extinctionTarget}) }
                        setAlreadyClicked(true)
                    }
                }}>건물(들)을 날린다</button>
            </> : (turnState.prompt === "quickMove") ? <>
                <p style={{color: "white", textAlign: "center"}}><strong>이동 티켓</strong></p>
                <input type="text" onChange={(e) => {
                    if(e.target.value.length === 2 && /([0-4]\d)|(5[0-4])/g.test(e.target.value)) {
                        setQuickMoveDest(parseInt(e.target.value).toString())
                    } else if (e.target.value.length === 1 && /\d/g.test(e.target.value)) {
                        setQuickMoveDest(parseInt(e.target.value).toString())
                    } else {
                        setQuickMoveDest("")
                    }
                }} defaultValue={"00"} />
                <button onClick={(e) => {
                    if(quickMoveDest !== "") {
                        if (!alreadyClicked) { socket.emit("quickMove", {roomId: roomId, dest: quickMoveDest}) }
                        setAlreadyClicked(true)
                    }
                }}>이동한다</button>
            </> : (turnState.prompt === "greenNewDeal") ? <>
                <p style={{color: "white", textAlign: "center"}}><strong>그린뉴딜</strong></p>
                <input type="text" onChange={(e) => {
                    if(e.target.value.length === 2 && /([0-4]\d)|(5[0-4])/g.test(e.target.value)) {
                        setGreenNewDealTarget(parseInt(e.target.value).toString())
                    } else if (e.target.value.length === 1 && /\d/g.test(e.target.value)) {
                        setGreenNewDealTarget(parseInt(e.target.value).toString())
                    } else {
                        setGreenNewDealTarget("0")
                    }
                }} defaultValue={"00"} />
                <button onClick={(e) => {
                    if(greenNewDealTarget !== "0") {
                        if (!alreadyClicked) { socket.emit("greenNewDeal", {roomId: roomId, target: greenNewDealTarget}) }
                        setAlreadyClicked(true)
                    }
                }}>건설한다(무료)</button>
            </> : (turnState.prompt === "quirkOfFate") ? <>
                <p style={{color: "white", textAlign: "center"}}><strong>왕자와 거지</strong></p>
                <button onClick={(e) => {
                    if (!alreadyClicked) { socket.emit("quirkOfFate", {roomId: roomId}) }
                    setAlreadyClicked(true)
                }}>주사위를 굴린다</button>
            </> : (turnState.prompt === "sell") ? <>
                <p style={{color: "white", textAlign: "center"}}><strong>땡처리</strong></p>
                <input type="text" onChange={(e) => {
                    const tokens = e.target.value.split(",")
                    if (tokens.length === 2) {
                        const tt = tokens[0]
                        const ta = tokens[1]

                        if(tt.length === 2 && /([0-4]\d)|(5[0-4])/g.test(tt)) {
                            setSellTarget(parseInt(tt).toString())
                        } else if (e.target.value.length === 1 && /\d/g.test(tt)) {
                            setSellTarget(parseInt(tt).toString())
                        } else {
                            setSellTarget("0")
                        }

                        if (ta.length === 1 && /1|2|3/g.test(ta)) {
                            setSellAmount(parseInt(ta).toString())
                        } else {
                            setSellAmount("0")
                        }
                    }
                }} defaultValue={"00,00"} />
                <button onClick={(e) => {
                    if(sellTarget !== "0" && sellAmount !== "0") {
                        if (!alreadyClicked) { socket.emit("sellForDebt", {roomId: roomId, targetLocation: `${sellTarget}`, amount: `${sellAmount}`}) }
                        setAlreadyClicked(true)
                    }
                }}>교환한다</button>
            </> : (turnState.prompt === "pickChance") ? <>
                <p style={{color: "white", textAlign: "center"}}><strong>변화카드 뽑기</strong></p>
                <button onClick={(e) => {
                    if (!alreadyClicked) { socket.emit("pickChance", {roomId: roomId}) }
                    setAlreadyClicked(true)
                }}>변화 카드를 뽑는다</button>                
            </> : (turnState.prompt === "normal") ? <>
                <p style={{color: "white", textAlign: "center"}}><strong>주사위 굴리기</strong></p>
                <button onClick={(e) => {
                    if (!alreadyClicked) { socket.emit("reportNormalTurnDice", {roomId: roomId}) }
                    setAlreadyClicked(true)
                }}>주사위를 굴린다</button> 
            </> : <></>
        }
    </>
    </div>
}

export default TwoWorldsAction