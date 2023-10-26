import { useEffect, useRef } from "react"
import Phaser from "phaser"
import { remove } from "lodash"

import styles from "../../../styles/sharkHunt/components/Game.module.scss"
import type { FishSchoolType, PointType, JellyfishType } from "../../../types/sharkHunt"
import configs from "../../../configs/sharkHunt"
import { eventKeys } from "./utils/data"
import { checkForCollision, generateUniqueId, getRandomSchoolDetails, updateFrames } from "./utils/functions"

const {createFishSchoolInterval, jellyfishStep, jellyFishFramesCount,  maxFishEachSchool} = {...configs};

const Game = () => {
  const gameRef = useRef<any>();
  const scene = useRef<any>();
  const isMoving = useRef<boolean>(false);

  useEffect(() => {
    class Ocean extends Phaser.Scene {

      fishSchools: FishSchoolType[] = [];
      jellyfish: JellyfishType  = {} as JellyfishType;
      fish: Phaser.GameObjects.Sprite = {} as Phaser.GameObjects.Sprite;
      graphics: Phaser.GameObjects.Graphics = {} as Phaser.GameObjects.Graphics;
      constructor(props?:any) {
        super(props)
      }

      preload = () => {
        for(let i = 1; i <= jellyFishFramesCount; i++) {
          this.load.image(`jellyfishFrame${i}`, `./sharkHunt/jellyfishFrames/jellyfishFrame${i}.gif`);
        }
        this.load.image("fishFrame1", "./sharkHunt/fishFrames/frame1.gif");
        this.load.image("fishFrame2", "./sharkHunt/fishFrames/frame2.gif");
        this.load.image("fishFrame3", "./sharkHunt/fishFrames/frame3.gif");
      }
      create = () => {
        this.cameras.main.setBackgroundColor('#ffffff');
        this.jellyfish = {
          sprite: this.add.sprite(100, 100, "jellyfishFrame1").setScale(0.5).setDepth(5),
          updateInterval: setInterval(() => updateFrames(this.jellyfish.sprite, "jellyfishFrame", jellyFishFramesCount), 250)
        };
        this.time.addEvent({
          delay: createFishSchoolInterval * 1000,
          callback: this.createRandomFishSchool,
          loop: true,
        })
        const { width, height } = this.sys.game.canvas;
        this.time.addEvent({
          delay: 100,
          callback:() => checkForCollision(this, width, height),
          loop: true,
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
          fishCount: Math.round(Math.random() * maxFishEachSchool),
          interval: [],
          escapingFrom: null,
          escapeDirections: []
        };
        const { width, height } = this.sys.game.canvas;
        let { x, y, dirX, dirY, angle } = getRandomSchoolDetails(width, height);

        const { fishCount } = { ...newSchool }
        for (let count = 0; count < fishCount; count++) {
          const newFish = this.add.sprite(x + Math.random() * 150, y + Math.random() * 150, "fishFrame1").setScale(0.075);
          newFish.setRotation(angle).setDepth(1);
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
          const school = this.fishSchools.find(({ id }) => id === newSchool.id);
          const isEscaping = Boolean(school?.escapingFrom);
          if (isEscaping) {
            const { x: escapeX = 0, y: escapeY = 0 } = { ...school?.escapingFrom }
            x = escapeX;
            y = escapeY;
          }
          intervalRepeat++;
          const repeat = Math.random() * 100 + 10;
          let xChange = (dirX - x) / repeat;
          let yChange = (dirY - y) / repeat;
          let { x: currentX = 0, y: currentY = 0 } = { ...school?.currentPosition };
          if (currentX < -200 || currentX > width + 200 || currentY < -200 || currentY > height + 200) {
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
            const { id = 0 } = { ...school };
            if (id === newSchool.id) {
              return ({
                ...school,
                currentPosition
              });
            }
            return { ...school };
          })
          newSchool.fishes.forEach((fish: any, index: number) => {
            if (isEscaping) {
              const { x: dirX, y: dirY } = school?.escapeDirections[index] as PointType;
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
        scene.current.jellyfish.sprite.setRotation(0);
        if (scene.current.jellyfish.sprite.y <= 80) {
          return;
        }
        isMoving.current = true;
        setTimeout(() => {
          isMoving.current = false;
          scene.current.jellyfish.sprite.y = scene.current.jellyfish.sprite.y - jellyfishStep;
        }, 25)
      }
      if (eventKeys.bottom.includes(e.key)) {
        if(isMoving.current) return;
        scene.current.jellyfish.sprite.setRotation(3);
        const { height } = scene.current?.sys?.game?.canvas;
        if (scene.current.jellyfish.sprite.y >= height - 80) {
          return;
        }
        isMoving.current = true;
        setTimeout(() => {
          isMoving.current = false;
          scene.current.jellyfish.sprite.y = scene.current.jellyfish.sprite.y + jellyfishStep;
        }, 25)
      }
      if (eventKeys.left.includes(e.key)) {
        scene.current.jellyfish.sprite.setRotation(4.5)
        if (scene.current.jellyfish.sprite.x <= 80) {
          return;
        }
        isMoving.current = true;
        setTimeout(() => {
          isMoving.current = false;
          scene.current.jellyfish.sprite.x = scene.current.jellyfish.sprite.x - jellyfishStep;
        }, 25)
      }
      if (eventKeys.right.includes(e.key)) {
        scene.current.jellyfish.sprite.setRotation(1.5);
        const { width } = scene.current?.sys?.game?.canvas;
        if (scene.current.jellyfish.sprite.x >= width - 80) {
          return;
        }
        isMoving.current = true;
        setTimeout(() => {
          isMoving.current = false;
          scene.current.jellyfish.sprite.x = scene.current.jellyfish.sprite.x + jellyfishStep;
        }, 25)
      }
    })
  }, []);

  return (
    <div id="phaser-container" className={styles.phaser_cont} />
  );
};

export default Game;