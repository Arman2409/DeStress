"use client"
import { useLayoutEffect } from "react";

import styles from "../../styles/roshambo/Roshambo.module.scss"
import useInfoWindow from "../globals/hooks/useInfoWindow";

const Roshambo = () => {
    const { openWindow, Provider } = useInfoWindow();

    useLayoutEffect(() => {
       openWindow({} as any);
    }, [])

    return (
        <Provider>
            <div className={styles.roshambo_main}>
                <div className={styles.roshambo_cont}>

                </div>
            </div>
        </Provider>
    )
}

export default Roshambo;