import { random } from "lodash"

import type { NetworkSceneType, NeuronType } from "../../../../../types/synapseHash"
import configs from "../../../../../configs/synapseHash"
import generateWithoutCollisions from "../../../../globals/functions/generatePointsWithoutCollisions"
import generateUniqueId from "../../../../globals/functions/generateUniqueId"
import getAngle from "../../../../globals/functions/getAngle"

const {
  neuronsCountRange
} = { ...configs }

const getNeuronTweenConfig = (target: any) => ({
  targets: [target],
  rotation: 360,
  duration: 120000,
  repeat: -1
})

const clickNeuron = (scene: NetworkSceneType, neuron: NeuronType) => {
  const { sprite, id } = { ...neuron };
  if (scene.clickedNeuron) {
    const previousClicked = scene.clickedNeuron;
    scene.clickedNeuron = neuron;
    const { x: startX = 0, y: startY = 0 } = { ...previousClicked.sprite };
    const { x: endX, y: endY } = { ...neuron.sprite };
    const angle = getAngle(startX, startY, endX, endY);
    previousClicked.tween.destroy();
    previousClicked.sprite.setRotation(-1.5 + angle);
  }
  sprite.setTexture("neuronElectrifiedFrame");
  scene.clickedNeuron = {
    tween: scene.tweens.add(getNeuronTweenConfig(sprite)),
    ...neuron
  }
}

export const addRandomNeurons = (scene: NetworkSceneType) => {
  const neuronsCount = random(neuronsCountRange[0], neuronsCountRange[1])
  const { width, height } = scene.sys.cameras.main;

  for (let i = 0; i < neuronsCount; i++) {
    const others = scene.neurons.map(({ placement }) => ({ ...placement }));
    const { x, y } = generateWithoutCollisions(others, width, height, 75);
    const newNeuronSprite = scene.add.sprite(x, y, "neuronFrame").setRotation(random(0, 6.24)).setScale(0.66);
    newNeuronSprite.setInteractive();
    const newNeuron = {
      id: generateUniqueId(scene.neurons),
      placement: {
        x,
        y
      },
      sprite: newNeuronSprite,
    }
    newNeuronSprite.on("pointerover", () => scene.input.setDefaultCursor("pointer"));
    newNeuronSprite.on("pointerout", () => scene.input.setDefaultCursor("default"));
    newNeuronSprite.on("pointerdown", () => clickNeuron(scene, newNeuron))
  }
}