import React, { useEffect } from "react"
import {createRoot} from "react-dom/client"
import {Stage, Layer, Text, Rect, Line} from "react-konva"
import {CellHoverOverlay} from "@/components/two-worlds/primitives/cell-overlays"
import * as TwoWorlds from "@/lib/two-worlds"

import {Canvg} from "canvg"



export const TwoWorldsBoardDisplay = () => {
    const board_display = Canvg.from
    return (
        <Layer>
            
        </Layer>
    )
}


export const TwoWorldsBoard = () => {
    return (
        <Layer>

            <CellHoverOverlay/>
        </Layer>
    );
}
