const pi = Math.PI;

const getAngle = (startX: number, startY: number, endX: number, endY: number) => {
  const xDifference = endX - startX;
  const yDifference = endY - startY;
  let toQuarter: 1 | 2 | 3 | 4;
  if (xDifference >= 0) {
    if (yDifference >= 0) {
      toQuarter = 2;
    } else {
      toQuarter = 1;
    }
  } else {
    if (yDifference >= 0) {
      toQuarter = 3;
    } else {
      toQuarter = 4;
    }
  }
  const xChange = Math.abs(endX - startX);
  const yChange = Math.abs(endY - startY);
  const tan = toQuarter === 1 || toQuarter === 3 ? xChange / yChange : yChange / xChange;
  const angle_in_radians = (toQuarter - 1) * pi / 2 + Math.atan(tan);
  return angle_in_radians;
}

export default getAngle;