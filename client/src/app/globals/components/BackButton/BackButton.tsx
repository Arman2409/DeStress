import { useCallback } from "react"
import { useRouter } from "next/navigation"
import { FaArrowLeft } from "react-icons/fa"
import { motion, useAnimationControls } from "framer-motion"

import styles from "../../../../styles/globals/components/BackButton.module.scss"
import type { BackButtonProps } from "../../../../types/propTypes"
import { arrowIconVariants } from "./utils/variants"

const BackButton = ({ extraStyles = {}, action }: BackButtonProps) => {
    const router = useRouter();
    const controls = useAnimationControls()

    const goBack = useCallback(() => router.push("/"), [])

    return (
        <div
            className={styles.back_button_main}
            style={extraStyles}
            onClick={action || goBack}
            onMouseEnter={() => controls.start(arrowIconVariants.animate)}
            >
            <motion.div
                animate={controls}
            >
                <FaArrowLeft />
            </motion.div>
        </div>
    )
}

export default BackButton;