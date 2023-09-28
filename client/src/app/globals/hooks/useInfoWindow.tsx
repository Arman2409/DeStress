"use client"

import { useCallback, useContext, createContext, useState } from "react"
import Button from "antd/lib/button"

import styles from "../../../styles/globals/hooks/usInfoWindow.module.scss"
import type { InfoDetailsType } from "../../../types/types";

export const InfoContext = createContext({} as any);

const ContextHolder = () => {
    const { details } = useContext(InfoContext);
    const { infoText, onAction, onCancel, actionText, cancelText } = details

    return (
        <>
            {details && (
                <div className={styles.info_window}>
                    <div className={styles.info_content}>
                        <h1>
                            Info
                        </h1>
                        <p>
                            {infoText}
                        </p>
                        <div className={styles.buttons_cont}>
                            {actionText && (
                                <Button
                                  onClick={onAction}>
                                    {actionText}
                                </Button>
                            )}
                            {cancelText && (
                                <Button
                                  onClick={onCancel}>
                                    {cancelText}
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

const useInfoWindow = () => {
    const [details, setDetails] = useState<{}>({} as any);

    const Provider = ({ children }: any) => {
        return (
            <InfoContext.Provider value={{
                details,
                setDetails
            }}>
                <ContextHolder />
                {children}
            </InfoContext.Provider>
        )
    }

    const openWindow = useCallback((infoDetails: InfoDetailsType) => setDetails(infoDetails), [setDetails]);

    return { openWindow, Provider }
}

export default useInfoWindow