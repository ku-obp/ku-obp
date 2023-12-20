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

    const [purchaseAmount, setPurchaseAmount] = useState<number>(0)

    const [trafficJamTarget, setTrafficJamTarget] = useState<number>(0)

    const [tradeGive, setTradeGive] = useState<number>(0)
    const [tradeGet, setTradeGet] = useState<number>(0)

    const [extinctionTarget, setExtinctionTarget] = useState<number>(0)

    const [quickMoveDest, setQuickMoveDest] = useState<number|null>(null)

    const [greenNewDealTarget, setGreenNewDealTarget] = useState<number>(0)

    const [sellTarget, setSellTarget] = useState<number>(0)
    const [sellAmount, setSellAmount] = useState<number>(0)

    useEffect(() => {
        const nowInTurn = gameState.nowInTurn
        if (roomState.playerEmails[nowInTurn] === playerEmail) {
            setDoubleLottoAvailability(gameState.playerStates[nowInTurn].tickets.doubleLotto > 0)
        } else {
            setDoubleLottoAvailability(false)
        }
    }, [gameState, roomState, playerEmail])

    useEffect(() => {
        if(turnState.prompt === "tryLotto") {
            
        } else {
            setUsingDoubleLotto(false)
            setDuringLotto(false)
        }
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
                        socket.emit("tryLotto", {roomId: roomId, usingDoubleLotto: usingDoubleLotto})
                    }}>도전!</button>
                    <button onClick={(e) => {
                        socket.emit("skip", {roomId: roomId})
                    }}>건너뛴다</button>
                </div>
            </> : (turnState.prompt === "purchase") ? <>
                <p style={{color: "white", textAlign: "center"}}><strong>건설</strong></p>
                <div>
                    {(gameState.properties.get(gameState.playerStates[gameState.nowInTurn].location) !== undefined)
                        ? (gameState.properties.get(gameState.playerStates[gameState.nowInTurn].location).count <= gameState.playerStates[gameState.nowInTurn].cycles)
                            ? <> 
                                <selector onChange={(e) => {
                                    setPurchaseAmount(parseInt(e.target.value))
                                }}>
                                    {
                                        range(1,(gameState.playerStates[gameState.nowInTurn].cycles - gameState.properties[gameState.playerStates[gameState.nowInTurn].location].count) + 2).map((num) => (
                                            <option key={string(num)} value={string(num)} defaultValue={num === 1}>{num}</option>
                                        ))
                                    }
                                </selector>
                                <button onClick={(e) => {
                                    if(purchaseAmount !== 0) {
                                        socket.emit("purchase", {roomId: roomId, amount: purchaseAmount})
                                    }
                                }}>산다</button>
                                
                                <button onClick={(e) => {
                                    socket.emit("skip", {roomId: roomId})
                                }}>건너뛴다</button>
                            </> : <>{
                                socket.on("skip", {roomId: roomId})
                            }</>
                        : <>
                            <selector onChange={(e) => {
                                setPurchaseAmount(parseInt(e.target.value))
                            }}>
                                {
                                    range(1,gameState.playerStates[gameState.nowInTurn].cycles + 2).map((num) => (
                                        <option key={string(num)} value={string(num)} defaultValue={num === 1}>{num}</option>
                                    ))
                                }
                            </selector>
                            <button onClick={(e) => {
                                if(purchaseAmount !== 0) {
                                    socket.emit("purchase", {roomId: roomId, amount: purchaseAmount})
                                }
                            }}>산다</button>
                            <button onClick={(e) => {
                                socket.emit("skip", {roomId: roomId})
                            }}>건너뛴다</button>
                        </>
                    }
                </div>
            </> : (turnState.prompt === "jail") ? <>
                <p style={{color: "white", textAlign: "center"}}><strong>감옥</strong></p>
                <div>
                <button onClick={(e) => {
                        socket.emit("tryJailExitByDice", {roomId: roomId})
                    }}>주사위로 시도한다</button>
                    <button onClick={(e) => {
                        socket.emit("jailExitByCash", {roomId: roomId})
                    }} disabled={
                        gameState.playerStates[gameState.nowInTurn].cash < 400000
                    }>40만을 지불한다</button>
                    <button onClick={(e) => {
                        socket.emit("jailExitThanksToLawyer", {roomId: roomId})
                    }} disabled={
                        gameState.playerStates[gameState.nowInTurn].tickets.lawyer <= 0
                    }>인권변호사의 도움을 받는다</button>
                </div>
            </> : (turnState.prompt === "trafficJam") ? <>
                <p style={{color: "white", textAlign: "center"}}><strong>교통정체</strong></p>
                <input type="text" onChange={(e) => {
                    if(e.target.value.length === 2 && /([0-4]\d)|(5[0-4])/g.test(e.target.value)) {
                        setTrafficJamTarget(parseInt(e.target.value))
                    } else if (e.target.value.length === 1 && /\d/g.test(e.target.value)) {
                        setTrafficJamTarget(parseInt(e.target.value))
                    } else {
                        setTrafficJamTarget(0)
                    }
                }} defaultValue={"00"} />
                <button onClick={(e) => {
                    if(trafficJamTarget !== 0) {
                        socket.emit("trafficJam", {roomId: roomId, target: trafficJamTarget})
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
                            setTradeGive(parseInt(tgive))
                        } else if (e.target.value.length === 1 && /\d/g.test(tgive)) {
                            setTradeGive(parseInt(tgive))
                        } else {
                            setTradeGive(0)
                        }

                        if(tget.length === 2 && /([0-4]\d)|(5[0-4])/g.test(tget)) {
                            setTradeGet(parseInt(tget))
                        } else if (tget.length === 1 && /\d/g.test(tget)) {
                            setTradeGet(parseInt(tget))
                        } else {
                            setTradeGet(0)
                        }
                    }
                }} defaultValue={"00,00"} />
                <button onClick={(e) => {
                    if(tradeGet !== 0 && tradeGive !== 0) {
                        socket.emit("trade", {roomId: roomId, toGive: tradeGive, toGet: tradeGet})
                    }
                }}>교환한다</button>
            </> : (turnState.prompt === "extinction") ? <>
                <p style={{color: "white", textAlign: "center"}}><strong>인구소멸</strong></p>
                <input type="text" onChange={(e) => {
                    if(e.target.value.length === 2 && /(0\d)|(1[0-2])/g.test(e.target.value)) {
                        setExtinctionTarget(parseInt(e.target.value))
                    } else if (e.target.value.length === 1 && /\d/g.test(e.target.value)) {
                        setExtinctionTarget(parseInt(e.target.value))
                    } else {
                        setExtinctionTarget(0)
                    }
                }} defaultValue={"00"} />
                <button onClick={(e) => {
                    if(extinctionTarget !== 0) {
                        socket.emit("extinction", {roomId: roomId, targetGroup: extinctionTarget})
                    }
                }}>건물(들)을 날린다</button>
            </> : (turnState.prompt === "quickMove") ? <>
                <p style={{color: "white", textAlign: "center"}}><strong>이동 티켓</strong></p>
                <input type="text" onChange={(e) => {
                    if(e.target.value.length === 2 && /([0-4]\d)|(5[0-4])/g.test(e.target.value)) {
                        setQuickMoveDest(parseInt(e.target.value))
                    } else if (e.target.value.length === 1 && /\d/g.test(e.target.value)) {
                        setQuickMoveDest(parseInt(e.target.value))
                    } else {
                        setQuickMoveDest(null)
                    }
                }} defaultValue={"00"} />
                <button onClick={(e) => {
                    if(quickMoveDest !== null) {
                        socket.emit("quickMove", {roomId: roomId, dest: quickMoveDest})
                    }
                }}>이동한다</button>
            </> : (turnState.prompt === "greenNewDeal") ? <>
                <p style={{color: "white", textAlign: "center"}}><strong>그린뉴딜</strong></p>
                <input type="text" onChange={(e) => {
                    if(e.target.value.length === 2 && /([0-4]\d)|(5[0-4])/g.test(e.target.value)) {
                        setGreenNewDealTarget(parseInt(e.target.value))
                    } else if (e.target.value.length === 1 && /\d/g.test(e.target.value)) {
                        setGreenNewDealTarget(parseInt(e.target.value))
                    } else {
                        setGreenNewDealTarget(0)
                    }
                }} defaultValue={"00"} />
                <button onClick={(e) => {
                    if(greenNewDealTarget !== 0) {
                        socket.emit("greenNewDeal", {roomId: roomId, target: greenNewDealTarget})
                    }
                }}>건설한다(무료)</button>
            </> : (turnState.prompt === "quirkOfFate") ? <>
                <p style={{color: "white", textAlign: "center"}}><strong>왕자와 거지</strong></p>
                <button onClick={(e) => {
                    socket.emit("quirkOfFate", {roomId: roomId})
                }}>주사위를 굴린다</button>
            </> : (turnState.prompt === "sell") ? <>
                <p style={{color: "white", textAlign: "center"}}><strong>땡처리</strong></p>
                <input type="text" onChange={(e) => {
                    const tokens = e.target.value.split(",")
                    if (tokens.length === 2) {
                        const tt = tokens[0]
                        const ta = tokens[1]

                        if(tt.length === 2 && /([0-4]\d)|(5[0-4])/g.test(tt)) {
                            setSellTarget(parseInt(tt))
                        } else if (e.target.value.length === 1 && /\d/g.test(tt)) {
                            setSellTarget(parseInt(tt))
                        } else {
                            setSellTarget(0)
                        }

                        if (ta.length === 1 && /1|2|3/g.test(ta)) {
                            setSellAmount(parseInt(ta))
                        } else {
                            setSellAmount(0)
                        }
                    }
                }} defaultValue={"00,00"} />
                <button onClick={(e) => {
                    if(sellTarget !== 0 && sellAmount !== 0) {
                        socket.emit("sellForDebt", {roomId: roomId, targetLocation: sellTarget, amount: sellAmount})
                    }
                }}>교환한다</button>
            </> : (turnState.prompt === "pickChance") ? <>
                <p style={{color: "white", textAlign: "center"}}><strong>찬스 뽑기</strong></p>
                <button onClick={(e) => {
                    socket.emit("pickChance", {roomId: roomId})
                }}>주사위를 굴린다</button>                
            </> : (turnState.prompt === "normal") ? <>
                <p style={{color: "white", textAlign: "center"}}><strong>주사위 굴리기</strong></p>
                <button onClick={(e) => {
                    socket.emit("reportNormalTurnDice", {roomId: roomId})
                }}>주사위를 굴린다</button> 
            </> : <></>
        }
    </>
    </div>
}

export default TwoWorldsAction