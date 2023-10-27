"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

import styles from "../../styles/oceanFlow/page.module.scss"
import useInfoWindow from "../globals/hooks/useInfoWindow"
import Game from "./Game/Game"
import BackButton from "../globals/components/BackButton/BackButton"
import configs from "../../configs/oceanFlow"

const {info, infoImage} = {...configs};



const OceanFlow = () => {
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
            text: info,
            onOk: closeWindow,
            onCancel: () => router.push("/"),
            cancelText: "Go Back",
            image: infoImage,
            confirmText: "Continue"
        })
    }, [])

    return (
            <InfoWindowProvider>
                <div className={styles.ocean_flow_main}>
                    <BackButton />
                    <div className={styles.ocean_flow_cont}>
                        <Game />
                    </div>
                </div>
            </InfoWindowProvider> 
    )
}

export default OceanFlow;