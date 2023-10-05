import { useEffect, useState } from "react"
import { motion } from "framer-motion"

import styles from "../../../../../../styles/roshambo/components/Animation/components/ShakingHand.module.scss"
import type { ShakingHandProps } from "../../../../../../types/propTypes"
import { shakingImageVariants } from "./utils/variants"
import { getImageSrc } from "./utils/functions"

const ShakingHand = ({ jest, showingMode, side, initialJest, duration }: ShakingHandProps) => {
  const [imageSource, setImageSource] = useState<string>("");

  useEffect(() => {
    if (showingMode) {
      setImageSource(getImageSrc(jest || "rock", side))
      return;
    }
    setImageSource(getImageSrc(initialJest || "rock", side))
    setTimeout(() => {
      setImageSource(getImageSrc(jest || "rock", side))
    }, duration * 1000)
  }, [])

  return (
    <motion.img
      className={styles.shaking_image}
      variants={showingMode ? {} : shakingImageVariants}
      initial="initial"
      animate="animate"
      style={{
        left: side === "left" ? "-15px" : undefined,
        right: side === "right" ? "-15px" : undefined,
      }}
      src={imageSource} />
  )
}

export default ShakingHand;