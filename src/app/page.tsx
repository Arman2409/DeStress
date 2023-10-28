"use client"
import { useEffect, useRef, useState } from "react"
import { animate } from "framer-motion"

import styles from "../styles/page.module.scss"
import type { MousePositionType } from "../types/main"
import GameTiles from "./components/GameTiles/GameTiles"
import Greeting from "./components/Greeting/Greeting"
import Loading from "./globals/components/Loading/Loading"

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const circle = useRef<any>(null);
  const isBouncing = useRef<boolean>(false);
  const mousePosition = useRef<MousePositionType>({} as MousePositionType)

  const animateCircle = (left: number, top: number) => {
    const { x, y } = circle.current.getBoundingClientRect();
    const movementX = Math.abs(left - x);
    const movementY = Math.abs(top - y);
    const toFloor = movementX > movementY;
    animate(circle.current, {
      top: [y + "px", toFloor ? document.body.clientHeight - 50 + "px" : top - (Math.abs(movementY) / 2) + "px", top - 25 + 'px'],
      left: [x + "px", toFloor ? left - (Math.abs(movementX) / 2) + "px" : document.body.clientWidth - 50 + "px", left - 25 + 'px']
    }, { duration: 1.5 })
     setTimeout(() => {
      const { x, y } = circle.current.getBoundingClientRect();
      const { left, top } = mousePosition.current
      
      if (!(x + 24 < left && x + 26 > left) ||
       !(y + 24 < top && y + 26 > top)) {
        animateCircle(left, top);
        return;
      }
      isBouncing.current = false;
    }, 2000);
  }

  useEffect(() => {
    document.addEventListener('mousemove', (event: MouseEvent) => {
      const left = event.clientX;
      const top = event.clientY;
      mousePosition.current = {
        left,
        top,
      }
      if (isBouncing.current) return;
      if (event.movementX !== 0 || event.movementY !== 0) {
        isBouncing.current = true;
        animateCircle(left, top)
        return;
      }
      circle.current.style.left = left + 'px';
      circle.current.style.top = top + 'px';
    });
  }, [])

  return (
    <main className={styles.main} >
      <div id="circle" ref={circle} className={styles.circle} />
      {loading && <Loading />}
      <Greeting />
      <GameTiles choseGame={() => setLoading(true)} />
    </main>
  )
}
