import { useEffect, useState } from "react"
import { motion } from "framer-motion"

import styles from "../../../../../../styles/roshambo/components/Animation/components/ShakingHand.module.scss"
import type { ShakingHandProps } from "../../../../../../types/propTypes"
import { jestImages } from "./utils/data"
import { shakingImageVariants } from "./utils/variants"

const ShakingHand = ({jest, side, initialJest, duration}:ShakingHandProps) => {
    const [imageSource, setImageSource] = useState<string>("");
    
    const getImageSrc = (jestName: string) => {
      const sideImages = jestImages[side as keyof typeof jestImages];
      return sideImages[jestName as keyof typeof sideImages];
    }

    useEffect(() => {
      setImageSource(getImageSrc(initialJest))
      setTimeout(() => {
           setImageSource(getImageSrc(jest))
      }, duration * 1000)
    }, [setImageSource])

    return (
        <motion.img 
          className={styles.shaking_image}
          variants={shakingImageVariants}
          initial="initial"
          animate="animate"
          style={{
            position: "relative",
            left: side === "left" ? "-50px" : undefined,
            right: side === "right" ? "-100px" : undefined,
          }}
          src={imageSource} />
    )
}

export default ShakingHand;