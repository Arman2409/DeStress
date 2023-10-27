export type DirectionType = "left" | "right" | "top" | "bottom"

// interfaces 

export interface PointType {
    x: number
    y: number
 }
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

export interface JellyfishType
{ 
    sprite: Phaser.GameObjects.Sprite,
    updateInterval: any 
}

export interface OceanSceneType extends Phaser.Scene
{
    jellyfish: JellyfishType
    plants: any[]
    fishSchools: FishSchoolType[]
}