import {motion} from "framer-motion"

import styles from "../../../../../../styles/roshambo/components/Score/components/AnimatingScores.module.scss"
import type { AnimatingScoresProps } from "../../../../../../types/roshambo"
import { getVariants } from "./utils/variants"

const AnimatingScores = ({score}:AnimatingScoresProps) => (
    <>
          <motion.p
            variants={getVariants(true)}
            className={styles.animation_text}
            initial="initial"
            animate="animate"
          >
            {score}
          </motion.p>
          <motion.p
            variants={getVariants(false)}
            className={styles.animation_text}
            initial="initial"
            animate="animate"
          >
            {score - 1}
          </motion.p>
        </> 
)

export default AnimatingScores;