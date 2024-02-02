import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "../../styles/pages/VoidVoyage/VoidVoyage.module.scss";
import Game from "./components/VoidVoyageGame/VoidVoyageGame";
import updateVisitedStatus from "../../globals/functions/updateVisitedStatus";
import CornerButton from "../../globals/components/CornerButton/CornerButton";
import InfoWindow from "../../globals/components/InfoWindow/InfoWindow";
import configs from "../../configs/synapseHash";

const { info, infoImage } = { ...configs };

const VoidVoyage = () => {

    const [showInfo, setShowInfo] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        // update local storage 
        const visited = updateVisitedStatus("voidVoyage");
        if (!visited) {
            setShowInfo(true);
        }
    }, [setShowInfo])

    return (
        <div className={styles.voidVoyage_main}>
            <InfoWindow
                visible={showInfo}
                setVisible={setShowInfo}
                text={info}
                image={infoImage}
                onOk={() => setShowInfo(false)}
                onCancel={() => navigate("/")}
                cancelText={"Go Back"}
                confirmText={"Continue"}
            />
            <CornerButton
                type="back" />
            <CornerButton
                type="info"
                action={() => setShowInfo(true)} />
            <div className={styles.voidVoyage_cont}>
                <Game />
            </div>
        </div>
    )
}

export default VoidVoyage;