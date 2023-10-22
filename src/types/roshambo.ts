export type JestType = "scissors"|"rock"|"paper"
export type GameStatusType = "draw"|"lose"|"win"

// context 
export type RoshamboContextType = {
    chosenJest: JestType | null
    opponentJest: JestType | null
    opponentScore: number
    userScore: number
    result: GameStatusType
    dispatchJest: Function
    dispatchOpponentJest: Function
}

// props 
export type JestProps = {
    keyClicked?: boolean
    borderRight?: boolean
    borderLeft?: boolean
    jestImg: string
    keyboardImg: string
    name: string
    onClick: Function
}

export type ShakingHandProps = {
    jest: JestType|null
    showingMode: boolean
    initialJest: JestType|null
    side: "left"|"right"
    duration: number
}

export type AnimatingScoresProps = {
    score: number
}

export type AnimationProps = {
    background: string
}

// interfaces 

export interface JestDetailsType {
    keyClicked?: boolean
    name: JestType
    keyboardImg: string
    jestImg: string
    keys: string[]
}