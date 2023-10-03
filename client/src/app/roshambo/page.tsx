"use client"
import { createContext, useLayoutEffect, useState } from "react"
import { useRouter } from "next/navigation"

import styles from "../../styles/roshambo/Roshambo.module.scss"
import type { RoshamboContextType } from "../../types/contextTypes"
import type { JestType } from "../../types/types"
import useInfoWindow from "../globals/hooks/useInfoWindow"
import Instruction from "./components/Instruction/Instruction"
import Animation from "./components/Animation/Animation"
import Summary from "./components/Summary/Summary"

export const RoshamboContext = createContext<RoshamboContextType>({} as RoshamboContextType);

const Roshambo = () => {
    const router = useRouter();
    const [chosenJest, setChosenJest] = useState<JestType|"">("");
    const { openWindow, Provider: InfoWindowProvider, closeWindow } = useInfoWindow();
    const [ result, setResult] = useState<JestType[]>([]);

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
        <RoshamboContext.Provider value={{
            chosenJest,
            dispatchJest:setChosenJest,
            result,
            dispatchResult: setResult
        }}>
            <InfoWindowProvider>
                <div className={styles.roshambo_main}>
                    <div className={styles.roshambo_cont}>
                        {chosenJest && <Animation />}
                        {!chosenJest && <Instruction />}
                        {result.length && <Summary />}
                    </div>
                </div>
            </InfoWindowProvider>
        </RoshamboContext.Provider>
    )
}

export default Roshambo;