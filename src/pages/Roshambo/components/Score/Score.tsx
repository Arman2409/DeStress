import { useContext } from "react";

import styles from "../../../../styles/pages/Roshambo/components/Score/Score.module.scss";
import { RoshamboContext } from "../../Roshambo";
import AnimatingScores from "./components/AnimatingScores/AnimatingScores";
import ScoreAlert from "../../../../globals/components/ScoreAlert/ScoreAlert";

const Score = () => {
  const { opponentScore, userScore, result, opponentJest, chosenJest } = useContext(RoshamboContext);
  // define which side of the score window should be animated 
  const shouldAnimate = opponentJest && chosenJest && result === "win" ? "left" : "right";

  return (
    <ScoreAlert
      mode="extra"
      width={175}
      height={65}
      content={
        <>
          <div className={styles.score_cont_bordered}>
            {shouldAnimate === "left" ? <AnimatingScores score={userScore} />
              : <p>{userScore}</p>}
          </div>
          <div className={styles.score_cont}>
            {shouldAnimate === "right" ? <AnimatingScores score={opponentScore} />
              : <p>{opponentScore}</p>}
          </div>
        </>
      }
    />
  )
}

export default Score;