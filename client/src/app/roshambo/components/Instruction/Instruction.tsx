import { useEffect, useState } from "react"

import styles from "../../../../styles/roshambo/components/Instruction/Instruction.module.scss"
import type { JestType } from "../../../../types/types"
import Jest from "./components/Jest/Jest"
import { jestsData } from "./utils/data"

let keysArr:string[] = [];
jestsData.forEach(({keys}: JestType) => {
  keysArr.push(...keys);
})

const Instruction = () => {
  const [jests, setJests] = useState<JestType[]>(jestsData);

  useEffect(() => {
   window.addEventListener("keyup", (event:{key:string}) => {
      if(keysArr.includes(event.key)) {
        setJests(jests => jests.map((jest:JestType) => {
          if(jest.keys.includes(event.key)) return (
            {
              ...jest,
              keyClicked: true
            }
          )
          return {...jest};
        }))
      }
   })
  }, [setJests])

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
              {...jest} />
          )
          return <Jest key={name} {...jest} />
        })}
      </div>
    </div>
  )
}

export default Instruction;