import { useContext, useEffect, useState } from "react";

import styles from "../../../../styles/roshambo/components/Summary/Summary.module.scss";
import type { GameStatus } from "../../../../types/roshambo";
import { RoshamboContext } from "../../page";
import { defineGameStatus } from "../../utils/functions";
import { statusesData } from "./utils/data";
import configs from "../../../../configs/roshambo";

const {summaryWaitTime} = {...configs};
const {texts, icons} = {...statusesData};

const Summary = () => {
    const { chosenJest, opponentJest, dispatchJest, dispatchOpponentJest } = useContext(RoshamboContext);
    const [gameStatus, setGameStatus] = useState<GameStatus>("draw");
    const [iconState, setIconState] = useState<any>(null);

    useEffect(() => {
      const gameStatus = defineGameStatus(chosenJest || "rock", opponentJest || "rock");
      setGameStatus(gameStatus || "draw");
      setIconState(icons[gameStatus as keyof typeof icons])
    }, [chosenJest, opponentJest, gameStatus, setGameStatus])
    
    useEffect(() => {
      setTimeout(() => {
        dispatchOpponentJest(null);
        dispatchJest(null);
      }, summaryWaitTime * 1000)
    }, [dispatchOpponentJest, dispatchJest])

    return (
        <div className={styles.summary_main}>
            <div className={styles.summary_demo} />
            <div className={styles.summary_content}>
                <h2 className={styles.summary_title}>
                  {texts[gameStatus as keyof typeof texts]}
                </h2>
                {iconState}
            </div>
        </div>
    )
}

export default Summary;