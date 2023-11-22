import { random } from "lodash"

import type { NetworkScene, Neuron } from "../../../../../types/synapseHash"
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

const clickNeuron = (scene: NetworkScene, neuron: Neuron, callback: Function) => {
  const { sprite, id } = { ...neuron };
  if (scene.clickedNeuron) {
    const previousClicked = scene.clickedNeuron;
    const { id: prevId } = previousClicked;
    previousClicked.tween.destroy();
    let hasConnection = false;
    scene.neuronConnections.forEach((elem: any) => {
      if (elem.includes(id) && elem.includes(prevId)) {
        hasConnection = true;
      }
    })
    scene.clickedNeuron = {
      tween: scene.tweens.add(getNeuronTweenConfig(sprite)),
      ...neuron
    }
    if (hasConnection && scene.neuronConnections.length) {
      return;
    }
    scene.neuronConnections.push([prevId, id]);
    callback(scene.neuronConnections.length);
    const { x: startX = 0, y: startY = 0 } = { ...previousClicked.sprite };
    const { x: endX, y: endY } = { ...neuron.sprite };
    const angle = getAngle(startX, startY, endX, endY);
    const { middleX, middleY, distance } = calculateDistance(startX, startY, endX, endY);
    const newConnection = scene.physics.add.sprite(startX + middleX / 3, startY + middleY / 3, "connectionFrame")
      .setRotation(-Math.PI / 2 + angle)
      .setScale(distance * 0.0010, 1)
      .setDepth(1);
    scene.connectionSprites.push(newConnection);
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
      previousClicked.sprite.setRotation(-1.5 + angle);
    }, 250)
  } else {
    scene.clickedNeuron = {
      tween: scene.tweens.add(getNeuronTweenConfig(sprite)),
      ...neuron
    }
  }
  sprite.setTexture("neuronElectrifiedFrame");
}

export const addRandomNeurons = (scene: NetworkScene, isLarge: boolean, clickCallback: Function, callback: Function) => {
  scene.neurons.forEach(({ sprite }: Neuron) => {
    sprite.destroy();
  })
  if (scene.sys?.cameras?.main) {
    const neuronsCount = random(neuronsCountRange[0], neuronsCountRange[1])
    const { width, height } = scene.sys?.cameras?.main || {};
    for (let i = 0; i < neuronsCount; i++) {
      const others = scene.neurons.map(({ placement }) => ({ ...placement }));
      const distance = isLarge ? 100 : 50;
      const { x, y } = generateWithoutCollisions(others, width, height, distance);
      const scale = isLarge ? 0.25 : 0.125;
      const newNeuronSprite = scene.add.sprite(x, y, "neuronFrame")
        .setRotation(random(0, 6.24))
        .setScale(scale)
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
      scene.neurons.push(newNeuron);
      newNeuronSprite.on("pointerover", () => scene.input.setDefaultCursor("pointer"));
      newNeuronSprite.on("pointerout", () => scene.input.setDefaultCursor("default"));
      newNeuronSprite.on("pointerdown", () => clickNeuron(scene, newNeuron, clickCallback))
    }
    callback(neuronsCount);
  }
}