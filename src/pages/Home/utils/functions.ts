import { animate } from "framer-motion";

export const animateCircle = (
    left: number,
    top: number,
    circleRef: any,
    bouncingRef: any,
    timeOutRef: any,
    mousePositionRef: any) => {
    if (!circleRef.current) return;
    const { x, y } = circleRef.current.getBoundingClientRect();
    const movementX = Math.abs(left - x);
    const movementY = Math.abs(top - y);
    const toFloor = movementX > movementY;
    animate(circleRef.current, {
        top: [y + "px", toFloor ? document.body.clientHeight - 25 + "px" : top - (Math.abs(movementY) / 2) + "px", top - 25 + 'px'],
        left: [x + "px", toFloor ? left - (Math.abs(movementX) / 2) + "px" : document.body.clientWidth - 50 + "px", left - 25 + 'px'],
        height: toFloor && ["50px", "50px", "50px", "25px", "50px", "50px", "50px"],
        width: !toFloor && ["50px", "50px", "50px", "25px", "50px", "50px", "50px"],
    }, { duration: 1.5 })
    timeOutRef.current = setTimeout(() => {
        if (!circleRef.current) return;
        const { x, y } = circleRef.current?.getBoundingClientRect();
        const { left, top } = mousePositionRef.current
        if (!(x + 24 < left && x + 26 > left) ||
            !(y + 24 < top && y + 26 > top)) {
            animateCircle(left, top, circleRef, bouncingRef, timeOutRef, mousePositionRef);
            return;
        }
        bouncingRef.current = false;
    }, 2000);
}
