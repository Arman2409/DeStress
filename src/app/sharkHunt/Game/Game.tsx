import React, { useEffect, useRef } from "react"
import Phaser from "phaser"
import { remove } from "lodash"

import styles from "../../../styles/sharkHunt/components/Game.module.scss"
import type { FishSchoolType, PointType } from "../../../types/sharkHunt"
import { eventKeys } from "./utils/data"
import { generateUniqueId, getEscapeDirection, getRandomSchoolDetails } from "./utils/functions"

const Game: React.FC = () => {
  const gameRef = useRef<any>();
  const scene = useRef<any>();

  useEffect(() => {
    class Ocean extends Phaser.Scene {
      fishSchools: FishSchoolType[] = [];
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
        }),
          this.time.addEvent({
            delay: 500,
            callback: this.createRandomFishSchool,
            loop: true,
          })
        this.time.addEvent({
          delay: 400,
          callback: this.checkForCollision,
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
      checkForCollision = () => {
        const { x, y } = { ...this.shark }
        this.fishSchools = this.fishSchools.map((school) => {
         
          const { currentPosition = { x: 0, y: 0 }, fishCount = 1 } = { ...school }
          const { x: schoolX = 0, y: schoolY = 0 } = { ...currentPosition }
          if (((x < schoolX && x > schoolX - 100) ||
               (x > schoolX && x < schoolX + 100)) &&
               ((y < schoolY && y > schoolY - 100) ||
                (y > schoolY && y < schoolY + 100))) {
            const { width, height } = this.sys.game.canvas;
            const escapeDirections = [];
            
            for(let i = 0; i < fishCount; i++) {
              escapeDirections.push(getEscapeDirection(width, height));
            }
            
            return {
              ...school,
              escapingFrom: {x:schoolX, y:schoolY},
              escapeDirections
            }
          }
          return { ...school }
        })
      }
      createRandomFishSchool = () => {
        const newSchool: FishSchoolType =
        {
          id: generateUniqueId(),
          fishes: [],
          startingPoint: { x: 0, y: 0 },
          direction: { x: 0, y: 0 },
          currentPosition: { x: 0, y: 0 },
          fishCount: Math.round(Math.random() * 10),
          interval: [],
          escapingFrom: null,
          escapeDirections: []
        }
        const { width, height } = this.sys.game.canvas;
        let { x, y, dirX, dirY, angle } = getRandomSchoolDetails(width, height);

        const { fishCount } = { ...newSchool }
        for (let count = 0; count < fishCount; count++) {
          const newFish = this.add.sprite(x + Math.random() * 50, y + Math.random() * 50, "fishFrame1").setScale(0.05);
          newFish.setRotation(angle);
          newSchool.fishes.push(newFish);
        }
        newSchool.startingPoint = { x, y }
        newSchool.currentPosition = { x, y }
        newSchool.direction = { x: dirX, y: dirY }
        let intervalRepeat = 0;
        newSchool.interval = setInterval(() => {
          if (intervalRepeat > 120) {
            clearInterval(newSchool.interval);
            remove(this.fishSchools, ({ id = 0 }) => {
              return id === newSchool.id;
            })
            return;
          }
          const school = this.fishSchools.find(({id}) => id === newSchool.id);
          const isEscaping = Boolean(school?.escapingFrom);
          if (isEscaping) { 
            const {x:escapeX = 0, y:escapeY = 0} = {...school?.escapingFrom}
            x = escapeX;
            y = escapeY;    
          }
          intervalRepeat++;
          const repeat = Math.random() * 100 + 10;
          let xChange = (dirX - x) / repeat;
          let yChange = (dirY - y) / repeat;
          let { x: currentX = 0, y: currentY = 0 } = { ...school?.currentPosition };
          if (currentX < -100 || currentX > width + 100 || currentY < -100 || currentY > height + 100) {
            clearInterval(newSchool.interval);
            remove(this.fishSchools, ({ id = 0 }) => {
              return id === newSchool.id;
            })
            return;
          }

          const currentPosition = {
            x: currentX += xChange,
            y: currentY += yChange,
          }
          this.fishSchools = this.fishSchools.map((school) => {
            const { id = 0 } = {...school};
             if (id === newSchool.id) {
              return ({
                ...school,
                currentPosition
              });
            }
            return {...school};
          })
          newSchool.fishes.forEach((fish: any, index: number) => {
            if(isEscaping) {
              const {x:dirX, y:dirY} = school?.escapeDirections[index] as PointType;            
               xChange = (dirX - x) / repeat;
               yChange = (dirY - y) / repeat;
            }
            fish.x += xChange;
            fish.y += yChange;
            fish.setTexture(`fishFrame${Math.round(Math.random() * 2) + 1}`)
          })
        }, 100)

        this.fishSchools.push(newSchool)
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