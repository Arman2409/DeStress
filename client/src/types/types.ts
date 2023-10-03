export type JestType = "scissors"|"rock"|"paper"

export interface GameType {
    order: number
    image: string
    link: string
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