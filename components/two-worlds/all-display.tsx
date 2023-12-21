import { TwoWorldsBoard } from "@/components/two-worlds/two-worlds-board";
import { TwoWorldsControlPanel } from "@/components/two-worlds/two-worlds-control-simple";

export const TwoWorldsAllDisplay = ({height}: {height: number}) => {
    return (
        <>
            <div style={{display: "inline-block"}}>
                <TwoWorldsBoard height={height} />
            </div>
            <div style={{display: "inline-block"}}>
                <TwoWorldsControlPanel height={height} />
            </div>
        </>
        
    )
}