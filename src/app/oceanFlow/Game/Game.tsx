import { useEffect, useRef, useState } from "react"
import Phaser from "phaser"

import styles from "../../../styles/oceanFlow/components/Game.module.scss"
import type { FishSchoolType } from "../../../types/oceanFlow"
import configs from "../../../configs/oceanFlow"
import { eventKeys } from "./utils/data"
import { addPlants, checkForCollision, createRandomFishSchool } from "./utils/functions"

const {
  createFishSchoolInterval,
  backgroundColor,
  jellyfishStep,
  jellyFishFramesCount
} = { ...configs };

const Game = () => {
  const [escapedCount, setEscapedCount] = useState<number>(0);
  const gameRef = useRef<any>();
  const scene = useRef<any>();
  const isMoving = useRef<boolean>(false);

  useEffect(() => {
    class Ocean extends Phaser.Scene {
      plants: Phaser.GameObjects.Sprite[] = [];
      fishSchools: FishSchoolType[] = [];
      jellyfish: Phaser.GameObjects.Sprite = {} as Phaser.GameObjects.Sprite;
      fish: Phaser.GameObjects.Sprite = {} as Phaser.GameObjects.Sprite;
      graphics: Phaser.GameObjects.Graphics = {} as Phaser.GameObjects.Graphics;
      constructor(props?: any) {
        super(props)
      }

      preload = () => {
        for (let i = 1; i <= jellyFishFramesCount; i++) {
          this.load.image(`jellyfishFrame${i}`, `./oceanFlow/jellyfishFrames/jellyfishFrame${i}.gif`);
        }
        this.load.image("plant1", "./oceanFlow/plantFrames/plant1.png");
        this.load.image("fishFrame1", "./oceanFlow/fishFrames/frame1.gif");
        this.load.image("fishFrame2", "./oceanFlow/fishFrames/frame2.gif");
        this.load.image("fishFrame3", "./oceanFlow/fishFrames/frame3.gif");
      }
      create = () => {
        addPlants(this);
        this.cameras.main.setBackgroundColor(backgroundColor);
        this.jellyfish = this.physics.add.sprite(100, 100, "jellyfishFrame1").setScale(0.5).setDepth(5);
        this.jellyfish.anims.create({
          key: "jellyfishAnimation",
          frames: Array.from({length: jellyFishFramesCount}, (_, order) => ({key: "jellyfishFrame" + order})),
          frameRate: 7.5,
          duration: 2,
          repeat: -1,
        })
        this.jellyfish.anims.play("jellyfishAnimation")
        this.time.addEvent({
          delay: createFishSchoolInterval * 1000,
          callback: () => createRandomFishSchool(this),
          loop: true,
        })
        const { width, height } = this.sys.game.canvas;
        this.time.addEvent({
          delay: 100,
          callback: () => checkForCollision(this, width, height, (_:string, count:number) => setEscapedCount(curr => curr + count)),
          loop: true,
        })
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
      scene: scene.current,
      physics: {
        default: 'arcade',
      },
    });
    window.addEventListener("keydown", (e: KeyboardEvent) => {
      if (eventKeys.top.includes(e.key)) {
        scene.current.jellyfish.setRotation(0);
        if (scene.current.jellyfish.y <= 80) {
          return;
        }
        scene.current.jellyfish.y = scene.current.jellyfish.y - jellyfishStep;
      }
      if (eventKeys.bottom.includes(e.key)) {
        if (isMoving.current) return;
        scene.current.jellyfish.setRotation(3);
        const { height } = scene.current?.sys?.game?.canvas;
        if (scene.current.jellyfish.y >= height - 80) {
          return;
        }
        scene.current.jellyfish.y = scene.current.jellyfish.y + jellyfishStep;
      }
      if (eventKeys.left.includes(e.key)) {
        scene.current.jellyfish.setRotation(4.5)
        if (scene.current.jellyfish.x <= 80) {
          return;
        }
        scene.current.jellyfish.x = scene.current.jellyfish.x - jellyfishStep;
      }
      if (eventKeys.right.includes(e.key)) {
        scene.current.jellyfish.setRotation(1.5);
        const { width } = scene.current?.sys?.game?.canvas;
        if (scene.current.jellyfish.x >= width - 80) {
          return;
        }
        scene.current.jellyfish.x = scene.current.jellyfish.x + jellyfishStep;
      }
    })
  }, [Phaser, checkForCollision, addPlants, createRandomFishSchool]);

  return (
    <div id="phaser-container" className={styles.phaser_cont} />
  );
};

export default Game;