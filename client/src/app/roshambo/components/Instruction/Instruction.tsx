import { useCallback, useContext, useEffect, useRef, useState } from "react"

import styles from "../../../../styles/roshambo/components/Instruction/Instruction.module.scss"
import type { JestType } from "../../../../types/types"
import Jest from "./components/Jest/Jest"
import { RoshamboContext } from "../../page"
import { jestsData } from "./utils/data"

let keysArr: string[] = [];
jestsData.forEach(({ keys }: JestType) => {
  keysArr.push(...keys);
})

const Instruction = () => {
  const [ jests, setJests ] = useState<JestType[]>(jestsData);
  const handlingJest = useRef<boolean>(false);
  const [chosen, setChosen] = useState("");
  const { dispatchJest } = useContext(RoshamboContext);

  const handleNewJest = useCallback((key:string|"", name?: string) => {
    if(handlingJest.current) return;
    handlingJest.current = true;
    setJests(jests =>  jests.map((jest: JestType) => 
      {  
      if (jest.keys.includes(key) || jest.name === name) {
        setChosen(jest.name)
        return (
          {
            ...jest,
            keyClicked: true,
          }
        )
      }
      return { ...jest };
    }
    ))
    handlingJest.current = false;
  }, [setJests])

  useEffect(() => {
    window.addEventListener("keypress", (event: { key: string }) => {
      if (handlingJest.current) return;
      if (keysArr.includes(event.key)) { 
        handleNewJest(event.key);
      }
    })    
  }, [setJests, handleNewJest])

   useEffect(() => {
     if (chosen) {
      setTimeout(() => {
        dispatchJest(chosen);
      }, 500)
     }
   }, [chosen])

  return (
    <div className={styles.instruction_main}>
      <div className={styles.instruction_title}>
        <h2 className={styles.instruction_text}>
          Choose one
        </h2>
        <img
          className={styles.click_animation}
          src="./roshambo/giphy.gif" />
      </div>
      <div className={styles.instruction_illustration}>
        {jests.map((jest: JestType) => {
          const { name = "" } = { ...jest };
          if (name === "scissors") return (
            <Jest
              key={name}
              borderLeft
              borderRight
              onClick={handleNewJest}
              {...jest} />
          )
          return (
            <Jest
              key={name}
              onClick={handleNewJest}
              {...jest} />
          )
        })}
      </div>
    </div>
  )
}

export default Instruction;