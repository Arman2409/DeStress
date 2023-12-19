// props 
export type GameTilesProps = {
    choseGame: Function
}

export type TileProps = Omit<Game, "order"> & {
    choseGame: Function
    cornerInitialized?: boolean
}

export type CornerButtonProps = {
    type: "info" | "back"
    extraStyles?: any 
    action?: any
}

// interfaces 

export interface MousePosition {
    left: number,
    top: number
}

export interface Point {
    x: number
    y: number
 }
export interface Game {
    order: number
    image: string
    link: string
    cornerImage: string
    name: string
}