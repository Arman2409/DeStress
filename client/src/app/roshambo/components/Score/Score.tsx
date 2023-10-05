import { useContext } from "react";

import styles from "../../../../styles/roshambo/components/Score/Score.module.scss"
import { RoshamboContext } from "../../page";
import AnimatingScores from "./components/AnimatingScores/AnimatingScores";

const Score = () => {
  const { opponentScore, userScore, result, opponentJest, chosenJest } = useContext(RoshamboContext);

  const shouldAnimateLeft = opponentJest && chosenJest && result === "win";
  const shouldAnimateRight = opponentJest && chosenJest && result === "lose";

  return (
    <div className={styles.score_main} >
      <div className={styles.score_cont}>
        {shouldAnimateLeft ? <AnimatingScores score={userScore} />
          : <p>{userScore}</p>}
      </div>
      <div className={styles.score_cont}>
        {shouldAnimateRight ? <AnimatingScores score={opponentScore} />
         : <p>{opponentScore}</p>}
      </div>
    </div>
  )
}

export default Score;