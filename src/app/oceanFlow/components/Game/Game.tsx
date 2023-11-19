import { useEffect, useRef, useState } from "react"
import Phaser from "phaser"

import styles from "../../../../styles/oceanFlow/components/Game.module.scss"
import type { FishSchool } from "../../../../types/oceanFlow"
import configs from "../../../../configs/oceanFlow"
import { eventKeys } from "./utils/data"
import { addPlants, checkForCollision, createRandomFishSchool, getVh, getVw } from "./utils/functions"
import ScoreAlert from "../../../globals/components/ScoreAlert/ScoreAlert"
import Loading from "../../../globals/components/Loading/Loading"
import getAngle from "../../../globals/functions/getAngle"

const {
  createFishSchoolInterval,
  backgroundColor,
  jellyfishStep,
  jellyFishFramesCount
} = { ...configs };


const Game = () => {
  const [escapedCount, setEscapedCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const scene = useRef<any>(null);
  const mouseMoving = useRef<boolean>(false);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setLoading(true);
    })
    const isLarge = window.innerWidth > 900; 
    class Ocean extends Phaser.Scene {
      fishSchools: FishSchool[] = [];
      jellyfish: Phaser.GameObjects.Sprite = {} as Phaser.GameObjects.Sprite;
      constructor(props?: any) {
        super(props)
      }

      preload = () => {
        for (let i = 1; i <= jellyFishFramesCount; i++) {
          this.load.image(`jellyfishFrame${i}`, `./oceanFlow/jellyfishFrames/jellyfishFrame${i}.gif`);
        }
        this.load.image("plantFrame", "./oceanFlow/plantFrames/plant1.png");
        this.load.image("fishFrame1", "./oceanFlow/fishFrames/frame1.gif");
        this.load.image("fishFrame2", "./oceanFlow/fishFrames/frame2.gif");
        this.load.image("fishFrame3", "./oceanFlow/fishFrames/frame3.gif");
      }
      create = () => {
        addPlants(this);
        this.cameras.main.setBackgroundColor(backgroundColor);
        const scale = isLarge ? 0.5 : 0.25;
        this.jellyfish = this.physics.add.sprite(100, 100, "jellyfishFrame1").setScale(scale).setDepth(5);
        this.jellyfish.anims.create({
          key: "jellyfishAnimation",
          frames: Array.from({ length: jellyFishFramesCount }, (_, order) => ({ key: "jellyfishFrame" + order })),
          frameRate: 7.5,
          duration: 2,
          repeat: -1,
        })
        this.jellyfish.anims.play("jellyfishAnimation")
        this.time.addEvent({
          delay: createFishSchoolInterval * 1000,
          callback: () => createRandomFishSchool(this, isLarge),
          loop: true,
        })
        const { width, height } = this.sys.game.canvas;
        this.time.addEvent({
          delay: 300,
          callback: () => checkForCollision(
            this,
            width,
            height,
            (count: number) => setEscapedCount(curr => curr + count)),
          loop: true,
        })
      }

    }
    scene.current = new Ocean();
    const phaserContainer = document.querySelector("#phaser-container");
    if (phaserContainer) {
      phaserContainer.innerHTML = "";
    }
    new Phaser.Game({
      type: Phaser.AUTO,
      width: "100%",
      height: "100%",
      parent: "phaser-container",
      scene: scene.current,
      physics: {
        default: 'arcade',
      },
    });
    setLoading(false);
    window.addEventListener("keydown", (e: KeyboardEvent) => {
      if (mouseMoving.current) return;
      if (eventKeys.top.includes(e.key)) {
        scene.current.jellyfish.setRotation(0);
        if (scene.current.jellyfish.y <= 80) {
          return;
        }
        scene.current.jellyfish.y = scene.current.jellyfish.y - jellyfishStep;
      }
      if (eventKeys.bottom.includes(e.key)) {
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
    let oldX = 0, oldY = 0, oldAngle = 0;
    const extraX = getVw(5);
    const extraY = getVh(5);
    window.addEventListener("mousemove", (e: MouseEvent) => {
      if (!mouseMoving.current) {
        mouseMoving.current = true;
        setTimeout(() => {
          mouseMoving.current = false;
        }, 1000);
      }
      setTimeout(() => {
        scene.current.jellyfish.x = e.clientX - extraX;
        scene.current.jellyfish.y = e.clientY - extraY;
      }, 300);

      const angle = getAngle(oldX, oldY, e.clientX, e.clientY,);
      if (Math.abs(oldAngle - angle) > 0.4) {
        scene.current.jellyfish.setRotation && scene.current.jellyfish.setRotation(angle);
      }
      oldAngle = angle;
      oldX = e.clientX;
      oldY = e.clientY;
    })
  }, [Phaser, setLoading, checkForCollision, addPlants, createRandomFishSchool, getAngle, getVh, getVw]);

  return (
    <>
      <ScoreAlert
        score={escapedCount}
        mode="custom"
      />
      {loading && <Loading />}
      <div id="phaser-container" className={styles.phaser_cont} />
    </>
  );
};

export default Game;