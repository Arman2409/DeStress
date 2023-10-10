"use client"
import { createContext, useEffect } from "react"
import { useRouter } from "next/navigation"

import styles from "../../styles/sharkHunt/page.module.scss"
import type { SharkHuntContextType } from "../../types/contextTypes"
import useInfoWindow from "../globals/hooks/useInfoWindow"
import Game from "./Game/Game"
import BackButton from "../globals/components/BackButton/BackButton"

export const SharkHuntContext = createContext<SharkHuntContextType>({});

const SharkHunt = () => {
    const router = useRouter();
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
        openWindow({
            infoText: "5This is cool game",
            onOk: closeWindow,
            onCancel: () => router.push("/"),
            cancelText: "Go Back",
            confirmText: "Continue"
        })
    }, [])

    return (
        // <SharkHuntContext.Provider value={{}}>
            <InfoWindowProvider>
                <div className={styles.shark_hunt_main}>
                    <div className={styles.shark_hunt_cont}>
                        {/* <BackButton extraStyles={{ borderRadius: "20px"}} /> */}
                        <Game />
                    </div>
                </div>
            </InfoWindowProvider>
        // </SharkHuntContext.Provider>
    )
}

export default SharkHunt;