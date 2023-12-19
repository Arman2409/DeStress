export type Jest = "scissors"|"rock"|"paper"
export type WindowSize = "small" | "medium" | "large"
export type GameStatus = "draw"|"lose"|"win"

// context 
export type RoshamboContextDetails = {
    chosenJest: Jest | null
    opponentJest: Jest | null
    opponentScore: number
    userScore: number
    result: GameStatus
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
    jest: Jest|null
    showingMode: boolean
    initialJest: Jest|null
    windowSize: WindowSize
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

export interface JestDetails {
    keyClicked?: boolean
    name: Jest
    keyboardImg: string
    jestImg: string
    keys: string[]
}