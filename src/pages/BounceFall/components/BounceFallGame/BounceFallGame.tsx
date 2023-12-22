import { useEffect, useRef, useState } from "react";

import styles from "../../../../styles/pages/BounceFall/components/BounceFallGame.module.scss";
import type { BounceGameProps } from "../../../../types/bounceFall";
import ScoreAlert from "../../../../globals/components/ScoreAlert/ScoreAlert";
import Loading from "../../../../globals/components/Loading/Loading";
import { Ball } from "./components/Ball";

const BounceFallGame = ({ canvasHeight, canvasWidth }: BounceGameProps) => {
    const [ballsCount, setBallsCount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const mainCanvas = useRef<any>(null);

    useEffect(() => {
        const canvas: any = mainCanvas.current
        const context = canvas.getContext("2d");
        const innerWidth = window.innerWidth;
        const innerHeight = window.innerHeight;
        const balls:Ball[] = [];

        canvas.addEventListener("click", (event: MouseEvent) => {
            const { clientX, clientY } = event;
            const newBall = new Ball(clientX, clientY, context);
            // newBall.animate();
            balls.push(newBall);
        })

        function clear() {
            context.clearRect(0, 0, innerWidth, innerHeight);
            balls.forEach(ball => ball.animate());
            requestAnimationFrame(clear);
        }
        clear();
    }, [])

    return (
        <>
            <ScoreAlert
                score={ballsCount}
                mode="custom"
            />
            {loading && <Loading />}
            <canvas
                ref={mainCanvas}
            />
        </>
    )
}

export default BounceFallGame;