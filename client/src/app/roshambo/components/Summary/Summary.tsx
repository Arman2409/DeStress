import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation"

import styles from "../../../../styles/roshambo/components/Summary/Summary.module.scss"
import type { GameStatusType } from "../../../../types/types"
import { RoshamboContext } from "../../page"
import { defineGameStatus } from "./utils/functions"
import { statusesData } from "./utils/data"

const {texts, icons} = {...statusesData};

const Summary = () => {
    const router = useRouter();
    const { chosenJest, opponentJest, dispatchJest, dispatchOpponentJest } = useContext(RoshamboContext);
    const [gameStatus, setGameStatus] = useState<GameStatusType>("draw");
    const [iconState, setIconState] = useState<any>(null);

    useEffect(() => {
      setGameStatus(defineGameStatus(chosenJest || "rock", opponentJest || "rock"))   ;
      setIconState(icons[gameStatus as keyof typeof icons])
    }, [ chosenJest, opponentJest, gameStatus, setGameStatus])
    
    useEffect(() => {
      setTimeout(() => {
        dispatchOpponentJest(null);
        dispatchJest(null);
      }, 2000)
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