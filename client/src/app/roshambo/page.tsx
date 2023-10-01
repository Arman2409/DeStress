"use client"
import { useLayoutEffect } from "react"
import { useRouter } from "next/navigation"

import styles from "../../styles/roshambo/Roshambo.module.scss"
import useInfoWindow from "../globals/hooks/useInfoWindow";
import Instruction from "./components/Instruction/Instruction";

const Roshambo = () => {
    const { openWindow, Provider, closeWindow } = useInfoWindow();
    const router = useRouter();

    useLayoutEffect(() => {
        openWindow(
            {
                infoText: "5This is cool game",
                onOk: closeWindow,
                onCancel: () => router.push("/"),
                cancelText: "Go Back",
                confirmText: "Continue"
            });
    }, [])

    return (
        <Provider>
            <div className={styles.roshambo_main}>
                <div className={styles.roshambo_cont}>
                    <Instruction />
                </div>
            </div>
        </Provider>
    )
}

export default Roshambo;