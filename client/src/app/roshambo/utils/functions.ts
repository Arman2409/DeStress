import type { GameStatusType, JestType } from "../../../types/types"
import { combinations } from "./data"

export const defineGameStatus = (jest1:JestType|null, jest2:JestType|null):GameStatusType|null => {
  if(!jest1 || !jest2) return null;
    let status:GameStatusType = "draw";
    if(jest1 === jest2) {
      return "draw";
  };
    combinations.winning.forEach((arr:any) => {
      if(arr[0] === jest1 && arr[1] === jest2) {  
        status = "win";
      }
    })
    combinations.losing.forEach((arr:any) => {
      if(arr[0] === jest1 && arr[1] === jest2) {
        status = "lose";
      }
    })
    return status;
  }