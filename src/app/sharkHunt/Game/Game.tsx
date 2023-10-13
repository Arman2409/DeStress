import React, { useEffect, useRef } from "react"
import Phaser from "phaser"

import styles from "../../../styles/sharkHunt/components/Game.module.scss"
import { eventKeys } from "./utils/data"

const Game: React.FC = () => {
  const gameRef = useRef<any>();
  const scene = useRef<any>();
  const fishSchools = useRef<any[]>([]);

  useEffect(() => {
    class Ocean extends Phaser.Scene {
      schoolsCount: number = 0;
      shark: Phaser.GameObjects.Sprite = {} as Phaser.GameObjects.Sprite;
      fish: Phaser.GameObjects.Sprite = {} as Phaser.GameObjects.Sprite;
      graphics: Phaser.GameObjects.Graphics = {} as Phaser.GameObjects.Graphics;
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
        this.shark = this.add.sprite(100, 100, "sharkFrame1").setScale(0.5).setRotation(1.5);
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
          delay: 400,
          callback: this.createRandomFishSchool,
          loop: true,
        })
      }
      updateShark = () => {
        const { key } = { ...this.shark.texture }
        if (key === "sharkFrame1") {
          this.shark.setTexture("sharkFrame2");
          return;
        }
        if (key === "sharkFrame2") {
          this.shark.setTexture("sharkFrame3");
          return;
        }
        if (key === "sharkFrame3") {
          this.shark.setTexture("sharkFrame1");
          return;
        }
      }
      updateAllFishes = () => {

      }
      getRandomSchoolPlacementAndDirection = () => {
        let { width, height } = this.sys.game.canvas;
        let x: number, y: number = 0;
        const fromSide = Boolean(Math.round(Math.random()));
        if (fromSide) {
          const fromLeft = Boolean(Math.round(Math.random()));
          if (fromLeft) {
            y = - 200;
          } else {
            y = width + 200;
          }
          x = Math.random() * height;
          return {
            x: Math.random() * height,
            y,
            dirY: fromLeft ? width + 200 : -200,
            dirX: Math.random() * height
          }
        }
        const fromTop = Boolean(Math.round(Math.random()));
        if (fromTop) {
          x = -200;
        } else {
          x = height + 200;
        }
        return {
          x,
          y: Math.random() * width,
          dirX: fromTop ? height + 200 : -200,
          dirY: Math.random() * width,
        }
      }
      createRandomFishSchool = () => {
        this.schoolsCount++;
        const newSchool: {
          fishes: any[],
          id: number,
          startingPoint: any,
          fishCount: number,
          direction: any,
          interval: any
        } =
        {
          id: this.schoolsCount,
          fishes: [],
          startingPoint: { x: 0, y: 0 },
          direction: {},
          fishCount: Math.random() * 5,
          interval: []
        }
        const { x, y, dirX, dirY } = this.getRandomSchoolPlacementAndDirection();
        const { fishCount } = { ...newSchool }
        for (let x = 0; x < fishCount; x++) {
          const newFish = this.add.sprite(x + Math.random() * 50, y + Math.random() * 50, "fishFrame1").setScale(0.1);
          newSchool.fishes.push(newFish);
        }
        newSchool.startingPoint = { x, y }
        newSchool.direction = { x: dirX, y: dirY }
        let intervalRepeat = 0;
        newSchool.interval = setInterval(() => {
          if (intervalRepeat >= 100) {
            clearInterval(newSchool.interval);
            return;
          }
          intervalRepeat++;
          const repeat = Math.random() * 80 + 10;
          let xChange = 0;
          let yChange = 0;
          xChange += (dirX - x) / repeat;
          yChange += (dirY - y) / repeat;
          newSchool.fishes.forEach((fish: any) => {
            fish.x += xChange;
            fish.y += yChange;
            const angle = Math.abs(dirX - x);
            fish.setTexture(`fishFrame${Math.round(Math.random() * 2) + 1}`)
          })
        }, 200)
        fishSchools.current.push(newSchool);

      }

    }

    scene.current = new Ocean();
    const phaserContainer = document.querySelector("#phaser-container");

    if (phaserContainer) {
      phaserContainer.innerHTML = "";
    }
    gameRef.current = new Phaser.Game({
      type: Phaser.AUTO,
      width: "100%",
      height: "100%",
      parent: "phaser-container",
      backgroundColor: "blue",
      scene: scene.current,
      physics: {
        default: 'arcade',
      },
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