import { useCallback } from "react";
import Button from "antd/lib/button";

import styles from "../../../../../../styles/pages/SynapseHash/components/SynapseHashGame/components/CompletedAlert/CompletedAlert.module.scss";
import type { CompletedAlertProps } from "../../../../../../types/synapseHash";

const CompleteAlert = ({ setStatus, status, startNew }: CompletedAlertProps) => {
    const completeOrCancel = useCallback((complete: boolean) => {
        setStatus(false);
        if (complete) startNew();
    }, [setStatus, startNew])

    return (
        <div className={styles.completed_main}>
            <div
                className="absolute_background demo"
                onClick={() => completeOrCancel(false)} />
            <div className={styles.completed_content}>
                <h4>
                    {status && "Finish this level?"}
                </h4>
                <Button
                    onClick={() => completeOrCancel(true)}
                    className={styles.completed_button}
                >
                    Get Next Neurons!
                </Button>
                <Button
                    onClick={() => completeOrCancel(false)}
                    className={styles.cancel_button}
                >
                    Cancel
                </Button>
            </div>
        </div>
    )
}

export default CompleteAlert;