import { useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation"
import Button from "antd/lib/button"

import styles from "../../../../styles/roshambo/components/Summary/Summary.module.scss"
import { combinations } from "./utils/data";
import { RoshamboContext } from "../../page";

const Summary = () => {
    const router = useRouter();
    const { result } = useContext(RoshamboContext);
    const [gameStatus, setGameStatus] = useState<"draw"|"defeat"|"win">("draw");

    const restartGame = useCallback(() => {

    }, [])

    useEffect(() => {
      if(result[0] === result[1]) {
        console.log("draw");
        
        return;
    };
    console.log(combinations.winning.includes(result), combinations.defeating.includes(result));
    
      if(combinations.defeating.includes(result)) {
        console.log("defeat");
        setGameStatus("defeat");
      }
      if(combinations.winning.includes(result)) {
        console.log("win");
        setGameStatus("win");
      }
    }, [])

    return (
        <div className={styles.summary_main}>
            <div className={styles.summary_content}>
                <h2>
                  
                </h2>
                <Button onClick={() => router.push("/")}>Main Menu</Button>
                <Button onClick={restartGame}>Restart</Button>
            </div>
        </div>
    )
}

export default Summary;