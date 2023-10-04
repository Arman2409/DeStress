import { useEffect, useState } from "react"
import { motion } from "framer-motion"

import styles from "../../../../../../styles/roshambo/components/Animation/components/ShakingHand.module.scss"
import type { ShakingHandProps } from "../../../../../../types/propTypes"
import type { JestType } from "../../../../../../types/types"
import { jestImages } from "./utils/data"
import { shakingImageVariants } from "./utils/variants"

const getImageSrc = (jestName: JestType, jestSide: "left"|"right") => {
  const sideImages = jestImages[jestSide as keyof typeof jestImages];
  return sideImages[jestName as keyof typeof sideImages];
}

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
        position: "relative",
        left: side === "left" ? "-50px" : undefined,
        right: side === "right" ? "-200px" : undefined,
      }}
      src={imageSource} />
  )
}

export default ShakingHand;