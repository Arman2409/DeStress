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
              <ShakingHand jest={chosenJest}/>
            </div>
            <div className={styles.animation_right}>
              <ShakingHand />
            </div>
        </div>
    )
}

export default Animation;