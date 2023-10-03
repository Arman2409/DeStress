import type { JestType } from "./types"

export type RoshamboContextType = {
    chosenJest: JestType|null
    dispatchJest: Function
    opponentJest: JestType|null
    dispatchOpponentJest: Function
}