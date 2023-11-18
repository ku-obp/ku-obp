import React, { useEffect, useState } from "react"
import {createRoot} from "react-dom/client"
import {Stage, Layer, Text, Rect, Line, Path} from "react-konva"

import {filter, range} from "lodash"

import * as TwoWorlds from "@/lib/two-worlds"

const INITIAL_MOUSE_HOVER = Array.from(range(0,54)).map((_) => false)

export const CellHoverOverlay = () => {

    const [mouseHover, setMouseHover] = useState<boolean[]>(INITIAL_MOUSE_HOVER);

    const detectMouseHover = (cellId: number, new_value: boolean): void => {
        let newMouseHover = Array.from(mouseHover)        
        newMouseHover[cellId] = new_value;
        setMouseHover(newMouseHover)
    }

    return (
        <Layer>
            <Rect
                onMouseOver={(e) => { detectMouseHover(5, true) }} onMouseOut={(e) => { detectMouseHover(5, false) }}
                x={439.59}
                y={790}
                width={50}
                height={75}
                fill={"#808080"} opacity={(mouseHover[5]) ? 0.5 : 0} />
            <Rect
                onMouseOver={(e) => { detectMouseHover(3, true) }} onMouseOut={(e) => { detectMouseHover(3, false) }}
                x={539.59003}
                y={790}
                width={50}
                height={75}
                fill={"#808080"} opacity={(mouseHover[3]) ? 0.5 : 0} />
            <Rect
                onMouseOver={(e) => { detectMouseHover(7, true) }} onMouseOut={(e) => { detectMouseHover(7, false) }}
                x={339.59}
                y={790}
                width={50}
                height={75}
                fill={"#808080"} opacity={(mouseHover[7]) ? 0.5 : 0} />
            <Rect
                onMouseOver={(e) => { detectMouseHover(1, true) }} onMouseOut={(e) => { detectMouseHover(1, false) }}
                x={639.59003}
                y={790}
                width={50}
                height={75}
                fill={"#808080"} opacity={(mouseHover[1]) ? 0.5 : 0} />
            <Path
                onMouseOver={(e) => { detectMouseHover(2, true) }} onMouseOut={(e) => { detectMouseHover(2, false) }}
                data="M 589.58984 810 L 589.58984 865 L 639.58984 865 L 639.58984 810 L 589.58984 810 z "
                fill={"#808080"} opacity={(mouseHover[2]) ? 0.5 : 0} />
            <Path
                onMouseOver={(e) => { detectMouseHover(4, true) }} onMouseOut={(e) => { detectMouseHover(4, false) }}
                data="M 489.58984 810 L 489.58984 865 L 539.58984 865 L 539.58984 810 L 489.58984 810 z "
                fill={"#808080"} opacity={(mouseHover[4]) ? 0.5 : 0} />
            <Path
                onMouseOver={(e) => { detectMouseHover(6, true) }} onMouseOut={(e) => { detectMouseHover(6, false) }}
                data="M 389.58984 810 L 389.58984 865 L 439.58984 865 L 439.58984 810 L 389.58984 810 z "
                fill={"#808080"} opacity={(mouseHover[6]) ? 0.5 : 0} />
            <Path
                onMouseOver={(e) => { detectMouseHover(8, true) }} onMouseOut={(e) => { detectMouseHover(8, false) }}
                data="M 289.58984 810 L 289.58984 865 L 339.58984 865 L 339.58984 810 L 289.58984 810 z "
                fill={"#808080"} opacity={(mouseHover[8]) ? 0.5 : 0} />
            <Rect
                onMouseOver={(e) => { detectMouseHover(31, true) }} onMouseOut={(e) => { detectMouseHover(31, false) }}
                x={-489.60001}
                y={-97.18}
                width={50}
                height={75}
                transform="scale(-1)"
                fill={"#808080"} opacity={(mouseHover[31]) ? 0.5 : 0} />
            <Path
                onMouseOver={(e) => { detectMouseHover(30, true) }} onMouseOut={(e) => { detectMouseHover(30, false) }}
                data="M -389.59961 -22.179688 L -389.59961 -77.179688 L -439.59961 -77.179688 L -439.59961 -22.179688 L -389.59961 -22.179688 z "
                transform="scale(-1)"
                fill={"#808080"} opacity={(mouseHover[30]) ? 0.5 : 0} />
            <Path
                onMouseOver={(e) => { detectMouseHover(29, true) }} onMouseOut={(e) => { detectMouseHover(29, false) }}
                data="M -339.59961 -22.179688 L -339.59961 -77.179688 L -389.59961 -77.179688 L -389.59961 -22.179688 L -339.59961 -22.179688 z "
                transform="scale(-1)"
                fill={"#808080"} opacity={(mouseHover[29]) ? 0.5 : 0} />
            <Rect
                onMouseOver={(e) => { detectMouseHover(28, true) }} onMouseOut={(e) => { detectMouseHover(28, false) }}
                x={289.59}
                y={22.18}
                width={50}
                height={75}
                transform="rotate(180,314.595,59.68)"
                fill={"#808080"} opacity={(mouseHover[28]) ? 0.5 : 0} />
            <Path
                onMouseOver={(e) => { detectMouseHover(33, true) }} onMouseOut={(e) => { detectMouseHover(33, false) }}
                data="M -539.59961 -22.179688 L -539.59961 -77.179688 L -589.59961 -77.179688 L -589.59961 -22.179688 L -539.59961 -22.179688 z "
                transform="scale(-1)"
                fill={"#808080"} opacity={(mouseHover[33]) ? 0.5 : 0} />
            <Path
                onMouseOver={(e) => { detectMouseHover(32, true) }} onMouseOut={(e) => { detectMouseHover(32, false) }}
                data="M -489.59961 -22.179688 L -489.59961 -77.179688 L -539.59961 -77.179688 L -539.59961 -22.179688 L -489.59961 -22.179688 z "
                transform="scale(-1)"
                fill={"#808080"} opacity={(mouseHover[32]) ? 0.5 : 0} />
            <Path
                onMouseOver={(e) => { detectMouseHover(34, true) }} onMouseOut={(e) => { detectMouseHover(34, false) }}
                data="M -589.59961 -22.179688 L -589.59961 -77.179688 L -639.59961 -77.179688 L -639.59961 -22.179688 L -589.59961 -22.179688 z "
                transform="scale(-1)"
                fill={"#808080"} opacity={(mouseHover[34]) ? 0.5 : 0} />
            <Path
                onMouseOver={(e) => { detectMouseHover(35, true) }} onMouseOut={(e) => { detectMouseHover(35, false) }}
                data="M -639.59961 -22.179688 L -639.59961 -77.179688 L -689.59961 -77.179688 L -689.59961 -22.179688 L -639.59961 -22.179688 z "
                transform="scale(-1)"
                fill={"#808080"} opacity={(mouseHover[35]) ? 0.5 : 0} />
            <Rect
                onMouseOver={(e) => { detectMouseHover(23, true) }} onMouseOut={(e) => { detectMouseHover(23, false) }}
                x={144.62}
                y={192.48}
                width={50}
                height={75}
                transform="rotate(120,169.61923,229.98304)"
                fill={"#808080"} opacity={(mouseHover[23]) ? 0.5 : 0} />
            <Rect
                onMouseOver={(e) => { detectMouseHover(19, true) }} onMouseOut={(e) => { detectMouseHover(19, false) }}
                x={289.36218}
                y={-299.38412}
                width={50}
                height={75}
                transform="rotate(120)"
                fill={"#808080"} opacity={(mouseHover[19]) ? 0.5 : 0} />
            <Rect
                onMouseOver={(e) => { detectMouseHover(21, true) }} onMouseOut={(e) => { detectMouseHover(21, false) }}
                x={94.879997}
                y={279.23999}
                width={50}
                height={75}
                transform="rotate(120,119.88281,316.74104)"
                fill={"#808080"} opacity={(mouseHover[21]) ? 0.5 : 0} />
            <Path
                onMouseOver={(e) => { detectMouseHover(20, true) }} onMouseOut={(e) => { detectMouseHover(20, false) }}
                data="M 239.36466 -224.38482 L 289.36423 -224.38457 L 289.3646 -299.38394 L 289.35855 -299.3827 L 289.35845 -279.38287 L 239.3659 -279.38266 L 239.36466 -224.38482 z M 289.35855 -299.3827 L 239.36502 -299.38418 L 239.366 -299.38249 L 289.35855 -299.3827 z "
                transform="rotate(120)"
                fill={"#808080"} opacity={(mouseHover[20]) ? 0.5 : 0} />
            <Path
                onMouseOver={(e) => { detectMouseHover(22, true) }} onMouseOut={(e) => { detectMouseHover(22, false) }}
                data="M 139.36817 -224.38459 L 189.36775 -224.38435 L 189.36811 -299.38371 L 189.36375 -299.38345 L 189.36366 -279.38362 L 139.36844 -279.38413 L 139.36817 -224.38459 z "
                transform="rotate(120)"
                fill={"#808080"} opacity={(mouseHover[22]) ? 0.5 : 0} />
            <Path
                onMouseOver={(e) => { detectMouseHover(24, true) }} onMouseOut={(e) => { detectMouseHover(24, false) }}
                data="M 39.364396 -224.38918 L 89.363972 -224.38893 L 89.364339 -299.3883 L 89.35998 -299.38804 L 89.359882 -279.38821 L 39.364665 -279.38871 L 39.364396 -224.38918 z "
                transform="rotate(120)"
                fill={"#808080"} opacity={(mouseHover[24]) ? 0.5 : 0} />
            <Path
                onMouseOver={(e) => { detectMouseHover(25, true) }} onMouseOut={(e) => { detectMouseHover(25, false) }}
                data="M -10.632513 -224.38871 L 39.367064 -224.38846 L 39.366454 -299.38952 L -10.633123 -299.38976 L -10.633837 -299.3871 L 39.36138 -299.38659 L 39.361282 -279.38676 L -10.633935 -279.38727 L -10.632513 -224.38871 z "
                transform="rotate(120)"
                fill={"#808080"} opacity={(mouseHover[25]) ? 0.5 : 0} />
            <Path
                onMouseOver={(e) => { detectMouseHover(26, true) }} onMouseOut={(e) => { detectMouseHover(26, false) }}
                data="M -60.632089 -224.38895 L -10.630821 -224.38968 L -10.630455 -299.38905 L -10.636505 -299.38781 L -10.636603 -279.38798 L -60.63182 -279.38849 L -60.632089 -224.38895 z "
                transform="rotate(120)"
                fill={"#808080"} opacity={(mouseHover[26]) ? 0.5 : 0} />
            <Rect
                onMouseOver={(e) => { detectMouseHover(50, true) }} onMouseOut={(e) => { detectMouseHover(50, false) }}
                x={-189.36502}
                y={992.21509}
                width={50}
                height={75}
                transform="rotate(-60)"
                fill={"#808080"} opacity={(mouseHover[50]) ? 0.5 : 0} />
            <Rect
                onMouseOver={(e) => { detectMouseHover(46, true) }} onMouseOut={(e) => { detectMouseHover(46, false) }}
                x={10.634992}
                y={992.21014}
                width={50}
                height={75}
                transform="rotate(-60)"
                fill={"#808080"} opacity={(mouseHover[46]) ? 0.5 : 0} />
            <Path
                onMouseOver={(e) => { detectMouseHover(47, true) }} onMouseOut={(e) => { detectMouseHover(47, false) }}
                data="M 10.634819 992.20911 L 10.630459 992.20937 L 10.630361 1012.2092 L -39.364856 1012.2087 L -39.365125 1067.2082 L 10.634452 1067.2085 L 10.634819 992.20911 z "
                transform="rotate(-60)"
                fill={"#808080"} opacity={(mouseHover[47]) ? 0.5 : 0} />
            <Path
                onMouseOver={(e) => { detectMouseHover(48, true) }} onMouseOut={(e) => { detectMouseHover(48, false) }}
                data="M -39.365735 992.20717 L -39.370094 992.20743 L -39.370192 1012.2073 L -89.365409 1012.2068 L -89.364701 1067.208 L -39.365125 1067.2082 L -39.365735 992.20717 z "
                transform="rotate(-60)"
                fill={"#808080"} opacity={(mouseHover[48]) ? 0.5 : 0} />
            <Path
                onMouseOver={(e) => { detectMouseHover(49, true) }} onMouseOut={(e) => { detectMouseHover(49, false) }}
                data="M -89.365311 992.20693 L -89.369671 992.20719 L -89.369768 1012.207 L -139.36499 1012.2065 L -139.36525 1067.206 L -89.365678 1067.2063 L -89.365311 992.20693 z "
                transform="rotate(-60)"
                fill={"#808080"} opacity={(mouseHover[49]) ? 0.5 : 0} />
            <Path
                onMouseOver={(e) => { detectMouseHover(51, true) }} onMouseOut={(e) => { detectMouseHover(51, false) }}
                data="M -189.36492 992.21347 L -189.36928 992.21373 L -189.36937 1012.2136 L -239.36459 1012.2131 L -239.36486 1067.2126 L -189.36528 1067.2128 L -189.36492 992.21347 z "
                transform="rotate(-60)"
                fill={"#808080"} opacity={(mouseHover[51]) ? 0.5 : 0} />
            <Path
                onMouseOver={(e) => { detectMouseHover(53, true) }} onMouseOut={(e) => { detectMouseHover(53, false) }}
                data="M -289.36505 992.21129 L -289.36941 992.21155 L -289.3695 1012.2114 L -339.36472 1012.2109 L -339.36499 1067.2104 L -289.36541 1067.2107 L -289.36505 992.21129 z "
                transform="rotate(-60)"
                fill={"#808080"} opacity={(mouseHover[53]) ? 0.5 : 0} />
            <Rect
                onMouseOver={(e) => { detectMouseHover(52, true) }} onMouseOut={(e) => { detectMouseHover(52, false) }}
                x={-289.36502}
                y={992.21252}
                width={50}
                height={75}
                transform="rotate(-60)"
                fill={"#808080"} opacity={(mouseHover[52]) ? 0.5 : 0} />
            <Rect
                onMouseOver={(e) => { detectMouseHover(14, true) }} onMouseOut={(e) => { detectMouseHover(14, false) }}
                x={578.96545}
                y={144.20032}
                width={50}
                height={75}
                transform="rotate(60)"
                fill={"#808080"} opacity={(mouseHover[14]) ? 0.5 : 0} />
            <Rect
                onMouseOver={(e) => { detectMouseHover(10, true) }} onMouseOut={(e) => { detectMouseHover(10, false) }}
                x={778.96545}
                y={144.2052}
                width={50}
                height={75}
                transform="rotate(60)"
                fill={"#808080"} opacity={(mouseHover[10]) ? 0.5 : 0} />
            <Rect
                onMouseOver={(e) => { detectMouseHover(16, true) }} onMouseOut={(e) => { detectMouseHover(16, false) }}
                x={478.957}
                y={143.89786}
                width={50}
                height={75}
                transform="rotate(60)"
                fill={"#808080"} opacity={(mouseHover[16]) ? 0.5 : 0} />
            <Path
                onMouseOver={(e) => { detectMouseHover(12, true) }} onMouseOut={(e) => { detectMouseHover(12, false) }}
                data="M 678.96596 144.2074 L 728.9602 144.20859 L 728.96029 164.20842 L 678.96605 164.20723 L 678.96535 219.20846 L 728.96492 219.20822 L 728.96553 144.20716 L 678.96596 144.2074 z "
                transform="rotate(60)"
                fill={"#808080"} opacity={(mouseHover[12]) ? 0.5 : 0} />
            <Path
                onMouseOver={(e) => { detectMouseHover(11, true) }} onMouseOut={(e) => { detectMouseHover(11, false) }}
                data="M 728.96661 164.2053 L 728.9659 219.20652 L 778.96548 219.20628 L 778.96511 144.20691 L 778.96075 144.20665 L 778.96085 164.20648 L 728.96661 164.2053 z "
                transform="rotate(60)"
                fill={"#808080"} opacity={(mouseHover[11]) ? 0.5 : 0} />
            <Path
                onMouseOver={(e) => { detectMouseHover(13, true) }} onMouseOut={(e) => { detectMouseHover(13, false) }}
                data="M 628.96648 164.20748 L 628.96577 219.2087 L 678.96535 219.20846 L 678.96498 144.2091 L 678.96062 144.20883 L 678.96072 164.20866 L 628.96648 164.20748 z "
                transform="rotate(60)"
                fill={"#808080"} opacity={(mouseHover[13]) ? 0.5 : 0} />
            <Path
                onMouseOver={(e) => { detectMouseHover(15, true) }} onMouseOut={(e) => { detectMouseHover(15, false) }}
                data="M 528.96687 164.20094 L 528.96616 219.20217 L 578.96574 219.20192 L 578.96537 144.20256 L 578.95932 144.20132 L 578.95835 144.20301 L 578.95942 164.20115 L 528.96687 164.20094 z "
                transform="rotate(60)"
                fill={"#808080"} opacity={(mouseHover[15]) ? 0.5 : 0} />
            <Path
                onMouseOver={(e) => { detectMouseHover(17, true) }} onMouseOut={(e) => { detectMouseHover(17, false) }}
                data="M 428.96674 164.20312 L 428.96603 219.20435 L 478.96561 219.2041 L 478.96524 144.20474 L 478.95919 144.2035 L 478.95822 144.20519 L 478.95929 164.20333 L 428.96674 164.20312 z "
                transform="rotate(60)"
                fill={"#808080"} opacity={(mouseHover[17]) ? 0.5 : 0} />
            <Rect
                onMouseOver={(e) => { detectMouseHover(41, true) }} onMouseOut={(e) => { detectMouseHover(41, false) }}
                x={-678.95831}
                y={548.61664}
                width={50}
                height={75}
                transform="rotate(-120)"
                fill={"#808080"} opacity={(mouseHover[41]) ? 0.5 : 0} />
            <Rect
                onMouseOver={(e) => { detectMouseHover(37, true) }} onMouseOut={(e) => { detectMouseHover(37, false) }}
                x={-478.95844}
                y={548.61163}
                width={50}
                height={75}
                transform="rotate(-120)"
                fill={"#808080"} opacity={(mouseHover[37]) ? 0.5 : 0} />
            <Path
                onMouseOver={(e) => { detectMouseHover(38, true) }} onMouseOut={(e) => { detectMouseHover(38, false) }}
                data="M -478.9559 623.61111 L -478.95627 548.61175 L -528.95584 548.61199 L -528.95682 548.61368 L -478.9616 548.61318 L -478.96151 568.61301 L -528.95672 568.61351 L -528.95548 623.61136 L -478.9559 623.61111 z "
                transform="rotate(-120)"
                fill={"#808080"} opacity={(mouseHover[38]) ? 0.5 : 0} />
            <Path
                onMouseOver={(e) => { detectMouseHover(40, true) }} onMouseOut={(e) => { detectMouseHover(40, false) }}
                data="M -578.95239 623.61089 L -578.95275 548.61152 L -628.95233 548.61177 L -628.95331 548.61346 L -578.9564 548.61393 L -578.9563 568.61376 L -628.95321 568.61329 L -628.95196 623.61113 L -578.95239 623.61089 z "
                transform="rotate(-120)"
                fill={"#808080"} opacity={(mouseHover[40]) ? 0.5 : 0} />
            <Path
                onMouseOver={(e) => { detectMouseHover(42, true) }} onMouseOut={(e) => { detectMouseHover(42, false) }}
                data="M -678.95714 623.61716 L -678.95653 548.61611 L -728.9561 548.61635 L -728.95708 548.61804 L -678.96186 548.61754 L -678.96177 568.61737 L -728.95698 568.61787 L -728.95671 623.61741 L -678.95714 623.61716 z "
                transform="rotate(-120)"
                fill={"#808080"} opacity={(mouseHover[42]) ? 0.5 : 0} />
            <Path
                onMouseOver={(e) => { detectMouseHover(43, true) }} onMouseOut={(e) => { detectMouseHover(43, false) }}
                data="M -728.95405 623.61669 L -728.95441 548.61733 L -728.95877 548.61707 L -728.95965 568.61859 L -778.95487 568.6191 L -778.95362 623.61694 L -728.95405 623.61669 z "
                transform="rotate(-120)"
                fill={"#808080"} opacity={(mouseHover[43]) ? 0.5 : 0} />
            <Path
                onMouseOver={(e) => { detectMouseHover(39, true) }} onMouseOut={(e) => { detectMouseHover(39, false) }}
                data="M -528.95379 623.61233 L -528.95318 548.61128 L -578.95444 548.61054 L -578.95373 548.61321 L -528.95851 548.61271 L -528.95841 568.61254 L -578.95363 568.61304 L -578.95505 623.6116 L -528.95379 623.61233 z "
                transform="rotate(-120)"
                fill={"#808080"} opacity={(mouseHover[39]) ? 0.5 : 0} />
            <Path
                onMouseOver={(e) => { detectMouseHover(44, true) }} onMouseOut={(e) => { detectMouseHover(44, false) }}
                data="M -778.95095 623.61622 L -778.95132 548.61686 L -828.9509 548.6171 L -828.95187 548.61879 L -778.95666 548.61829 L -778.95656 568.61812 L -828.95178 568.61862 L -828.95053 623.61647 L -778.95095 623.61622 z "
                transform="rotate(-120)"
                fill={"#808080"} opacity={(mouseHover[44]) ? 0.5 : 0} />
            <Path
                onMouseOver={(e) => { detectMouseHover(0, true) }} onMouseOut={(e) => { detectMouseHover(0, false) }}
                data="M 754.54 827.5 L 689.59 790 L 689.59 865 "
                fill={"#808080"} opacity={(mouseHover[0]) ? 0.5 : 0} />
            <Path
                onMouseOver={(e) => { detectMouseHover(9, true) }} onMouseOut={(e) => { detectMouseHover(9, false) }}
                data="M 289.59 865 L 289.59 790 L 224.64 827.5 "
                fill={"#808080"} opacity={(mouseHover[9]) ? 0.5 : 0} />
            <Path
                onMouseOver={(e) => { detectMouseHover(36, true) }} onMouseOut={(e) => { detectMouseHover(36, false) }}
                data="M 754.54 59.68 L 689.59 22.18 L 689.59 97.18 "
                fill={"#808080"} opacity={(mouseHover[36]) ? 0.5 : 0} />
            <Path
                onMouseOver={(e) => { detectMouseHover(27, true) }} onMouseOut={(e) => { detectMouseHover(27, false) }}
                data="M 224.64 59.68 L 289.59 97.18 L 289.59 22.18 "
                fill={"#808080"} opacity={(mouseHover[27]) ? 0.5 : 0} />
            <Path
                onMouseOver={(e) => { detectMouseHover(18, true) }} onMouseOut={(e) => { detectMouseHover(18, false) }}
                data="M 24.64 481.09 L 89.59 443.59 L 24.64 406.09 "
                fill={"#808080"} opacity={(mouseHover[18]) ? 0.5 : 0} />
            <Path
                onMouseOver={(e) => { detectMouseHover(45, true) }} onMouseOut={(e) => { detectMouseHover(45, false) }}
                data="M 954.54 406.09 L 889.59 443.59 L 954.54 481.09 "
                fill={"#808080"} opacity={(mouseHover[45]) ? 0.5 : 0} />
        </Layer>
    )
}


const initializePlayerLocations = (playerEmails: string[]): Map<string, number> => {
    const output = new Map<string, number>();
    for(const email of playerEmails) {
        output.set(email, 0)
    }
    return output
}


type MoveType = "normal" | "back" | "warp";
type CmpResultType = "lt" | "eq" | "gt";
const cmp = (a: number, b: number): CmpResultType => {
    if((a - b) === 0) {
        return "eq";
    }
    else if ((a-b) > 0) {
        return "gt";
    }
    else {return "lt"}
}

type CYCLE_CHECK_LUT_INNER_TYPE = {
    "lt": boolean,
    "eq": boolean,
    "gt": boolean
}

type CYCLE_CHECK_LUT_TYPE = {
    "warp": CYCLE_CHECK_LUT_INNER_TYPE,
    "normal": CYCLE_CHECK_LUT_INNER_TYPE,
    "back": CYCLE_CHECK_LUT_INNER_TYPE,
}

const CYCLE_CHECK_LUT: CYCLE_CHECK_LUT_TYPE = {
    "warp": {
        "lt": false,
        "eq": false,
        "gt": false
    },
    "normal": {
        "lt": false,
        "eq": true,
        "gt": true
    },
    "back": {
        "lt": false,
        "eq": false,
        "gt": false
    }
}


export const PlayersLocationsOverlay = ({players, nowPlaying}: {players: {email: string, ord: number}[], nowPlaying: string}) => {
    const playerEmails = players.map(({email, ord}) => email)
    const [playerLocation, setPlayerLocation] = React.useState<Map<string, number>>(new Map());
    const [playerDisplayLocation, setPlayerDisplayLocation] = React.useState<Map<string, number>>(new Map())


    useEffect(() => {
        setPlayerLocation(initializePlayerLocations(playerEmails))
    }, [playerEmails])

    useEffect(() => {
        const move = (targetPlayerEmail: string, toCellId: number, type: MoveType = "normal"): void => {
            const origLocation = playerLocation.get(targetPlayerEmail);
            
            if (origLocation === undefined) {
                return;
            }
            
            const cmp_result = cmp(origLocation, toCellId);
            

            const newCycle = CYCLE_CHECK_LUT[type][cmp_result];
            displayMove(targetPlayerEmail,toCellId,newCycle,type);
        }
        const patchDisplayLocation = (playerId: string, patch: (old: number) => number) => {
            const target_player_former_display_location = playerDisplayLocation.get(playerId);
            if(target_player_former_display_location === undefined) {
                return false;
            }
            setPlayerDisplayLocation(playerDisplayLocation.set(playerId,patch(target_player_former_display_location)));
            return true;
        }

        const patchLocation = (playerId: string, patch: (old: number) => number): boolean => {
            const target_player_orig_location = playerLocation.get(playerId);
            if(target_player_orig_location === undefined) {
                return false;
            }
            setPlayerLocation(playerLocation.set(playerId,patch(target_player_orig_location)));
            return true;
        }

        const displayMove = (playerId: string, toCellId: number, newCycle: boolean, type: MoveType) => {
            let finished: boolean = false;
            switch(type) {
                case "normal":
                    do {
                        setTimeout(patchDisplayLocation, 500, playerId, (old) => ((old+1) % 54));
                        const after = playerDisplayLocation.get(playerId);
                        if(after === toCellId) {
                            finished = true;
                        }
                    } while(!finished);
                    break;
                case "back":
                    do {
                        setTimeout(patchDisplayLocation, 500, playerId, (old) => ((old-1) % 54));
                        const after = playerDisplayLocation.get(playerId);
                        if(after === toCellId) {
                            finished = true;
                        }
                    } while(!finished);
                    break;
                case "warp":
                    setTimeout(patchDisplayLocation, 1000, playerId, (_) => toCellId);
                    break;
            }

            patchLocation(playerId, (_) => toCellId);

            // TODO: emit "animation-finished" event to the server.

            if (newCycle) {
                // TODO: emit "new-cycle" event to the server.
            }
        }
    }, [playerLocation, playerDisplayLocation])
}

export const PlayerCellDisplay = ({players, playerDisplayLocations, cellId}: { players: {email: string, ord: number}[], playerDisplayLocations: Map<String, number>, cellId: number}) => {
    const sorted = players.sort((a, b) => a.ord - b.ord);
    const here = Array.from(playerDisplayLocations.entries()).filter(([_, location]) => location === cellId).map(([playerId, _]) => playerId)
    const filtered = sorted.filter(({email}) => email in here).map(({ord}) => ord)
}