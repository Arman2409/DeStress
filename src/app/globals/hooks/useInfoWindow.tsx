"use client"

import { useCallback, useState } from "react"
import Button from "antd/lib/button"
import { AiOutlineClose } from "react-icons/ai"
import { motion } from "framer-motion"

import styles from "../../../styles/globals/hooks/usInfoWindow.module.scss"
import type { InfoDetailsType } from "../../../types/types"
import type { InfoContextHolderProps } from "../../../types/propTypes"
import { infoWindowVariants } from "./utils/variants"


const ContextHolder = ({ details, setDetails }: InfoContextHolderProps) => {
    const { infoText, onOk, onCancel, confirmText, cancelText } = details || {}

    return (
        <>
            {details && (
                <div className={styles.info_window}>
                    <div className={styles.info_demo} />
                    <AiOutlineClose
                        className={styles.close_icon}
                        onClick={() => setDetails(null)}
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
                                {infoText}
                            </p>
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
}

const useInfoWindow = () => {
    const [details, setDetails] = useState<InfoDetailsType | null>(null);

    const Provider = ({ children }: any) => {
        return (
            <>
                <ContextHolder
                    details={details}
                    setDetails={setDetails}
                />
                {children}
            </>
        )
    }

    const openWindow = useCallback((infoDetails: InfoDetailsType) => setDetails(infoDetails), [setDetails]);

    const closeWindow = useCallback(() => setDetails(null), [setDetails])

    return { openWindow, Provider, closeWindow }
}

export default useInfoWindow