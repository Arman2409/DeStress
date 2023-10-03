import { useState } from "react"
import { motion } from "framer-motion"

import styles from "../../../../../../styles/roshambo/components/Instruction/components/Jest.module.scss"
import type { JestProps } from "../../../../../../types/propTypes"
import { keyboardKeyVariants } from "./utils/variants"

const Jest = ({ keyClicked, name, borderRight, borderLeft, keyboardImg, jestImg, onClick}: JestProps) => {
  const [hovered, setHovered] = useState<boolean>(false)

  return (
    <div
      className={keyClicked ? styles.jest_main_clicked : styles.jest_main}
      onClick={() => onClick("", name)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {borderLeft && <div className={styles.partial_border} />}
      {borderRight && <div className={styles.partial_border_right} />}
      <div
        className={styles.image_cont}
        style={{
          borderWidth: hovered && 4 || 0,
        }}
      >
        <img
          src={jestImg}
          className={styles.jest_image} />
      </div>
      <div className={styles.keyboard_key_cont}>
          {keyClicked ? (
            <motion.img
              src={keyboardImg}
              className={styles.keyboard_key_clicked}
              variants={keyboardKeyVariants}
              initial="initial"
              animate="animate"
            />) : (
            <img
              src={keyboardImg}
              className={styles.keyboard_key}
            />)}
      </div>
    </div>
  )
}

export default Jest;