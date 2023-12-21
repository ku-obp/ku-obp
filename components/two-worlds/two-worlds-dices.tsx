'use client'

import React, { useState, useEffect } from "react"

import { arrayRange, divmod } from "@/lib/utils"

export type ValidDiceValueType = 1|2|3|4|5|6

export type DiceValueType = 0|ValidDiceValueType

function validateDice(dv: number): DiceValueType {
    switch(dv) {
        case 1: return 1
        case 2: return 2
        case 3: return 3
        case 4: return 4
        case 5: return 5
        case 6: return 6
        default: return 0
    }
}

function getDicePair(diceCache: number): {diceLeft: ValidDiceValueType, diceRight: ValidDiceValueType} | {diceLeft: 0, diceRight: 0} {
	if (diceCache > 0 && diceCache <= 36) {
		const converted = divmod(diceCache - 1, 6)
		const diceLeft = validateDice(converted.quotient + 1)
		const diceRight = validateDice(converted.remainder + 1)
		if ((diceLeft !== 0) && (diceRight !== 0)) {
			return { diceLeft, diceRight }
		} else {
			return { diceLeft: 0, diceRight: 0 }
		}
	} else {
		return { diceLeft: 0, diceRight: 0 }
	}
    
}

export const Dice = ({ dv }: { dv: DiceValueType }) => {
	return dv === 6 ? (
		<>
			<circle
				style={{
					fill: "#4eab7f",
					strokeWidth: 0.0742803,
					strokeLinejoin: "round",
					strokeDasharray: "0.148561, 0.148561"
				}}
				id="circle1748"
				cx="76.708626"
				cy="224.30388"
				r="3.1431668"
			/>
			<circle
				style={{
					fill: "#4eab7f",
					strokeWidth: 0.0742803,
					strokeLinejoin: "round",
					strokeDasharray: "0.148561, 0.148561"
				}}
				id="circle1752"
				cx="76.708626"
				cy="233.01578"
				r="3.1431668"
			/>
			<circle
				style={{
					fill: "#4eab7f",
					strokeWidth: 0.0742803,
					strokeLinejoin: "round",
					strokeDasharray: "0.148561, 0.148561"
				}}
				id="circle1754"
				cx="76.708626"
				cy="241.72768"
				r="3.1431668"
			/>
			<circle
				style={{
					fill: "#4eab7f",
					strokeWidth: 0.0742803,
					strokeLinejoin: "round",
					strokeDasharray: "0.148561, 0.148561"
				}}
				id="circle1756"
				cx="87.291954"
				cy="224.30388"
				r="3.1431668"
			/>
			<circle
				style={{
					fill: "#4eab7f",
					strokeWidth: 0.0742803,
					strokeLinejoin: "round",
					strokeDasharray: "0.148561, 0.148561"
				}}
				id="circle1758"
				cx="87.291954"
				cy="233.01578"
				r="3.1431668"
			/>
			<circle
				style={{
					fill: "#4eab7f",
					strokeWidth: 0.0742803,
					strokeLinejoin: "round",
					strokeDasharray: "0.148561, 0.148561"
				}}
				id="circle1760"
				cx="87.291954"
				cy="241.72768"
				r="3.1431668"
			/>
		</>
	) : dv === 5 ? (
		<>
			<circle
				style={{
					fill: "#4eab7f",
					strokeWidth: 0.0742803,
					strokeLinejoin: "round",
					strokeDasharray: "0.148561, 0.148561"
				}}
				id="path1012-2"
				cx="82.00029"
				cy="233.01578"
				r="3.1431668"
			/>
			<circle
				style={{
					fill: "#4eab7f",
					strokeWidth: 0.0742803,
					strokeLinejoin: "round",
					strokeDasharray: "0.148561, 0.148561"
				}}
				id="circle2985-5"
				cx="90.466965"
				cy="224.54922"
				r="3.1431668"
			/>
			<circle
				style={{
					fill: "#4eab7f",
					strokeWidth: 0.0742803,
					strokeLinejoin: "round",
					strokeDasharray: "0.148561, 0.148561"
				}}
				id="circle2987-3"
				cx="73.533615"
				cy="241.48233"
				r="3.1431668"
			/>
			<circle
				style={{
					fill: "#4eab7f",
					strokeWidth: 0.0742803,
					strokeLinejoin: "round",
					strokeDasharray: "0.148561, 0.148561"
				}}
				id="circle2989-9"
				cx="90.466965"
				cy="241.48233"
				r="3.1431668"
			/>
			<circle
				style={{
					fill: "#4eab7f",
					strokeWidth: 0.0742803,
					strokeLinejoin: "round",
					strokeDasharray: "0.148561, 0.148561"
				}}
				id="circle2991-7"
				cx="73.533615"
				cy="224.54922"
				r="3.1431668"
			/>
		</>
	) : dv === 4 ? (
		<>
			<circle
				style={{
					fill: "#4eab7f",
					strokeWidth: 0.0742803,
					strokeLinejoin: "round",
					strokeDasharray: "0.148561, 0.148561"
				}}
				id="circle2985-0"
				cx="90.466965"
				cy="224.54922"
				r="3.1431668"
			/>
			<circle
				style={{
					fill: "#4eab7f",
					strokeWidth: 0.0742803,
					strokeLinejoin: "round",
					strokeDasharray: "0.148561, 0.148561"
				}}
				id="circle2987-7"
				cx="73.533615"
				cy="241.48233"
				r="3.1431668"
			/>
			<circle
				style={{
					fill: "#4eab7f",
					strokeWidth: 0.0742803,
					strokeLinejoin: "round",
					strokeDasharray: "0.148561, 0.148561"
				}}
				id="circle2989"
				cx="90.466965"
				cy="241.48233"
				r="3.1431668"
			/>
			<circle
				style={{
					fill: "#4eab7f",
					strokeWidth: 0.0742803,
					strokeLinejoin: "round",
					strokeDasharray: "0.148561, 0.148561"
				}}
				id="circle2991"
				cx="73.533615"
				cy="224.54922"
				r="3.1431668"
			/>
		</>
	) : dv === 3 ? (
		<>
			<circle
				style={{
					fill: "#4eab7f",
					strokeWidth: 0.0742803,
					strokeLinejoin: "round",
					strokeDasharray: "0.148561, 0.148561"
				}}
				id="path1012-4"
				cx="82.00029"
				cy="233.01578"
				r="3.1431668"
			/>
			<circle
				style={{
					fill: "#4eab7f",
					strokeWidth: 0.0742803,
					strokeLinejoin: "round",
					strokeDasharray: "0.148561, 0.148561"
				}}
				id="circle2985-4"
				cx="90.466965"
				cy="224.54922"
				r="3.1431668"
			/>
			<circle
				style={{
					fill: "#4eab7f",
					strokeWidth: 0.0742803,
					strokeLinejoin: "round",
					strokeDasharray: "0.148561, 0.148561"
				}}
				id="circle2987-8"
				cx="73.533615"
				cy="241.48233"
				r="3.1431668"
			/>
		</>
	) : dv === 2 ? (
		<>
			<circle
				style={{
					fill: "#4eab7f",
					strokeWidth: 0.0742803,
					strokeLinejoin: "round",
					strokeDasharray: "0.148561, 0.148561"
				}}
				id="circle2985"
				cx="90.466965"
				cy="224.54922"
				r="3.1431668"
			/>
			<circle
				style={{
					fill: "#4eab7f",
					strokeWidth: 0.0742803,
					strokeLinejoin: "round",
					strokeDasharray: "0.148561, 0.148561"
				}}
				id="circle2987"
				cx="73.533615"
				cy="241.48233"
				r="3.1431668"
			/>
		</>
	) : dv === 1 ? (
		<>
			<circle
				style={{
					fill: "#4eab7f",
					strokeWidth: 0.0742803,
					strokeLinejoin: "round",
					strokeDasharray: "0.148561, 0.148561"
				}}
				id="path1012"
				cx="82.00029"
				cy="233.01578"
				r="3.1431668"
			/>
		</>
	) : (
		<></>
	);
};

export const DicesDisplay = ({ diceCache, scale }: { diceCache: number, scale: number }) => {
	const [diceLeft, setDiceLeft] = React.useState<DiceValueType>(0)
    const [diceRight, setDiceRight] = React.useState<DiceValueType>(0)

	React.useEffect(() => {
        const dices = getDicePair(diceCache)
        setDiceLeft(dices.diceLeft)
        setDiceRight(dices.diceRight)
    },[diceCache])
	
	return (
		<>
			<svg
				width={`${52.916664 * scale}mm`}
				height={`${26.458332 * scale}mm`}
				viewBox={`0 0 ${52.916664} ${26.458332}`}
				version="1.1"
				id="svg5"
				xmlSpace="preserve"
				xmlns="http://www.w3.org/2000/svg">
				<defs id="defs2" />
				<g id="layer1" transform="translate(-24.805655,-105.86336)" visibility={((diceLeft !== 0) && (diceRight !== 0)) ? "show" : "hidden"}>
					<g
						id="left"
						transform="matrix(0.64189884,0,0,0.64189884,-14.601179,-30.480143)">
						<rect
							style={{
								fill: "#ffffff",
								fillOpacity: 1,
								stroke: "#4eab7f",
								strokeWidth: 1.05833,
								strokeLinejoin: "round",
								strokeDasharray: "none",
								strokeDashoffset: 0,
								strokeOpacity: 1
							}}
							id="rect294"
							width="29.855467"
							height="29.855467"
							x="67.072556"
							y="218.08804"
						/>
						<Dice dv={diceLeft} />
					</g>
					<g
						id="right"
						transform="matrix(0.64189878,0,0,0.64189878,11.857381,-30.479912)">
						<rect
							style={{
								fill: "#ffffff",
								fillOpacity: 1,
								stroke: "#4eab7f",
								strokeWidth: 1.05833,
								strokeLinejoin: "round",
								strokeDasharray: "none;stroke-dashoffset:0;stroke-opacity:1"
							}}
							id="rect294-0"
							width="29.855467"
							height="29.855467"
							x="67.072556"
							y="218.08804"
						/>
						<Dice dv={diceRight} />
					</g>
				</g>
			</svg>
		</>
	);
}
