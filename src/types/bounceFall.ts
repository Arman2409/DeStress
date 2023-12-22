export type BallStatus = "bouncing" | "rolling" | "falling" | "stopped"

export type DirectionStatus = "left" | "right" | false

// props 

export type BounceGameProps = {
    canvasHeight: string
    canvasWidth: string
}
// interfaces 
export interface GradientCoordinates {
    startX: number
    startY: number
    endX: number
    endY: number
}