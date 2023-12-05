import { useState, useEffect, useRef } from "react";
import { SocketBroker, useSocketBroker } from "@/components/providers/monopoly-socket-provider";
import { MonopolyView } from "@/components/monopoly/monopoly-view";
import { COLORMAP } from "@/lib/monopoly-player";

const MonopolyWrapper = ({ name }: { name: string }) => {
    const {
        broker, ord
    } = useSocketBroker()

    const [outlineCSS, setOutlineCSS] = useState<{outlineStyle?: string, outlineWidth?: string, outlineColor?: string}>({})

    useEffect(() => {
        if (ord in [0,1,2,3,4,5]) {
            setOutlineCSS({outlineStyle: "solid", outlineWidth: "5px", outlineColor: COLORMAP[ord]})
        }
    }, [ord])

    return (
        (broker !== null) ? (
            <div style={outlineCSS}>
                <MonopolyView
                    broker={broker}
                    name={name}
                />
            </div>
        ) : (
            <>
                SOMETHING WENT WRONG
            </>
        )
    )
}

export default MonopolyWrapper