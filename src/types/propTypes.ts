import type { GameType, InfoDetailsType, JestType } from "./types"

export type GameTilesProps = {
    choseGame: Function
}

export type TileProps = Omit<GameType, "order"> & {choseGame: Function}

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

export type InfoContextHolderProps = {
    details: InfoDetailsType|null
    setDetails: Function
}

export type BackButtonProps = {
    extraStyles?: any 
    action?: any
}

export type AnimatingScoresProps = {
    score: number
}

export type AnimationProps = {
    background: string
}