export type JestType = "scissors"|"rock"|"paper"
export type GameStatusType = "draw"|"lose"|"win"

export interface GameType {
    order: number
    image: string
    link: string
    cornerImage: string
    name: string
}

export interface InfoDetailsType {
    confirmText: string
    cancelText: string
    infoText: string
    onOk: Function
    onCancel: Function
}

export interface JestDetailsType {
    keyClicked?: boolean
    name: JestType
    keyboardImg: string
    jestImg: string
    keys: string[]
}