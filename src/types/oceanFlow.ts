import { PointType } from "./main"

// interfaces 
export interface FishSchoolType  {
    id: string
    fishes: Array<any>
    startingPoint: any
    fishCount: number
    direction: PointType
    interval: any
    currentPosition: PointType
    escapingFrom: null|PointType
    escapeDirections: Array<PointType>
}

export interface OceanSceneType extends Phaser.Scene
{
    jellyfish:  Phaser.GameObjects.Sprite
    fishSchools: FishSchoolType[]
}

export type ScoreProps = {
    score: number
}