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
      fish: Phaser.GameObjects.Sprite = {} as Phaser.GameObjects.Sprite;
      graphics: Phaser.GameObjects.Graphics = {} as  Phaser.GameObjects.Graphics;
      constructor() {
        super()
      }

      preload = () => {
        this.load.image("sharkFrame1", "./sharkHunt/sharkFrames/frame1.gif");
        this.load.image("sharkFrame2", "./sharkHunt/sharkFrames/frame2.gif");
        this.load.image("sharkFrame3", "./sharkHunt/sharkFrames/frame3.gif");
        this.load.image("fishFrame1", "./sharkHunt/fishFrames/frame1.gif");
        this.load.image("fishFrame2", "./sharkHunt/fishFrames/frame2.gif");
        this.load.image("fishFrame3", "./sharkHunt/fishFrames/frame3.gif");
      }
      create = () => {
        this.cameras.main.setBackgroundColor('#ffffff');
        this.shark= this.add.sprite(100, 100, "sharkFrame1").setScale(0.5).setRotation(1.5);
        this.time.addEvent({
          delay: 700,
          callback: this.updateShark,
          loop: true,
        })
        this.time.addEvent({
          delay: 500,
          callback: this.updateAllFishes,
          loop: true,
        })
        this.time.addEvent({
          delay: 1500,
          callback: this.createRandomFishSchool,
          loop: true,
        })
        this.time.addEvent({
          delay: 500,
          callback: this.updateBackground,
          loop: true
        })
      }
      updateShark = () => {  
        const { key } = {...this.shark.texture}
        if(key === "sharkFrame1") {
          this.shark.setTexture("sharkFrame2");
          return;
        }
        if(key === "sharkFrame2") {
          this.shark.setTexture("sharkFrame3");
          return;
        }
        if(key === "sharkFrame3") {
          this.shark.setTexture("sharkFrame1");
          return;
        }
      }
      createFishSchool = () => {
        this.fish = this.add.sprite(200, 200, "fish");
      }
      updateAllFishes = () => {
        
      }
      createRandomFishSchool = () => {
        this.fish = this.add.sprite(200, 200, "fishFrame1").setScale(0.1);
          
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
        scene.current.shark.setRotation(0)
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