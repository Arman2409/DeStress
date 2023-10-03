import type { GameStatusType, JestType } from "../../../../../types/types"
import { combinations } from "./data";

export const defineGameStatus = (jest1:JestType, jest2:JestType) => {
    let status:GameStatusType = "draw";
    if(jest1 === jest2) {
      return "draw";
  };
    combinations.winning.forEach((arr:any) => {
      if(arr[0] === jest1 && arr[1] === jest2) {  
        status = "win";
      }
    })
    combinations.defeating.forEach((arr:any) => {
      if(arr[0] === jest1 && arr[1] === jest2) {
        status = "lose";
      }
    })
    return status;
  }