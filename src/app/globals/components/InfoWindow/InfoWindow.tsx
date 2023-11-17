import { motion } from "framer-motion"
import { AiOutlineClose } from "react-icons/ai"
import Button from "antd/lib/button"

import styles from "../../../../styles/globals/components/InfoWindow.module.scss"
import type { InfoDetailsProps } from "../../../../types/globals"
import { infoWindowVariants } from "./utils/variants"

const InfoWindow = ({ visible, setVisible, text, onOk, onCancel, confirmText, cancelText, image }: InfoDetailsProps) => (
    <>
        {visible && (
            <div className={styles.info_window}>
                <div className={styles.info_demo}
                    onClick={() => setVisible(false)}
                />
                <AiOutlineClose
                    className={styles.close_icon}
                    onClick={() => setVisible(false)}
                />
                <motion.div
                    className={styles.info_content}
                    variants={infoWindowVariants}
                    initial="initial"
                    animate="animate"
                    exit="animate"
                >
                    <div className={styles.info_data}>
                        <h1 className={styles.info_title}>
                            Info
                        </h1>
                        <p>
                            {text}
                        </p>
                        {image && <img
                            src={image}
                            className={styles.info_image}
                        />}
                    </div>
                    <div className={styles.buttons_cont}>
                        {cancelText && (
                            <Button
                                type="primary"
                                className={styles.cancel_button}
                                onClick={onCancel as any}>
                                {cancelText}
                            </Button>
                        )}
                        {confirmText && (
                            <Button
                                type="primary"
                                className={styles.ok_button}
                                onClick={onOk as any}>
                                {confirmText}
                            </Button>
                        )}
                    </div>
                </motion.div>
            </div>
        )}
    </>
)

export default InfoWindow;