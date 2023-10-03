import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation"

import styles from "../../../../styles/roshambo/components/Summary/Summary.module.scss"
import type { GameStatusType } from "../../../../types/types"
import { RoshamboContext } from "../../page";
import { defineGameStatus } from "./utils/functions";
import { statusTexts } from "./utils/data";

const Summary = () => {
    const router = useRouter();
    const { chosenJest, opponentJest } = useContext(RoshamboContext);
    const [gameStatus, setGameStatus] = useState<GameStatusType>("draw");

    useEffect(() => {
      setGameStatus(defineGameStatus(chosenJest || "rock", opponentJest || "rock"))     
    }, [ chosenJest, opponentJest, setGameStatus])

    return (
        <div className={styles.summary_main}>
            <div className={styles.summary_content}>
                <h2>
                  {statusTexts[gameStatus as keyof typeof statusTexts]}
                </h2>
            </div>
        </div>
    )
}

export default Summary;