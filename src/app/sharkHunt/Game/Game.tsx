import React, { useEffect, useRef } from "react"
import Phaser from "phaser"

import styles from "../../../styles/sharkHunt/components/Game.module.scss"

import { eventKeys } from "./utils/data"

const Game: React.FC = () => {
  const gameRef = useRef<any>();
  const scene = useRef<any>();

  useEffect(() => {
    class Ocean extends Phaser.Scene {
      shark: Phaser.GameObjects.Sprite = {} as Phaser.GameObjects.Sprite;
      graphics: Phaser.GameObjects.Graphics = {} as  Phaser.GameObjects.Graphics;
      constructor() {
        super()
      }

      preload = () => {
        this.load.image("shark", "./sharkHunt/shark.png");
      }
      create = () => {
        this.graphics = this.add.graphics({ fillStyle: { color: 0xff0000 } });
        this.shark= this.add.sprite(100, 100, "shark").setScale(0.1).setRotation(1.5);
        this.physics.add.collider(this.shark, this.graphics);
      }
      update = () => {

      }
    }

    scene.current = new Ocean();
    const phaserContainer = document.querySelector("#phaser-container");

    if(phaserContainer) {
      phaserContainer.innerHTML = "";
    }
    gameRef.current = new Phaser.Game({
      type: Phaser.AUTO,
      width: "100%",
      height: "100%",
      parent: "phaser-container",
      backgroundColor: "blue",
      scene: scene.current
    });
    window.addEventListener("keydown", (e: KeyboardEvent) => {
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
        scene.current.shark.setRotation(4.5)
      }
      if (eventKeys.right.includes(e.key)) {
        scene.current.shark.x = scene.current.shark.x + 15;
        scene.current.shark.setRotation(1.5);
      }
    })
  }, []);

  return (
      <div id="phaser-container" className={styles.phaser_cont} />
  );
};

export default Game;