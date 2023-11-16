// interfaces 

import type { ReactNode } from "react"

export interface InfoDetailsType {
    confirmText: string
    cancelText: string
    text: string
    image?: string
    onOk: Function
    onCancel: Function
}

export interface ScoreAlertProps {
    content?: ReactNode
    width?: number
    height?: number
    mode: "custom" | "extra"
    score?: number 
}
