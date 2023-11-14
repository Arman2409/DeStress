
import type { PointType } from "./main"


export type ConnectionType =  Array<[string, string]>
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