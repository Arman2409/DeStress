"use client"
import { useEffect, useRef, useState } from "react"

import styles from "../styles/page.module.scss"
import GameTiles from "./components/GameTiles/GameTiles"
import Greeting from "./components/Greeting/Greeting"
import Loading from "./globals/components/Loading/Loading"

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const circle = useRef<any>(null);
  const isBouncing = useRef<boolean>(false);

  useEffect(() => {
    document.addEventListener('mousemove', (event: MouseEvent) => {
      if (isBouncing.current) return;
      let left = event.clientX;
      let top = event.clientY;
      if (event.movementX !== 0) {
        isBouncing.current = true;
        circle.current.style.top = document.body.clientHeight - 50 + "px";
        circle.current.style.left = left - (Math.abs(event.movementX) / 2) + "px";
        setTimeout(() => {
          circle.current.style.left = left - 25 + 'px';
          circle.current.style.top = top - 25 + 'px';
          setTimeout(() => isBouncing.current = false,1000)
        }, 1000);
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
