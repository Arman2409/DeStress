"use client"
import { useEffect, useRef, useState } from "react"

import styles from "../styles/page.module.scss"
import type { MousePosition } from "../types/main"
import GameTiles from "./components/GameTiles/GameTiles"
import Greeting from "./components/Greeting/Greeting"
import Footer from "./components/Footer/Footer"
import Loading from "./globals/components/Loading/Loading"
import { animateCircle } from "./utils/functions"

const Home = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const isBouncing = useRef<boolean>(false);
  const mousePosition = useRef<MousePosition>({} as MousePosition);
  const circle = useRef<any>(null);
  const animatingTimeout = useRef<any>(null);

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
        const checkForChangeInt = setInterval(() => {
          const { top: currentTop, left: currentLeft } = { ...mousePosition.current };
          if (currentLeft === left && currentTop === top) {
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
      <div
        id="circle"
        ref={circle}
        className={styles.ball}
      />
      {loading && <Loading />}
      <Greeting />
      <GameTiles
        choseGame={() => setLoading(true)}
      />
      <Footer />
    </main>
  )
}

export default Home;