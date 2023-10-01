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

export interface JestType {
    keyClicked?: boolean
    name: string
    keyboardImg: string
    jestImg: string
    keys: string[]
}