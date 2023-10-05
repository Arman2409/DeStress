"use client"
import { createContext, useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"

import styles from "../../styles/roshambo/Roshambo.module.scss"
import type { RoshamboContextType } from "../../types/contextTypes"
import type { GameStatusType, JestType } from "../../types/types"
import useInfoWindow from "../globals/hooks/useInfoWindow"
import Instruction from "./components/Instruction/Instruction"
import Animation from "./components/Animation/Animation"
import Summary from "./components/Summary/Summary"
import BackButton from "../globals/components/BackButton/BackButton"
import Score from "./components/Score/Score"
import { defineGameStatus } from "./utils/functions"

export const RoshamboContext = createContext<RoshamboContextType>({} as RoshamboContextType);

const Roshambo = () => {
    const router = useRouter();
    const [chosenJest, setChosenJest] = useState<JestType | null>(null);
    const [opponentJest, setOpponentJest] = useState<JestType | null>(null);
    const [userScore, setUserScore] = useState<number>(0);
    const [opponentScore, setOpponentScore] = useState<number>(0);
    const [result, setResult] = useState<GameStatusType>("draw");
    const showScore = useMemo<boolean>(() => userScore > 0 || opponentScore > 0, [userScore, opponentScore])

    const { openWindow, Provider: InfoWindowProvider, closeWindow } = useInfoWindow();
    
    useEffect(() => {
        const visitedGamesData = sessionStorage.getItem("destress_visited_games");
        const visitedGames = visitedGamesData ? JSON.parse(visitedGamesData) : "";
        if (Array.isArray(visitedGames)) {
            if (visitedGames.includes("roshambo")) {
                return;
            }
            visitedGames.push("roshambo");
            sessionStorage.setItem("destress_visited_games", JSON.stringify(visitedGames));
        }
        sessionStorage.setItem("destress_visited_games", JSON.stringify(["roshambo"]));
        openWindow(
            {
                infoText: "5This is cool game",
                onOk: closeWindow,
                onCancel: () => router.push("/"),
                cancelText: "Go Back",
                confirmText: "Continue"
            });
    }, [openWindow])

    useEffect(() => {
        if (chosenJest && opponentJest) {
            const gameStatus = defineGameStatus(chosenJest, opponentJest);
            setResult(gameStatus || "draw");
            if (gameStatus === "win") {
                setUserScore(curr => curr + 1);
            }
            if (gameStatus === "lose") {
                setOpponentScore(curr => curr + 1);
            }
        }
    }, [chosenJest, opponentJest, setOpponentScore, setResult, setUserScore])

    return (
        <RoshamboContext.Provider value={{
            chosenJest,
            dispatchJest: setChosenJest,
            opponentJest,
            dispatchOpponentJest: setOpponentJest,
            opponentScore,
            userScore,
            result
        }}>
            <InfoWindowProvider>
                <div className={styles.roshambo_main}>
                    <div className={styles.roshambo_cont}>
                        <BackButton extraStyles={{ borderRadius: "20px" }} />
                        {showScore && <Score />}
                        {chosenJest && <Animation />}
                        {!chosenJest && <Instruction />}
                        {opponentJest && <Summary />}
                    </div>
                </div>
            </InfoWindowProvider>
        </RoshamboContext.Provider>
    )
}

export default Roshambo;