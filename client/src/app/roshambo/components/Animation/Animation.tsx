import { useContext } from "react";

import styles from "../../../../styles/roshambo/components/Animation/Animation.module.scss"
import ShakingHand from "./components/ShakingHand/ShakingHand";
import { RoshamboContext } from "../../page";

const Animation = () => {
    // const { chosenJest } = useContext(RoshamboContext);
    
    // experimental variable 
    const chosenJest = "scissors";

    return (
        <div className={styles.animation_main}>
            <div className={styles.animation_left}>
              <ShakingHand side="left" duration={3} initialJest="rock" jest={chosenJest}/>
            </div>
            <div className={styles.animation_right}>
              <ShakingHand side="right" duration={3} initialJest="rock" />
            </div>
        </div>
    )
}

export default Animation;