"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import styles from "../../styles/synapseHash/page.module.scss"
import Game from "./components/Game/Game"
import updateVisitedStatus from "../globals/functions/updateVisitedStatus"
import CornerButton from "../globals/components/CornerButton/CornerButton"
import InfoWindow from "../globals/components/InfoWindow/InfoWindow"
import configs from "../../configs/synapseHash";

const { info, infoImage } = { ...configs };

const SynapseHash = () => {
    const [showInfo, setShowInfo] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        const visited = updateVisitedStatus("synapseHash");
        if (!visited) {
            setShowInfo(true);
        }
    }, [updateVisitedStatus, setShowInfo])

    return (
        <div className={styles.synapseHash_main}>
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
            <CornerButton
                type="back" />
            <CornerButton
                type="info"
                action={() => setShowInfo(true)} />
            <div className={styles.synapseHash_cont}>
                <Game />
            </div>
        </div>
    )
}

export default SynapseHash;