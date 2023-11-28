import { useCallback, useEffect, useRef, useState } from "react";
import Phaser from "phaser";

import styles from "../../../../styles/oceanFlow/components/Game.module.scss";
import type { FishSchool } from "../../../../types/oceanFlow";
import configs from "../../../../configs/oceanFlow";
import { eventKeys } from "./utils/data";
import { addPlants, checkForCollision, createRandomFishSchool, getVh, getVw, updateJellyfishDetails } from "./utils/functions";
import ScoreAlert from "../../../globals/components/ScoreAlert/ScoreAlert";
import Loading from "../../../globals/components/Loading/Loading";
import getAngle from "../../../globals/functions/getAngle";

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

  const updateJellyfish = useCallback((
    rotation: number,
    direction: "x" | "y",
    step: number,
    height: number | null,
    width: number | null) => {
    const isLarge = window.innerWidth > 900;
    updateJellyfishDetails(scene.current, rotation, direction, step, height, width, isLarge)
  }, [updateJellyfishDetails])

  useEffect(() => {
    const phaserContainer = document.querySelector("#phaser-container");
    if (phaserContainer?.innerHTML) return;
    window.addEventListener("resize", () => setLoading(true))
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
        this.jellyfish = this.physics.add.sprite(100, 100, "jellyfishFrame1")
          .setScale(isLarge ? 0.5 : 0.25)
          .setDepth(5);
        // animation for changing the frames of the jellyfish 
        this.jellyfish.anims.create({
          key: "jellyfishAnimation",
          frames: Array.from({ length: jellyFishFramesCount }, (_, order) => ({ key: "jellyfishFrame" + (order + 1) })),
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
        // checking for collisions for schools and jellyfish 
        this.time.addEvent({
          delay: 30,
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
        updateJellyfish(0, "y", -jellyfishStep, null, null);
      }
      if (eventKeys.bottom.includes(e.key)) {
        const { height } = scene.current?.sys?.game?.canvas;
        updateJellyfish(3, "y", jellyfishStep, height, null);
      }
      if (eventKeys.left.includes(e.key)) {
        updateJellyfish(4.5, "x", -jellyfishStep, null, null);
      }
      if (eventKeys.right.includes(e.key)) {
        const { width } = scene.current?.sys?.game?.canvas;
        updateJellyfish(1.5, "x", jellyfishStep, null, width);
      }
    })
    let oldX = 0, oldY = 0, oldAngle = 0;
    const extraX = getVw(5);
    const extraY = getVh(5);
    // making jellyfish to follow the mouse 
    window.addEventListener("mousemove", (event: MouseEvent) => {
      if (!mouseMoving.current) {
        mouseMoving.current = true;
        setTimeout(() => mouseMoving.current = false, 1000)
      }
      if(scene.current.sys.game) {
        const {clientX, clientY} = event;
        const angle = getAngle(oldX, oldY, clientX, clientY);
        if (Math.abs(oldAngle - angle) > 0.2) {
          scene.current.jellyfish.setRotation && scene.current.jellyfish.setRotation(angle);
        }
        scene.current.jellyfish.x = clientX - extraX;
        scene.current.jellyfish.y = clientY - extraY;
        oldAngle = angle;
        oldX = clientX;
        oldY = clientY;
      }
    })
  }, [Phaser, setLoading, checkForCollision, addPlants, createRandomFishSchool, updateJellyfish, getAngle, getVh, getVw]);

  return (
    <>
      <ScoreAlert
        score={escapedCount}
        mode="custom"
      />
      {loading && <Loading />}
      <div
        id="phaser-container"
        className={styles.phaser_cont} />
    </>
  );
};

export default Game;