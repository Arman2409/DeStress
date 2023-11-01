"use client"
import { useEffect } from "react"

import { useRouter } from "next/navigation"

import styles from "../../styles/synapseHash/page.module.scss"
import Game from "./components/Game/Game"
import useInfoWindow from "../globals/hooks/useInfoWindow"
import updateVisitedStatus from "../globals/functions/updateVisitedStatus"
import CornerButton from "../globals/components/CornerButton/CornerButton"

const SynapseHash = () => {
    const router = useRouter();

    const { openWindow, Provider: InfoWindowProvider, closeWindow } = useInfoWindow();

    const openInfo = () => openWindow(
        {
            text: ".....",
            onOk: closeWindow,
            onCancel: () => router.push("/"),
            cancelText: "Go Back",
            confirmText: "Continue"
        })


    useEffect(() => {
        const visited = updateVisitedStatus("synapseHash");
        if (!visited) {
            openInfo()
        }
    }, [])

    return (
        <InfoWindowProvider>
            <div className={styles.synapseHash_main}>
                <CornerButton type="back" extraStyles={{ zIndex: 6 }} />
                <CornerButton type="info" extraStyles={{ zIndex: 6 }} action={openInfo} />
                <div className={styles.synapseHash_cont}>
                    <Game />
                </div>
            </div>
        </InfoWindowProvider>
    )
}

export default SynapseHash;