import type { GameStatus, Jest } from "../../../types/roshambo"
import { combinations } from "./data"
import configs from "../../../configs/roshambo"

const {backgrounds} = {...configs};

export const defineGameStatus = (jest1:Jest|null, jest2:Jest|null):GameStatus|null => {
  if(!jest1 || !jest2) return null;
    let status:GameStatus = "draw";
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

export const getRandomBackground = () => {
  const randomOrder = Math.floor(Math.random() * backgrounds.length);
  return backgrounds[randomOrder];
}
