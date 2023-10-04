import type { JestType } from "./types"

export type RoshamboContextType = {
    chosenJest: JestType|null
    opponentJest: JestType|null
    score: [number, number]
    dispatchJest: Function
    dispatchOpponentJest: Function
    dispatchScore: Function
}