import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "../../styles/pages/SynapseHash/SynapseHash.module.scss";
import Game from "./components/SynapseHashGame/SynapseHashGame";
import updateVisitedStatus from "../../globals/functions/updateVisitedStatus";
import CornerButton from "../../globals/components/CornerButton/CornerButton";
import InfoWindow from "../../globals/components/InfoWindow/InfoWindow";
import configs from "../../configs/synapseHash";

const { info, infoImage } = { ...configs };

const SynapseHash = () => {
    const [showInfo, setShowInfo] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        // update local storage 
        const visited = updateVisitedStatus("synapseHash");
        if (!visited) {
            setShowInfo(true);
        }
    }, [setShowInfo])

    return (
        <div className={styles.synapseHash_main}>
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
            <div className={styles.synapseHash_cont}>
                <Game />
            </div>
        </div>
    )
}

export default SynapseHash;