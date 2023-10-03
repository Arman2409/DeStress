import { useContext, useEffect } from "react";

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
  const { chosenJest, dispatchResult } = useContext(RoshamboContext);

  const opponentJest = getRandomJest();

  useEffect(() => {
     setTimeout(() => {
        dispatchResult([chosenJest, opponentJest])
     }, duration * 1000)
  }, [])

  return (
    <div className={styles.animation_main}>
      <div className={styles.score_cont}>
        
      </div>
      <div className={styles.animation_cont}>
        <div className={styles.animation_left}>
          <ShakingHand side="left" duration={duration} initialJest="rock" jest={chosenJest} />
        </div>
        <div className={styles.animation_right}>
          <ShakingHand side="right" duration={duration} initialJest="rock" jest={opponentJest}/>
        </div>
      </div>
    </div>
  )
}

export default Animation;