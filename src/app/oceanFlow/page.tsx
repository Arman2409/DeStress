"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

import styles from "../../styles/oceanFlow/page.module.scss"
import useInfoWindow from "../globals/hooks/useInfoWindow"
import Game from "./components/Game/Game"
import CornerButton from "../globals/components/CornerButton/CornerButton"
import configs from "../../configs/oceanFlow"
import updateVisitedStatus from "../globals/functions/updateVisitedStatus"

const {info, infoImage} = {...configs};

const OceanFlow = () => {
    const router = useRouter();
    const { openWindow, Provider: InfoWindowProvider, closeWindow } = useInfoWindow();

    const openInfo = () => openWindow({
        text: info,
        onOk: closeWindow,
        onCancel: () => router.push("/"),
        cancelText: "Go Back",
        image: infoImage,
        confirmText: "Continue"
    })

    useEffect(() => {
        const visited = updateVisitedStatus("oceanFlow");
        if(!visited) {
           openInfo()
        }
    }, [updateVisitedStatus, openInfo])

    return (
            <InfoWindowProvider>
                <div className={styles.ocean_flow_main}>
                <CornerButton type="back" extraStyles={{ zIndex: 6}} />
                <CornerButton type="info" extraStyles={{ zIndex: 6}} action={openInfo}/>
                    <div className={styles.ocean_flow_cont}>
                        <Game />
                    </div>
                </div>
            </InfoWindowProvider> 
    )
}

export default OceanFlow;