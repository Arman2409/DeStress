import styles from "../styles/page.module.scss"
import Greeting from "./components/pages/Main/Greeting/Greeting"

export default function Home() {
  return (
    <main className={styles.main}>
      <Greeting />
    </main>
  )
}
