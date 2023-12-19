import { motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import Button from "antd/lib/button";

import styles from "../../../../styles/globals/components/InfoWindow.module.scss";
import type { InfoDetailsProps } from "../../../../types/globals";
import { infoWindowVariants } from "./utils/variants";

const InfoWindow = ({ visible,
    imageWidth1,
    imageWidth2,
    setVisible,
    text,
    onOk,
    onCancel,
    confirmText,
    cancelText,
    image2,
    image }: InfoDetailsProps) => (
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
                        <p className={styles.info_text}>
                            {text}
                        </p>
                        <div style={image2 ? { height: "220px" } : {}}>
                            {image && <img
                                src={image}
                                className={image2 ? styles.info_image_double : styles.info_image}
                                style={{
                                    width: imageWidth1 ? imageWidth1 : ""
                                }}
                            />}
                            {image2 && <img
                                src={image2}
                                className={styles.info_image_double}
                                style={{
                                    width: imageWidth2 ? imageWidth2 : ""
                                }}
                            />}
                        </div>
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