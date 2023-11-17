"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import styles from "../../styles/oceanFlow/page.module.scss"
import Game from "./components/Game/Game"
import CornerButton from "../globals/components/CornerButton/CornerButton"
import configs from "../../configs/oceanFlow"
import updateVisitedStatus from "../globals/functions/updateVisitedStatus"
import InfoWindow from "../globals/components/InfoWindow/InfoWindow"

const { info, infoImage } = { ...configs };

const OceanFlow = () => {
    const [showInfo, setShowInfo] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        const visited = updateVisitedStatus("oceanFlow");
        if (!visited) {
            setShowInfo(true);
        }
    }, [updateVisitedStatus, setShowInfo])

    return (
        <div className={styles.ocean_flow_main}>
            <InfoWindow
                visible={showInfo}
                setVisible={setShowInfo}
                text={info}
                image={infoImage}
                onOk={() => setShowInfo(false)}
                onCancel={() => router.push("/")}
                cancelText={"Go Back"}
                confirmText={"Continue"}
            />
            <CornerButton type="back" />
            <CornerButton
                type="info"
                action={() => setShowInfo(true)} />
            <div
                className={styles.ocean_flow_cont}>
                <Game />
            </div>
        </div>
    )
}

export default OceanFlow;