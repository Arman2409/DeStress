"use client"
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "../../styles/oceanFlow/page.module.scss";
import Game from "./components/Game/Game";
import CornerButton from "../globals/components/CornerButton/CornerButton";
import configs from "../../configs/oceanFlow";
import updateVisitedStatus from "../globals/functions/updateVisitedStatus";
import InfoWindow from "../globals/components/InfoWindow/InfoWindow";

const { info, infoImage, infoImage2 } = { ...configs };

const OceanFlow = () => {
    const [showInfo, setShowInfo] = useState<boolean>(false);
    const navigate = useNavigate();

    const changeShowStatus = useCallback((newStatus:boolean) => setShowInfo(newStatus), [setShowInfo])

    useEffect(() => {
        // update local storage 
        const visited = updateVisitedStatus("oceanFlow");
        if (!visited) {
            setShowInfo(true);
        }
    }, [updateVisitedStatus, setShowInfo])

    return (
        <div className={styles.ocean_flow_main}>
            <InfoWindow
                visible={showInfo}
                setVisible={changeShowStatus}
                text={info}
                image={infoImage}
                image2={infoImage2}
                imageWidth1={"66%"}
                imageWidth2={"33%"}
                onOk={() => changeShowStatus(false)}
                onCancel={() => navigate("/")}
                cancelText={"Go Back"}
                confirmText={"Continue"}
            />
            <CornerButton type="back" />
            <CornerButton
                type="info"
                action={() => changeShowStatus(true)} />
            <div
                className={styles.ocean_flow_cont}>
                <Game />
            </div>
        </div>
    )
}

export default OceanFlow;