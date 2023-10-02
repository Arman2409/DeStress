import { useEffect, useState } from "react"
import type { ShakingHandProps } from "../../../../../../types/propTypes"
import { jestImages } from "./utils/utils"

const getRandomJest = () => {
  const randomNumber = Math.round(Math.random() * 2);
  return Object.keys(jestImages.left)[randomNumber];
}

const ShakingHand = ({jest = "rock", side, initialJest, duration}:ShakingHandProps) => {
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
    }, [])

    return (
      <div className="">
        <img src={imageSource}></img>
      </div>
    )
}

export default ShakingHand;