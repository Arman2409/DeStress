"use client"
import { useEffect, useRef, useState } from "react"
import { animate } from "framer-motion"

import styles from "../styles/page.module.scss"
import type { MousePositionType } from "../types/main"
import GameTiles from "./components/GameTiles/GameTiles"
import Greeting from "./components/Greeting/Greeting"
import Loading from "./globals/components/Loading/Loading"
import { animateCircle } from "./utils/functions"

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const circle = useRef<any>(null);
  const isBouncing = useRef<boolean>(false);
  const mousePosition = useRef<MousePositionType>({} as MousePositionType)
  const animatingTimeout = useRef<any>();
   
 
  useEffect(() => {
    document.addEventListener('mousemove', (event: MouseEvent) => {
      let left = event.clientX, top = event.clientY;
      mousePosition.current = {
        left,
        top,
      }
      if (isBouncing.current) return;
      if (event.movementX !== 0 || event.movementY !== 0) {
        isBouncing.current = true;
        const checkForChangeInt =  setInterval(() => {
          const {top: currentTop, left: currentLeft} = {...mousePosition.current};
          if (currentLeft === left && currentTop === top){
            clearInterval(checkForChangeInt);
            animateCircle(left, top, circle, isBouncing, animatingTimeout, mousePosition)
            return;
          }
          left = currentLeft;
          top = currentTop;
        }, 500);
      }
    });
    return clearTimeout(animatingTimeout.current);
  }, [])

  return (
    <main className={styles.main} >
      <div id="circle" ref={circle} className={styles.ball} />
      {loading && <Loading />}
      <Greeting />
      <GameTiles choseGame={() => setLoading(true)} />
    </main>
  )
}
