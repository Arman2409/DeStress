import { useContext } from "react";

import styles from "../../../../styles/roshambo/components/Score/Score.module.scss"
import { RoshamboContext } from "../../page";
import AnimatingScores from "./components/AnimatingScores/AnimatingScores";
import ScoreAlert from "../../../globals/components/ScoreAlert/ScoreAlert";

const Score = () => {
  const { opponentScore, userScore, result, opponentJest, chosenJest } = useContext(RoshamboContext);

  const shouldAnimateLeft = opponentJest && chosenJest && result === "win";
  const shouldAnimateRight = opponentJest && chosenJest && result === "lose";

  return (
    <ScoreAlert
      mode="extra"
      width={175}
      height={65}
      content={
        <>
          <div className={styles.score_cont_bordered}>
            {shouldAnimateLeft ? <AnimatingScores score={userScore} />
              : <p>{userScore}</p>}
          </div>
          <div className={styles.score_cont}>
            {shouldAnimateRight ? <AnimatingScores score={opponentScore} />
              : <p>{opponentScore}</p>}
          </div>
        </>
      }
    />
  )
}

export default Score;