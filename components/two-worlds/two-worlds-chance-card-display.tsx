'use client'

import React, { useState, useEffect } from "react"

import { arrayRange, divmod } from "@/lib/utils"

export const SimpleDescription = ({content}: {content: string[]}) => {
    return (
        (content.length > 0) ? (
            (content.length === 1) ? <>
                
    <text
       xmlSpace="preserve"
       transform="matrix(0.35277777,0,0,0.35277777,62.378289,96.201763)"
       style={{fontVariant: "normal", fontWeight: "normal", fontStretch: "normal", fontSize: "13pt", lineHeight: "0pt",fontFamily:'KoPubBatang_Pro Medium', textAlign: "center", textAnchor: "middle", whiteSpace: "pre", inlineSize:146.822, display: "inline", fill: "#ffffff", fillOpacity: 0.899994, fillRule: "nonzero", stroke: "none"}}
       x="46.761703"
       y="0"><tspan
           style={{fontFamily:'KoPubBatang Medium'}}
           id="tspan293">{content[0]}</tspan></text>
            </>
        : (content.length === 2) ? <>
       <text
       xmlSpace="preserve"
       transform="matrix(0.35277777,0,0,0.35277777,62.378289,92.074273)"
       style={{fontVariant: "normal", fontWeight: "normal", fontStretch: "normal", fontSize: "10pt",lineHeight: "0pt",fontFamily:'KoPubBatang_Pro Medium', textAlign: "center", textAnchor: "middle", whiteSpace: "pre", inlineSize:146.822, display: "inline", fill: "#ffffff", fillOpacity: 0.899994, fillRule: "nonzero", stroke: "none"}}
       x="46.761703"
       y="0"><tspan
           style={{fontFamily:'KoPubBatang Medium'}}
           id="tspan293">{content[0]}</tspan></text>
        <text
       xmlSpace="preserve"
       transform="matrix(0.35277777,0,0,0.35277777,62.378289,100.32925)"
       style={{fontVariant: "normal", fontWeight: "normal", fontStretch: "normal", fontSize: "10pt",lineHeight: "0pt",fontFamily:'KoPubBatang_Pro Medium', textAlign: "center", textAnchor: "middle", whiteSpace: "pre", inlineSize:146.822, display: "inline", fill: "#ffffff", fillOpacity: 0.899994, fillRule: "nonzero", stroke: "none"}}
       x="46.761703"
       y="0"><tspan
           style={{fontFamily:'KoPubBatang Medium'}}
           id="tspan293">{content[1]}</tspan></text>
           </> : <>
        
    <text
       xmlSpace="preserve"
       transform="matrix(0.35277777,0,0,0.35277777,62.378289,89.781213)"
       style={{fontVariant: "normal", fontWeight: "normal", fontStretch: "normal", fontSize: "10pt",lineHeight: "0pt",fontFamily:'KoPubBatang_Pro Medium', textAlign: "center", textAnchor: "middle", whiteSpace: "pre", inlineSize:146.822, display: "inline", fill: "#ffffff", fillOpacity: 0.899994, fillRule: "nonzero", stroke: "none"}}
       x="46.761703"
       y="0"><tspan
           style={{fontFamily:'KoPubBatang Medium'}}
           id="tspan293">{content[0]}</tspan></text>
    <text
       xmlSpace="preserve"
       transform="matrix(0.35277777,0,0,0.35277777,62.378289,96.201763)"
       style={{fontVariant: "normal", fontWeight: "normal", fontStretch: "normal", fontSize: "10pt",lineHeight: "0pt",fontFamily:'KoPubBatang_Pro Medium', textAlign: "center", textAnchor: "middle", whiteSpace: "pre", inlineSize:146.822, display: "inline", fill: "#ffffff", fillOpacity: 0.899994, fillRule: "nonzero", stroke: "none"}}
       x="46.761703"
       y="0"><tspan
           style={{fontFamily:'KoPubBatang Medium'}}
           id="tspan293">{content[1]}</tspan></text>
    <text
       xmlSpace="preserve"
       transform="matrix(0.35277777,0,0,0.35277777,62.378289,102.622313)"
       style={{fontVariant: "normal", fontWeight: "normal", fontStretch: "normal", fontSize: "10pt",lineHeight: "0pt",fontFamily:'KoPubBatang_Pro Medium', textAlign: "center", textAnchor: "middle", whiteSpace: "pre", inlineSize:146.822, display: "inline", fill: "#ffffff", fillOpacity: 0.899994, fillRule: "nonzero", stroke: "none"}}
       x="46.761703"
       y="0"><tspan
           style={{fontFamily:'KoPubBatang Medium'}}
           id="tspan293">{content[2]}</tspan></text>
        </>) : <></>
    )
}

export const Details = ({content}: {content: string[]}) => {
   return (content.length > 0) ? (
      (content.length > 1) ? <>
      <text
          xmlSpace="preserve"
          transform="matrix(0.35277777,0,0,0.35277777,62.378289,113.49126)"
          style={{fontVariant: "normal", fontWeight: "normal", fontStretch: "normal", fontSize: "10pt",lineHeight: "0pt",fontFamily:'KoPubBatang_Pro Medium', textAlign: "center", textAnchor: "middle", whiteSpace: "pre", inlineSize:146.822, display: "inline", fill: "#ffffff", fillOpacity: 0.899994, fillRule: "nonzero", stroke: "none"}}
          id="text11300"
          x="46.761703"
          y="0"><tspan
              style={{fontFamily:'KoPubBatang Medium'}}
              id="tspan309">{content[0]}</tspan></text>
       <text
          xmlSpace="preserve"
          transform="matrix(0.35277777,0,0,0.35277777,62.378289,118.07737)"
          style={{fontVariant: "normal", fontWeight: "normal", fontStretch: "normal", fontSize: "10pt",lineHeight: "0pt",fontFamily:'KoPubBatang_Pro Medium', textAlign: "center", textAnchor: "middle", whiteSpace: "pre", inlineSize:146.822, display: "inline", fill: "#ffffff", fillOpacity: 0.899994, fillRule: "nonzero", stroke: "none"}}
          id="text11278"
          x="46.761703"
          y="0"><tspan
              style={{fontFamily:'KoPubBatang Medium'}}
              id="tspan293">{content[1]}</tspan></text>
      </> : <>
      
      <text
          xmlSpace="preserve"
          transform="matrix(0.35277777,0,0,0.35277777,62.378289,118.07737)"
          style={{fontVariant: "normal", fontWeight: "normal", fontStretch: "normal", fontSize: "10pt",lineHeight: "0pt",fontFamily:'KoPubBatang_Pro Medium', textAlign: "center", textAnchor: "middle", whiteSpace: "pre", inlineSize:146.822, display: "inline", fill: "#ffffff", fillOpacity: 0.899994, fillRule: "nonzero", stroke: "none"}}
          id="text11278"
          x="46.761703"
          y="0"><tspan
              style={{fontFamily:'KoPubBatang Medium'}}
              id="tspan293">{content[0]}</tspan></text></>
   ) : <></>
}


import PREDEFINED_CHANCE_CARDS, { ChanceCardMetadata, PREDEFINED_CHANCE_IDS } from "@/lib/two-worlds.parts/chance-cards"

export const ChanceCardDisplay = ({chanceId, scale}: {chanceId: string, scale: number}) => {

   const [metadata, setMetadata] = React.useState<ChanceCardMetadata | null>(null)
   
   React.useEffect(() => {
      if (PREDEFINED_CHANCE_IDS.has(chanceId)) {
         setMetadata(PREDEFINED_CHANCE_CARDS[chanceId])
      } else {
         setMetadata(null)
      }
   }, [chanceId])



    
    return (<div style={{scale: scale}}>
        <svg     
         width="94.000107mm"
         height="63.000107mm"
        preserveAspectRatio="xMidYMid meet"
   viewBox="0 0 94.000107 63.000107"
   version="1.1"
   id="svg11345"
   xmlns="http://www.w3.org/2000/svg">
  <defs
     id="defs11342" />
  <g
     id="layer1"
     transform="translate(-32.421882,-66.535973)">
    <path
       d="M 32.421882,129.53608 H 126.42199 V 66.535973 H 32.421882 Z"
       style={{fill: (metadata === null) ? "#858585" : "#cd533d", fillOpacity: 1, fillRule: "nonzero", stroke: "none", strokeWidth: 0.352778}}
       id="path11262" />
    <path
       d="M 32.421882,81.460583 H 126.42199 V 66.536323 H 32.421882 Z"
       style={{fill: (metadata === null) ? "#C5c5c5" : "#eede9c", fillOpacity: 1, fillRule: "nonzero", stroke: "none", strokeWidth: 0.352778}}
       id="path11264" />
    <path
       d="M 65.743013,107.92742 H 93.100576"
       style={{fill: "none", stroke: (metadata === null) ? "#585858" : "#8d2330", strokeWidth: 0.705556, strokeLinecap: "butt", strokeLinejoin: "miter", strokeMiterlimit: "10", strokeDasharray: "none", strokeOpacity: 1}}
       id="path11270" />
    <path
       d="M 124.42209,128.03607 H 34.422132 V 68.035983 h 89.999958 z"
       style={{fill: "none", stroke: (metadata === null) ? "#646464" : "#9a302d", strokeWidth: 0.0881944, strokeLinecap: "butt", strokeLinejoin: "miter", strokeMiterlimit: "10", strokeDasharray: "none", strokeOpacity: 1}}
       id="path11286" />

   {(metadata !== null) ? <>
   
      <text
       xmlSpace="preserve"
       style={{fontVariant: "normal", fontWeight: "bold", fontStretch: "normal", fontSize: "5.64444pt",fontFamily:'KoPubDotum_Pro Bold', fill: "#c23844", fillOpacity: 1, fillRule: "nonzero", stroke: "none", strokeWidth: 0.352778}}
       id="text11268"
       x="63"
       y="76.932053">{metadata.title}</text>
   <SimpleDescription content={metadata.simple.split("\n")} />
   <Details content={metadata.detail.split("\n")} />
   {(metadata.note !== null) ? <>
      <g
       id="g825">
      <path
         d="M 115.11647,124.91504 H 43.727414 v -3.88408 h 71.389056 z"
         style={{fill: "#eede9b", fillOpacity: 1, fillRule: "nonzero", stroke: "none", strokeWidth: 0.402942}}
         id="path11280" />
      <text
         xmlSpace="preserve"
         style={{fontVariant: "normal", fontWeight: "normal", fontStretch: "normal", fontSize: "2.11667pt",fontFamily:'KoPubDotum_Pro Medium', textAlign: "center", textAnchor: "middle", whiteSpace: "pre", inlineSize:111.956, display: "inline", fill: "#231f20", fillOpacity: 1, fillRule: "nonzero", stroke: "none", strokeWidth: 0.352778}}
         id="text11284"
         x="130.46347"
         y="123.86874"
         transform="translate(-51.042099,-0.20494209)"><tspan
           x="130.46347"
           y="123.86874"
           id="tspan299"><tspan
             style={{fontWeight: "bold", fontFamily: "KoPubDotum_Pro"}}
             id="tspan297">{metadata.note}</tspan></tspan></text>
    </g>
   </> : <></>}
   </> : <></>}

    
  </g>
</svg>
</div>
    )
}