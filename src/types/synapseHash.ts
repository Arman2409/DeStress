
import type { PointType } from "./main"

// interfaces 

export interface NeuronType {
    placement: PointType
}

export interface NetworkSceneType extends Phaser.Scene{
   neurons: any[]
}