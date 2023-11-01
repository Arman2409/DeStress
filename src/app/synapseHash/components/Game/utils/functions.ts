import { random } from "lodash"

import type { NetworkSceneType } from "../../../../../types/synapseHash"
import configs from "../../../../../configs/synapseHash"
import generateWithoutCollisions from "../../../../globals/functions/generatePointsWithoutCollisions"

const {
  neuronsCountRange
} = {...configs}

export const addRandomNeurons = (scene: NetworkSceneType) => {
  const neuronsCount = random(neuronsCountRange[0], neuronsCountRange[1])
  const { width, height } = scene.sys.cameras.main;

  for (let i=0; i<neuronsCount; i++) {
    const others = scene.neurons.map(({placement}) => ({...placement}));    
    const {x, y} = generateWithoutCollisions(others, width, height, 75);
    scene.add.sprite(x, y, "neuronFrame").setRotation(random(0, 6.24)).setScale(0.66);
    scene.neurons.push({
        placement: {
            x,
            y
        }
    })
  }
}