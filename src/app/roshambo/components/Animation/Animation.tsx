import { useContext, useEffect, useMemo } from "react";

import styles from "../../../../styles/roshambo/components/Animation/Animation.module.scss"
import type { AnimationProps, JestType } from "../../../../types/roshambo"
import ShakingHand from "./components/ShakingHand/ShakingHand"
import { RoshamboContext } from "../../page"
import { getRandomJest } from "./utils/functions"
import configs from "../../../../configs/roshambo";

const { animationDuration } = {...configs}

const Animation = ({background}:AnimationProps) => {
  const { chosenJest, dispatchOpponentJest, opponentJest } = useContext(RoshamboContext);
  const opponentJestMemo = useMemo<JestType>(() => opponentJest || getRandomJest(), [getRandomJest, opponentJest]);

  useEffect(() => {
   if (!opponentJest) {
      setTimeout(() => {
        dispatchOpponentJest(opponentJestMemo);
      }, animationDuration * 1000 + 500)
   }
  }, [opponentJest, opponentJestMemo, dispatchOpponentJest])

  return (
    <div 
      className={styles.animation_main}
      style={{
        backgroundImage: `url(${background})`
      }}>
      <div className={styles.animations_cont}>
        <div className={styles.animation_cont}>
          <ShakingHand
            side="left"
            duration={animationDuration}
            initialJest="rock"
            jest={chosenJest} 
            showingMode={Boolean(opponentJest)}
            />
        </div>
        <div className={styles.animation_cont}>
          <ShakingHand
            side="right"
            duration={animationDuration}
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