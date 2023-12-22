export type BallStatus = "bouncing" | "rolling" | "falling" | "stopped"

export type DirectionStatus = "left" | "right" | false

// props 

export type BounceGameProps = {
    canvasHeight: number
    canvasWidth: number
    mouseExtraX: number
    mouseExtraY: number
    ballRadius: number
}
// interfaces 
export interface GradientCoordinates {
    startX: number
    startY: number
    endX: number
    endY: number
}