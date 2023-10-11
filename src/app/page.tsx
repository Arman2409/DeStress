"use client"
import { useState } from "react"

import styles from "../styles/page.module.scss"
import GameTiles from "./components/GameTiles/GameTiles"
import Greeting from "./components/Greeting/Greeting"
import Loading from "./globals/components/Loading/Loading"

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false)

  return (
    <main className={styles.main}>
      {loading && <Loading/>}
      <Greeting />
      <GameTiles choseGame={() => setLoading(true)}/>
    </main>
  )
}
