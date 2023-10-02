import { useEffect, useState } from "react"
import type { ShakingHandProps } from "../../../../../../types/propTypes"
import { jestImages } from "./utils/utils"

const ShakingHand = ({jest}:ShakingHandProps) => {
    const [jestState, setJestState] = useState<string|undefined>(jest);
    
    const getRandomJest = () => {
       const randomNumber = Math.round(Math.random() * 2);
       return Object.keys(jestImages)[randomNumber];
    }

    useEffect(() => {
      if(!jest) {
        setJestState(getRandomJest())
      }
    }, [])
    return (
      <div className="">
        <img src={jestImages[jest as keyof typeof jestImages]}></img>
      </div>
    )
}

export default ShakingHand;