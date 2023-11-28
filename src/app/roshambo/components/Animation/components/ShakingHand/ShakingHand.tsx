import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import styles from "../../../../../../styles/roshambo/components/Animation/components/ShakingHand.module.scss";
import type { ShakingHandProps } from "../../../../../../types/roshambo";
import { shakingImageVariants } from "./utils/variants";
import { getImageSrc } from "./utils/functions";

const ShakingHand = ({ 
  jest,
  windowSize,
  showingMode,
  side,
  initialJest,
  duration }: ShakingHandProps) => {
  const [imageSource, setImageSource] = useState<string>("");

  useEffect(() => {
    if (showingMode) {
      setImageSource(getImageSrc(jest || "rock", side))
      return;
    }
    setImageSource(getImageSrc(initialJest || "rock", side))
    setTimeout(() => {
      setImageSource(getImageSrc(jest || "rock", side))
    }, duration * 1000 + 500)
  }, [setImageSource, getImageSrc, showingMode, jest, side, duration])

  return (
    <motion.img
      className={styles.shaking_image}
      variants={showingMode ? {} : shakingImageVariants}
      initial="initial"
      animate="animate"
      src={imageSource}
      style={{
        left: side === "left" ? windowSize == "medium" || windowSize === "small" ? "-115px" : "-15px" : undefined,
        right: side === "right" ? windowSize == "medium" || windowSize === "small" ? "-150px" : "-50px" : undefined,
        top: windowSize == "small" ? side === "left" ? "0px" : "250px" : "100px",
      }}
    />
  )
}

export default ShakingHand;