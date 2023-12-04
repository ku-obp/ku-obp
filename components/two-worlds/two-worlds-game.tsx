"use client"

import { TwoWorldsProvider } from "../providers/two-worlds-socket-provider"
import { TwoWorldsAllDisplay } from "./all-display"

export const TwoWorldsGame = ({height}: {height: number}) => {
    return (
        <div className="flex justify-center items-center w-full">
          <div className="flex flex-row justify-center items-center gap-4 w-full">
            <TwoWorldsProvider>
                <TwoWorldsAllDisplay height={height} />
            </TwoWorldsProvider>
          </div>
        </div>
    )
}