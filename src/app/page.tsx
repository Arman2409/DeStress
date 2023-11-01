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
  const animatingTimeout = useRef<any>();
   
  const animateCircle = (left: number, top: number) => {
    if(!circle.current) return;
    const { x, y } = circle.current.getBoundingClientRect();
    const movementX = Math.abs(left - x);
    const movementY = Math.abs(top - y);
    const toFloor = movementX > movementY;
    animate(circle.current, {
      top: [y + "px", toFloor ? document.body.clientHeight - 25 + "px" : top - (Math.abs(movementY) / 2) + "px", top - 25 + 'px'],
      left: [x + "px", toFloor ? left - (Math.abs(movementX) / 2) + "px" : document.body.clientWidth - 50 + "px", left - 25 + 'px'],
      height: toFloor &&  ["50px", "50px", "50px", "25px", "50px", "50px", "50px"],
      width: !toFloor &&  ["50px", "50px", "50px", "25px", "50px", "50px", "50px"],
    }, { duration: 1.5 })
    animatingTimeout.current = setTimeout(() => {
      if(!circle.current) return;
      const { x, y } = circle.current?.getBoundingClientRect();
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
            animateCircle(left, top)
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
