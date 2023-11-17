import type { ReactNode } from "react"

export interface InfoDetailsProps {
    confirmText: string
    cancelText: string
    text: string
    image?: string
    visible:boolean
    onOk: Function
    onCancel: Function
    setVisible: Function
}

export interface ScoreAlertProps {
    content?: ReactNode
    width?: number
    height?: number
    mode: "custom" | "extra"
    score?: number 
}
