import type { InfoDetailsType, JestType } from "./types"

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