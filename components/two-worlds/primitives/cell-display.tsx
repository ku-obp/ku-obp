import React, { useEffect } from "react"
import {createRoot} from "react-dom/client"
import {Stage, Layer, Text, Rect, Line} from "react-konva"
import {CellHoverOverlay} from "@/components/two-worlds/primitives/cell-overlays"
import * as TwoWorlds from "@/lib/two-worlds"

import {Canvg} from "canvg"


const Board = () => {
    return (
        <Layer>
            
            <CellHoverOverlay/>
        </Layer>
    );
}