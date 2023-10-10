import type { GameStatusType, JestType } from "./types"

export type RoshamboContextType = {
    chosenJest: JestType | null
    opponentJest: JestType | null
    opponentScore: number
    userScore: number
    result: GameStatusType
    dispatchJest: Function
    dispatchOpponentJest: Function
}

export type SharkHuntContextType = {
    
}