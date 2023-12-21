import { useContext, useEffect, useMemo, useState } from "react";

import styles from "../../../../styles/pages/Roshambo/components/Animation/Animation.module.scss";
import type { AnimationProps, Jest, WindowSize } from "../../../../types/roshambo";
import ShakingHand from "./components/ShakingHand/ShakingHand";
import { RoshamboContext } from "../../Roshambo";
import { getRandomJest } from "./utils/functions";
import configs from "../../../../configs/roshambo";

const {
  animationDuration,
  windowMediumSize,
  windowSmallSize } = { ...configs }

const Animation = ({ background }: AnimationProps) => {
  const [windowSize, setWindowSize] = useState<WindowSize>(window.innerWidth > 680 ? "large" : window.innerWidth > 480 ? "medium" : "small");

  const { chosenJest, dispatchOpponentJest, opponentJest } = useContext(RoshamboContext);
  const opponentJestMemo = useMemo<Jest>(() => opponentJest || getRandomJest(), [opponentJest]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth > windowMediumSize) {
        setWindowSize("large");
      } else if (window.innerWidth > windowSmallSize) {
        setWindowSize("medium");
      } else {
        setWindowSize("small");
      }
    })
  }, [setWindowSize])

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
            windowSize={windowSize}
            showingMode={Boolean(opponentJest)}
          />
        </div>
        <div className={styles.animation_cont}>
          <ShakingHand
            side="right"
            duration={animationDuration}
            initialJest="rock"
            jest={opponentJestMemo}
            windowSize={windowSize}
            showingMode={Boolean(opponentJest)}
          />
        </div>
      </div>
    </div>
  )
}

export default Animation;