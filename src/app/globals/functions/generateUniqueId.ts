import { uniqueId } from "lodash"

const generateUniqueId = (others: any[]):string => {
  const newId = uniqueId();
  let isTaken = false;
  others.forEach(({id}) => {
    if(newId === id){ 
        isTaken = true;
    }    
  })
  if(isTaken) {
    return generateUniqueId(others);
  } else {
    return newId;
  }
} 
export default generateUniqueId;