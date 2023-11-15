
import type { PointType } from "./main"

export type ConnectionType =  Array<[string, string]>
export type ConnectionsStatusType = "completed" | "skipped" | false

// interfaces 

export interface NeuronType {
    id: string
    placement: PointType
    tween?: any
    sprite: Phaser.GameObjects.Sprite
}

export interface NetworkSceneType extends Phaser.Scene {
    clickedNeuron: any
    neurons: any[]
    neuronConnections: ConnectionType[]
}

export type CompletedAlertProps = {
    setStatus: Function
    status: ConnectionsStatusType
}