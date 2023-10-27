import type { InfoDetailsType } from "./globals"

// props 
export type GameTilesProps = {
    choseGame: Function
}

export type TileProps = Omit<GameType, "order"> & {choseGame: Function}

export type InfoContextHolderProps = {
    details: InfoDetailsType|null
    setDetails: Function
}

export type CornerButtonProps = {
    type: "info" | "back"
    extraStyles?: any 
    action?: any
}

// interfaces 

export interface GameType {
    order: number
    image: string
    link: string
    cornerImage: string
    name: string
}