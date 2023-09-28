export interface GameType {
    image: string
    link: string
    order: number
    name: string
}

export interface InfoDetailsType { 
    onAction: Function
    onCancel: Function 
    actionText: string
    cancelText: string
    infoText: string
}