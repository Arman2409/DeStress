import styles from "../styles/page.module.scss"
import GameTiles from "./components/GameTiles/GameTiles"
import Greeting from "./components/Greeting/Greeting"

export default function Home() {
  return (
    <main className={styles.main}>
      <Greeting />
      <GameTiles />
    </main>
  )
}
