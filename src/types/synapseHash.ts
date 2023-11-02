
import type { PointType } from "./main"

// interfaces 

export interface NeuronType {
    id: string
    placement: PointType
    sprite: Phaser.GameObjects.Sprite
}

export interface NetworkSceneType extends Phaser.Scene {
    clickedNeuron: any
    neurons: any[]
}