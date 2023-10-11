import React, { useState, useEffect, useRef } from "react"
import Phaser from "phaser"

import { eventKeys } from "./utils/data"

const Game: React.FC = () => {
  const gameRef = useRef<any>();
  const scene = useRef<any>();

  useEffect(() => {
    class Example extends Phaser.Scene {
      shark: Phaser.GameObjects.Sprite = {} as Phaser.GameObjects.Sprite;
      constructor() {
        super()
      }

      preload = () => {
        this.load.image("shark", "./sharkHunt/shark.png");
      }
      create = () => {
        this.shark= this.add.sprite(100, 100, "shark").setScale(0.1).setRotation(1.5);
      }
      update = () => {

      }
    }

    scene.current = new Example();
    gameRef.current = new Phaser.Game({
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: "phaser-container",
      backgroundColor: "blue",
      scene: scene.current
    });
    window.addEventListener("keyup", (e: KeyboardEvent) => {
      if (eventKeys.top.includes(e.key)) {
        scene.current.shark.y = scene.current.shark.y - 15;
        scene.current.shark.setRotation(0);
      }
      if (eventKeys.bottom.includes(e.key)) {
        scene.current.shark.y = scene.current.shark.y + 15;
        scene.current.shark.setRotation(3);
      }
      if (eventKeys.left.includes(e.key)) {
        scene.current.shark.x = scene.current.shark.x - 15;
        scene.current.shark.setRotation(4.5);
      }
      if (eventKeys.right.includes(e.key)) {
        scene.current.shark.x = scene.current.shark.x + 15;
        scene.current.shark.setRotation(1.5);
      }
    })
  }, []);

  return (
    <div>
      <h1>Shark Game</h1>
      <div id="phaser-container" />
    </div>
  );
};

export default Game;