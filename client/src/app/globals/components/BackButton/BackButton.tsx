import { useCallback, useState } from "react"
import { useRouter } from "next/navigation"
import { FaArrowLeft } from "react-icons/fa"
import { motion } from "framer-motion"

import styles from "../../../../styles/globals/components/BackButton.module.scss"
import type { BackButtonProps } from "../../../../types/propTypes"
import { arrowIconVariants } from "./utils/variants"

const BackButton = ({ extraStyles = {}, action }: BackButtonProps) => {
    const [hovered, setHovered] = useState<boolean>(false)
    const router = useRouter();

    const goBack = useCallback(() => router.push("/"), [])

    return (
        <div
            className={styles.back_button_main}
            style={extraStyles}
            onClick={action || goBack}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            >
            <motion.div
                animate={hovered ? "animate" : {}}
                initial="initial"
                variants={arrowIconVariants}
            >
                <FaArrowLeft />
            </motion.div>
        </div>
    )
}

export default BackButton;