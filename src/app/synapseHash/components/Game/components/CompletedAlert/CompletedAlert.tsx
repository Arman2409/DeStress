import Button from "antd/lib/button"

import styles from "../../../../../../styles/synapseHash/components/Game/components/CompletedAlert/CompletedAlert.module.scss"
import type { CompletedAlertProps } from "../../../../../../types/synapseHash"

const CompletedAlert = ({setStatus, status}:CompletedAlertProps) => {
    return (
        <div className={styles.completed_main}>
            <div className={styles.completed_demo} />
            <div className={styles.completed_content}>
                <h4>
                  {status === "completed" &&  "Possible Connections Completed"}
                  {status === "skipped" &&  "Finish this level?"}
                </h4>
                <Button
                    onClick={() => setStatus(false)}
                    className={styles.completed_button}
                >
                    Get Next Neurons!
                </Button>
            </div>
        </div>
    )
}

export default CompletedAlert;