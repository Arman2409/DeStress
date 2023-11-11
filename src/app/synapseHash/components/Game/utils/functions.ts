import { random } from "lodash"

import type { NetworkSceneType, NeuronType } from "../../../../../types/synapseHash"
import configs from "../../../../../configs/synapseHash"
import generateWithoutCollisions from "../../../../globals/functions/generatePointsWithoutCollisions"
import generateUniqueId from "../../../../globals/functions/generateUniqueId"
import getAngle from "../../../../globals/functions/getAngle"

const {
  neuronsCountRange,
  electrifiedConnectionFramesCount
} = { ...configs }

const getNeuronTweenConfig = (target: any) => ({
  targets: [target],
  rotation: 360,
  duration: 120000,
  repeat: -1
})

const calculateDistance = (x1: number, y1: number, x2: number, y2: number) => {
  const xDistance = Math.abs(x1 - x2);
  const yDistance = Math.abs(y1 - y2);
  const distance = Math.sqrt(xDistance ** 2 + yDistance ** 2);
  const middleX = x2 >= x1 ? xDistance / 2 : -xDistance / 2;
  const middleY = y2 >= y1 ? yDistance / 2 : -yDistance / 2;
  return ({
    middleX,
    middleY,
    distance
  });
}

const clickNeuron = (scene: NetworkSceneType, neuron: NeuronType) => {
  const { sprite, id } = { ...neuron };
  if (scene.clickedNeuron) {
    const previousClicked = scene.clickedNeuron;
    scene.clickedNeuron = neuron;
    const { x: startX = 0, y: startY = 0 } = { ...previousClicked.sprite };
    const { x: endX, y: endY } = { ...neuron.sprite };
    const angle = getAngle(startX, startY, endX, endY);
    const { middleX, middleY, distance } = calculateDistance(startX, startY, endX, endY);
    const newConnection = scene.physics.add.sprite(startX + middleX / 3, startY + middleY / 3, "connectionFrame")
      .setRotation(-Math.PI / 2 + angle)
      .setScale(distance * 0.0010, 1)
      .setDepth(1);
    newConnection.anims.create({
      key: "neuronConnectionAnimation",
      frames: Array.from({ length: electrifiedConnectionFramesCount }, (_, order) => ({ key: "connectionElectrifiedFrame" + (order + 1) })),
      frameRate: 1,
      duration: 2,
      repeat: -1,
    })
    newConnection.anims.play("neuronConnectionAnimation")
    setTimeout(() => {
      newConnection.x = startX + middleX / 2;
      newConnection.y = startY + middleY / 2;
      newConnection.setScale(distance * 0.0015, 1)
      setTimeout(() => {
        newConnection.x = startX + middleX;
        newConnection.y = startY + middleY;
        newConnection.setScale(distance * 0.003, 1)
      }, 250)
    }, 250)
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
    const newNeuronSprite = scene.add.sprite(x, y, "neuronFrame")
      .setRotation(random(0, 6.24))
      .setScale(0.25)
      .setDepth(2)
      .setInteractive();
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