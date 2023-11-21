import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PlayerType = {
    email: string,
    order: number,
    location: number,
    cash: number
}

type PropertyType = {
    ownerEmail: string,
    count: number,
    cellId: number
}

type GoForwardPayload = {
    order: number
}

type SetPlayerLocationPayload = {
    order: number,
    dest: number
}

type MovePayload = {
    order: number,
    dest: number,
    type: "forward" | "backward" | "warp"
}

type LocationType = number | null

type StateType = {
    players: PlayerType[],
    properties: PropertyType[],
    displayLocations: {
        order: number,
        displayLocation: number
    }[]
}

const _initialState = {
    players: [],
    properties: []
}

const initialState: StateType = {
    ..._initialState,
    displayLocations: []
}

export const twoWorldsSlice = createSlice({
    name: "two-worlds",
    initialState,
    reducers: {
        goForward: (state, action: PayloadAction<GoForwardPayload>) => {
            for(let player of state.players) {
                if(player.order === action.payload.order) {
                    player.location = (player.location+1) % 54
                }
            }
        },
        setPlayerLocation: (state, action: PayloadAction<SetPlayerLocationPayload>) => {
            for(let player of state.players) {
                if(player.order === action.payload.order) {
                    player.location = action.payload.dest
                }
            }
        },
        movePlayer: (state, action: PayloadAction<MovePayload>) => {
            for(let dlinfo of state.displayLocations) {
                if(dlinfo.order === action.payload.order) {
                    switch(action.payload.type) {
                        case "forward":
                            do {
                                setTimeout(() => {
                                    dlinfo.displayLocation = (dlinfo.displayLocation + 1) % 54
                                }, 600)
                            } while (dlinfo.displayLocation !== action.payload.dest)
                            break;
                        case "backward":
                            do {
                                setTimeout(() => {
                                    dlinfo.displayLocation = (dlinfo.displayLocation - 1) % 54
                                }, 600)
                            } while (dlinfo.displayLocation !== action.payload.dest)
                            break;
                        case "warp":
                            setTimeout(() => {
                                dlinfo.displayLocation = action.payload.dest
                            }, 600)
                            break;
                    }
                }
            }
            for(let player of state.players) {
                if(player.order === action.payload.order) {
                    player.location = action.payload.dest
                }
            }
        },
    }
});

export const {
    goForward, setPlayerLocation, movePlayer
} = twoWorldsSlice.actions;

export default twoWorldsSlice.reducer;