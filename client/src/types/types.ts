export interface GameType {
    image: string
    link: string
    order: number
    name: string
}

export interface InfoDetailsType { 
    onOk: Function
    onCancel: Function 
    confirmText: string
    cancelText: string
    infoText: string
}