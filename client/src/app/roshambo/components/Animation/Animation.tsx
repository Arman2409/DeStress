import { useContext, useEffect, useMemo } from "react";

import styles from "../../../../styles/roshambo/components/Animation/Animation.module.scss"
import ShakingHand from "./components/ShakingHand/ShakingHand";
import { jestImages } from "./components/ShakingHand/utils/data";
import { RoshamboContext } from "../../page";

const getRandomJest = () => {
  const randomNumber = Math.round(Math.random() * 2);
  return Object.keys(jestImages.left)[randomNumber];
}

const duration = 3;

const Animation = () => {
  const { chosenJest, dispatchOpponentJest, opponentJest } = useContext(RoshamboContext);
  const opponentJestMemo = useMemo<any>(() => opponentJest || getRandomJest(), [getRandomJest, opponentJest]);

  useEffect(() => {
   if (!opponentJest) {
      setTimeout(() => {
        dispatchOpponentJest(opponentJestMemo);
      }, duration * 1000 + 500)
   }
  }, [opponentJest, opponentJestMemo])

  return (
    <div className={styles.animation_main}>
      <div className={styles.score_cont}>

      </div>
      <div className={styles.animation_cont}>
        <div className={styles.animation_left}>
          <ShakingHand
            side="left"
            duration={duration}
            initialJest="rock"
            jest={chosenJest} 
            showingMode={Boolean(opponentJest)}
            />
        </div>
        <div className={styles.animation_right}>
          <ShakingHand
            side="right"
            duration={duration}
            initialJest="rock"
            jest={opponentJestMemo}
            showingMode={Boolean(opponentJest)}
             />
        </div>
      </div>
    </div>
  )
}

export default Animation;