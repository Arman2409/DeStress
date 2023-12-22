import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "../../styles/pages/BounceFall/BounceFall.module.scss";
import Game from "./components/BounceFallGame/BounceFallGame";
import CornerButton from "../../globals/components/CornerButton/CornerButton";
import configs from "../../configs/bounceFall";
import updateVisitedStatus from "../../globals/functions/updateVisitedStatus";
import InfoWindow from "../../globals/components/InfoWindow/InfoWindow";

const { info, infoImage, infoImage2, mouseExtraX, mouseExtraY, ballRadius } = { ...configs };

const BounceFall = () => {
    const [showInfo, setShowInfo] = useState<boolean>(false);
    const navigate = useNavigate();

    const changeShowStatus = useCallback((newStatus: boolean) => setShowInfo(newStatus), [setShowInfo])

    useEffect(() => {
        // update local storage 
        const visited = updateVisitedStatus("oceanFlow");
        if (!visited) {
            setShowInfo(true);
        }

    }, [setShowInfo])

    return (
        <div
            className={styles.bounce_fall_main}
        >
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
                className={styles.bounce_fall_cont}
            >
                <Game
                    mouseExtraX={mouseExtraX}
                    mouseExtraY={mouseExtraY}
                    canvasHeight={90}
                    canvasWidth={95}
                    ballRadius={ballRadius} />
            </div>
        </div>
    )
}

export default BounceFall;