import type { ReactNode } from "react"

export interface InfoDetailsProps {
    confirmText: string
    cancelText: string
    text: string
    image?: string
    imageWidth1?: string
    imageWidth2?: string
    image2?: string
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
export interface Point {
    x: number
    y: number
 }