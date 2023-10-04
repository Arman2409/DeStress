import { useContext, useLayoutEffect, useRef } from "react";
import styles from "../../../../styles/roshambo/components/Score/Score.module.scss"
import { RoshamboContext } from "../../page";

const Score = () => {
  const { opponentScore, userScore, result } = useContext(RoshamboContext);
  const scoreMain = useRef<any>();

  useLayoutEffect(() => {
    if (result == "draw") return;
    const newScoreNumber = document.createElement("p");
    newScoreNumber.setAttribute("class", styles.new_score_number);

    if (result === "win") {
      newScoreNumber.innerHTML = String(userScore);
      newScoreNumber.style.left = "5px";
    }
    if (result === "lose") {
      newScoreNumber.innerHTML = String(opponentScore);
      newScoreNumber.style.left = "10px";
    }
    scoreMain.current.appendChild(newScoreNumber);
  }, [result, userScore, opponentScore])

  return (
    <div className={styles.score_main} ref={scoreMain}>
      <div className={styles.user_score}>
        <p>{userScore}</p>
      </div>
      <div className={styles.opponent_score}>
        <p>{opponentScore}</p>
      </div>
    </div>
  )
}

export default Score;