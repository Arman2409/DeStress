import { useCallback, useContext, useEffect, useRef, useState } from "react";

import styles from "../../../../styles/roshambo/components/Instruction/Instruction.module.scss";
import type { JestDetails } from "../../../../types/roshambo";
import Jest from "./components/Jest/Jest";
import { RoshamboContext } from "../../Roshambo";
import { jestsData } from "./utils/data";

// get keys for keypress event 
let keysArr: string[] = [];
jestsData.forEach(({ keys }: JestDetails) => {
  keysArr.push(...keys);
})

const Instruction = () => {
  const [jests, setJests] = useState<JestDetails[]>(jestsData);
  const [chosen, setChosen] = useState("");
  const { dispatchJest } = useContext(RoshamboContext);
  const alreadyChosen = useRef<boolean>(false);

  const handleNewJest = useCallback((key: string | "", name?: string) => {
    if (alreadyChosen.current) return;
    alreadyChosen.current = true;
    setJests(jests => jests.map((jest: JestDetails) => {
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
  }, [setJests, setChosen])

  useEffect(() => {
    window.addEventListener("keypress", (event: KeyboardEvent) => {
      if (alreadyChosen.current) return;
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
  }, [chosen, dispatchJest])

  return (
    <div className={styles.instruction_main}>
      <div className={styles.instruction_title}>
        <h2 className={styles.instruction_text}>
          Choose one
        </h2>
        <img
          alt="^"
          className={styles.click_animation}
          src="./roshambo/giphy.gif" />
      </div>
      <div className={styles.instruction_illustration}>
        {jests.map((jest: JestDetails) => {
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